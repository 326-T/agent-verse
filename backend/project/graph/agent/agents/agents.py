from project.graph.llm import get_chatmodel
from project.graph.model import CustomMessageState


def agents(state: CustomMessageState) -> CustomMessageState:
    """
    問い合わせ対応をするエージェントノード
    """
    prompt = f"""
指示に従って、これまでの会話履歴に対する応答を生成してください。

指示:
{state.selected_agent}

これまでの会話履歴:
{state.messages}
"""
    msg = get_chatmodel().invoke(prompt)
    state.messages.append(msg)
    return state
