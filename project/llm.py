from functools import lru_cache

from langchain_openai import ChatOpenAI


@lru_cache
def get_chatmodel():
    return ChatOpenAI(model="gpt-4o-mini", temperature=0)
