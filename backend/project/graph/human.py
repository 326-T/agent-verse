from langchain_core.messages import HumanMessage
from langgraph.types import interrupt

from project.graph.model import CustomMessageState


def user(state: CustomMessageState) -> CustomMessageState:
    """
    ユーザノード
    """
    user_input = interrupt("Please enter user input:")
    message = HumanMessage(content=user_input, name="user")
    state.messages.append(message)
    return state


def operator(state: CustomMessageState) -> CustomMessageState:
    """
    オペレータノード
    """
    operator_input = interrupt("Please enter operator input:")
    message = HumanMessage(content=operator_input, name="operator")
    state.messages.append(message)
    return state
