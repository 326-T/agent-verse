from typing import Optional

from langchain_core.messages.utils import AnyMessage
from langgraph.graph import add_messages
from pydantic import BaseModel
from typing_extensions import Annotated


class CustomMessageState(BaseModel):
    should_continue: bool = True
    should_escalate: bool = False
    selected_agent: Optional[str] = None
    selected_agent_id: Optional[str] = None
    selected_agent_evaluation: Optional[str] = None
    messages: Annotated[list[AnyMessage], add_messages] = []
