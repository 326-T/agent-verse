from langchain_core.messages import HumanMessage
from langgraph.types import interrupt

from project.model import CustomMessageState


def user(state: CustomMessageState) -> CustomMessageState:
    """
    ユーザノード
    """
    user_input = interrupt("Please enter user input:")
    message = HumanMessage(content=user_input)
    state.messages.append(message)
    return state


def operator(state: CustomMessageState) -> CustomMessageState:
    """
    オペレータノード
    """
    operator_input = interrupt("Please enter operator input:")
    message = HumanMessage(content=operator_input)
    state.messages.append(message)
    return state
