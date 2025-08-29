from langchain_openai import ChatOpenAI
from langgraph.graph import MessagesState, StateGraph

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)


def answer(state: MessagesState):
    # 直近までの会話を丸ごと渡して1発応答
    msg = llm.invoke(state["messages"])
    return {"messages": [msg]}


graph = StateGraph(MessagesState)
graph.add_node("llm", answer)
graph.add_edge("__start__", "llm")
graph.add_edge("llm", "__end__")
app = graph.compile()  # ← Studio/Server が読むエントリ
