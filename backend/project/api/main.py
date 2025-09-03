import uvicorn
from fastapi import FastAPI

from project.api.lifespan import lifespan
from project.api.router import hello

app = FastAPI(lifespan=lifespan)

app.include_router(hello.router)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
