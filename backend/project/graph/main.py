from project.graph.graph import (  # noqa: E402
    get_graph_builder,
)

builder = get_graph_builder()
app = builder.compile()
