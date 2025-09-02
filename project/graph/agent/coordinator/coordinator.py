from project.graph.model import CustomMessageState


def coordinator(state: CustomMessageState) -> CustomMessageState:
    """
    会話の終了を判断するノード
    一旦はoperatorもしくはuserが["exit", "quit", "bye", "end"]のいずれかを送信した場合に終了する。
    """
    last_user_message = state.messages[-1].content
    last_operator_message = state.messages[-2].content
    if any(
        kw in last_user_message.lower() or kw in last_operator_message.lower()
        for kw in ["exit", "quit", "bye", "end"]
    ):
        state.should_continue = False
    return state
