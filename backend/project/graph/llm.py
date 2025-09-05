from functools import lru_cache

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

load_dotenv()


@lru_cache
def get_chatmodel():
    return ChatOpenAI(model="gpt-4o-mini", temperature=0)


@lru_cache
def get_embedding_model():
    return OpenAIEmbeddings(model="text-embedding-3-small")
