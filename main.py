from langgraph.graph import StateGraph

from project.agent import (
    agent_evaluator,
    agent_generator,
    agent_optimizer,
    agents,
    coordinator,
    orchestrator,
)
from project.human import operator, user
from project.model import CustomMessageState


def operator_router(state: CustomMessageState):
    """
    オペレータールーター
    """
    if state.should_continue:
        return "coordinator"
    return "agent_generator"


def orchestrator_router(state: CustomMessageState):
    """
    オーケストレータールーター
    """
    if state.should_escalate:
        return "operator"
    return "agents"


def agents_router(state: CustomMessageState):
    """
    エージェントルーター
    """
    if state.should_continue:
        return "coordinator"
    return "agent_evaluator"


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
