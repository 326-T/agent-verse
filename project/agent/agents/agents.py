from langchain_openai import ChatOpenAI

from project.model import CustomMessageState

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)


def agents(state: CustomMessageState) -> CustomMessageState:
    """
    問い合わせ対応をするエージェントノード
    """
    msg = llm.invoke(state.messages)
    state.messages.append(msg)
    return state
