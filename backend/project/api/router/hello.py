import logging
import uuid
from typing import Annotated, Dict, Literal, Union

from fastapi import APIRouter, Depends, WebSocket
from langgraph.graph.state import CompiledStateGraph
from langgraph.types import Command
from pydantic import BaseModel

from project.api.lifespan import get_graph
from project.graph.model import CustomMessageState

router = APIRouter()


class ClientPayload(BaseModel):
    name: Literal["user", "operator"]
    content: str


class Envelope(BaseModel):
    payload: Union[CustomMessageState, ClientPayload]


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    graph: Annotated[CompiledStateGraph, Depends(get_graph)],
    config: Annotated[
        Dict, Depends(lambda: {"configurable": {"thread_id": str(uuid.uuid4())}})
    ],
):
    await websocket.accept()
    logging.info(
        f"websocket connected with thread_id: {config['configurable']['thread_id']}"
    )
    result: CustomMessageState = await graph.ainvoke({}, config=config)
    while "__interrupt__" in result:
        await websocket.send_json(Envelope(payload=result).model_dump())
        data = await websocket.receive_json()
        envelope = Envelope.model_validate(data)
        result: CustomMessageState = await graph.ainvoke(
            Command(resume=envelope.payload.content), config=config
        )

    await websocket.send_json(Envelope(payload=result).model_dump())
    await websocket.close()
