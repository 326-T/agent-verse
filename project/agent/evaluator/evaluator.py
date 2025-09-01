from project.llm import get_chatmodel
from project.model import CustomMessageState


def agent_evaluator(state: CustomMessageState) -> CustomMessageState:
    """
    エージェントを評価する
    """
    evaluation_prompt = f"""
あなたはプロンプトに基づき問い合わせを「ステップ・バイ・ステップ」で解決するプロセス設計の専門家です。
以下に示した会話ログを解析して、エージェントの応答が適切であったかを評価してください。

会話ログ:
{state.messages}
"""
    msg = get_chatmodel().invoke(evaluation_prompt)
    state.selected_agent_evaluation = msg.content
    return state
