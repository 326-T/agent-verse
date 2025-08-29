# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a LangGraph-based agent research project that implements a simple conversational AI using OpenAI's GPT-4o-mini. The application is designed for experimenting with agent auto-generation capabilities.

## Architecture

- **main.py**: Contains the core LangGraph application with a single-node graph that processes messages through OpenAI's LLM
- **langgraph.json**: Configuration file defining the graph entry point (`./main.py:app`) and environment settings
- **pyproject.toml**: Python project configuration using uv for dependency management

The application uses a simple StateGraph with MessagesState that:
1. Takes incoming messages
2. Passes them to OpenAI's ChatOpenAI model (gpt-4o-mini)
3. Returns the response

## Development Commands

### Package Management
```bash
# Install dependencies
uv sync

# Add new dependencies
uv add <package-name>
```

### Running the Application
```bash
# Run with LangGraph CLI
langgraph up

# The application will be available as defined in langgraph.json
```

## Key Dependencies

- **langchain-openai**: OpenAI integration for LLM operations
- **langgraph**: Graph-based agent framework
- **langgraph-cli**: Command-line interface with in-memory storage
- **langgraph-sdk**: SDK for LangGraph operations

## Environment Configuration

The project expects a `.env` file for environment variables (primarily OpenAI API credentials).