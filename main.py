from dotenv import load_dotenv

load_dotenv()

from project.graph import get_graph  # noqa: E402

graph = get_graph()
app = graph.compile()
