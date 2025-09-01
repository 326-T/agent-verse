import logging

from langgraph.store.base import BaseStore

from project.model import CustomMessageState


def orchestrator(state: CustomMessageState, store: BaseStore):
    """
    オーケストレーターノード
    """
    hits = store.search(("prompts", "agents"), query=(state.messages[-1].content))
    logging.info(f"Orchestrator found {(hits)}")
    filtered = [h for h in hits if h.score >= 0.4]

    if len(filtered) == 0:
        state.should_escalate = True
        return state

    state.selected_agent = filtered[0].key
    state.selected_agent_id = filtered[0].value.get("embedding_text")
    return state
