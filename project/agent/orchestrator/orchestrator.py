import random

from project.model import CustomMessageState


def orchestrator(state: CustomMessageState):
    """
    オーケストレーターノード
    """
    if random.random() < 0.3:
        state.should_escalate = True
    return state
