import random

from project.model import CustomMessageState


def coordinator(state: CustomMessageState) -> CustomMessageState:
    """
    会話の終了を判断するノード
    """
    if random.random() < 0.3:
        state.should_continue = False
    return state
