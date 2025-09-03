from contextlib import asynccontextmanager
from functools import lru_cache
from typing import Annotated

from fastapi import Depends, FastAPI
from langgraph.checkpoint.postgres.aio import AsyncPostgresSaver
from langgraph.graph.state import CompiledStateGraph
from langgraph.store.postgres.aio import AsyncPostgresStore
from psycopg import AsyncConnection
from psycopg.rows import dict_row

from project.graph.env import Settings, get_settings
from project.graph.graph import get_graph_builder
from project.graph.llm import get_embedding_model


async def get_checkpointer(
    settings: Annotated[Settings, Depends(get_settings)],
) -> AsyncPostgresSaver:
    conn = await AsyncConnection.connect(
        settings.db_uri,
        autocommit=True,
        prepare_threshold=0,
        row_factory=dict_row,
    )
    return AsyncPostgresSaver(conn)


async def get_store(
    settings: Annotated[Settings, Depends(get_settings)],
) -> AsyncPostgresStore:
    conn = await AsyncConnection.connect(
        settings.db_uri,
        autocommit=True,
        prepare_threshold=0,
        row_factory=dict_row,
    )
    return AsyncPostgresStore(
        conn, index={"embed": get_embedding_model(), "dims": 1536, "fields": ["$"]}
    )


@lru_cache
def get_graph(
    checkpointer: Annotated[AsyncPostgresSaver, Depends(get_checkpointer)],
    store: Annotated[AsyncPostgresStore, Depends(get_store)],
) -> CompiledStateGraph:
    return get_graph_builder().compile(checkpointer=checkpointer, store=store)


@asynccontextmanager
async def lifespan(app: FastAPI):
    checkpointer = await get_checkpointer(get_settings())
    await checkpointer.setup()
    store = await get_store(get_settings())
    await store.setup()
    yield
