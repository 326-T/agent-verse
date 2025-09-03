from functools import lru_cache
from typing import List

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

load_dotenv()


@lru_cache
def get_chatmodel():
    return ChatOpenAI(model="gpt-4o-mini", temperature=0)


@lru_cache
def get_embedding_model():
    return OpenAIEmbeddings(model="text-embedding-3-small")


def embed(texts: List[str]) -> List[List[float]]:
    return get_embedding_model().embed_documents(texts)
