import random

from langchain_core.messages import HumanMessage
from langchain_core.messages.utils import AnyMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, add_messages
from langgraph.types import interrupt
from pydantic import BaseModel
from typing_extensions import Annotated

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)


class CustomMessageState(BaseModel):
    should_continue: bool = True
    should_escalate: bool = False
    messages: Annotated[list[AnyMessage], add_messages] = []


def user(state: CustomMessageState) -> CustomMessageState:
    """
    ユーザノード
    """
    user_input = interrupt("Please enter user input:")
    message = HumanMessage(content=user_input)
    state.messages.append(message)
    return state


def coordinator(state: CustomMessageState) -> CustomMessageState:
    """
    コーディネーターノード
    """
    if random.random() < 0.3:
        state.should_continue = False
    return state


def operator(state: CustomMessageState) -> CustomMessageState:
    """
    オペレータノード
    """
    operator_input = interrupt("Please enter operator input:")
    message = HumanMessage(content=operator_input)
    state.messages.append(message)
    return state


def operator_router(state: CustomMessageState):
    """
    オペレータールーター
    """
    if state.should_continue:
        return "coordinator"
    return "agent_generator"


def orchestrator(state: CustomMessageState):
    """
    オーケストレーターノード
    """
    if random.random() < 0.3:
        state.should_escalate = True
    return state


def orchestrator_router(state: CustomMessageState):
    """
    オーケストレータールーター
    """
    if state.should_escalate:
        return "operator"
    return "agents"


def agents(state: CustomMessageState) -> CustomMessageState:
    """
    ベースエージェント
    """
    msg = llm.invoke(state.messages)
    state.messages.append(msg)
    return state


def agents_router(state: CustomMessageState):
    """
    エージェントルーター
    """
    if state.should_continue:
        return "coordinator"
    return "agent_evaluator"


def agent_generator(state: CustomMessageState) -> CustomMessageState:
    """
    エージェントを生成する
    """
    return state


def agent_evaluator(state: CustomMessageState) -> CustomMessageState:
    """
    エージェントを評価する
    """
    return state


def agent_optimizer(state: CustomMessageState) -> CustomMessageState:
    """
    エージェントを最適化する
    """
    return state


builder = StateGraph(CustomMessageState)
builder.add_node(user.__name__, user)
builder.add_node(operator.__name__, operator)
builder.add_node(coordinator.__name__, coordinator)
builder.add_node(orchestrator.__name__, orchestrator)
builder.add_node(agents.__name__, agents)
builder.add_node(agent_generator.__name__, agent_generator)
builder.add_node(agent_evaluator.__name__, agent_evaluator)
builder.add_node(agent_optimizer.__name__, agent_optimizer)
builder.add_edge("__start__", user.__name__)
builder.add_edge(user.__name__, orchestrator.__name__)
builder.add_edge(coordinator.__name__, "user")
builder.add_conditional_edges(
    orchestrator.__name__,
    orchestrator_router,
    {"agents": agents.__name__, "operator": operator.__name__},
)
builder.add_conditional_edges(
    operator.__name__,
    operator_router,
    {"coordinator": coordinator.__name__, "agent_generator": agent_generator.__name__},
)
builder.add_edge(agent_generator.__name__, "__end__")
builder.add_conditional_edges(
    agents.__name__,
    agents_router,
    {"coordinator": coordinator.__name__, "agent_evaluator": agent_evaluator.__name__},
)
builder.add_edge(agent_evaluator.__name__, agent_optimizer.__name__)
builder.add_edge(agent_optimizer.__name__, "__end__")

app = builder.compile()
