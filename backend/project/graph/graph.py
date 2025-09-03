from langgraph.graph import StateGraph

from project.graph.agent import (
    agent_evaluator,
    agent_generator,
    agent_optimizer,
    agents,
    coordinator,
    orchestrator,
)
from project.graph.human import operator, user
from project.graph.model import CustomMessageState


def orchestrator_router(state: CustomMessageState):
    """
    オーケストレータールーター
    """
    if state.should_escalate:
        return "operator"
    return "agents"


def coordinator_router(state: CustomMessageState):
    """
    コーディネータールーター
    """
    if state.should_continue:
        return "user"
    if state.should_escalate:
        return "agent_generator"
    return "agent_evaluator"


def get_graph_builder():
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
    builder.add_edge(operator.__name__, coordinator.__name__)
    builder.add_edge(agents.__name__, coordinator.__name__)
    builder.add_conditional_edges(
        orchestrator.__name__,
        orchestrator_router,
        {"agents": agents.__name__, "operator": operator.__name__},
    )
    builder.add_conditional_edges(
        coordinator.__name__,
        coordinator_router,
        {
            "user": user.__name__,
            "agent_generator": agent_generator.__name__,
            "agent_evaluator": agent_evaluator.__name__,
        },
    )
    builder.add_edge(agent_generator.__name__, "__end__")
    builder.add_edge(agent_evaluator.__name__, agent_optimizer.__name__)
    builder.add_edge(agent_optimizer.__name__, "__end__")
    return builder
