# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a LangGraph-based agent research project that implements a multi-agent system for conversational AI using OpenAI's models. The application is designed for experimenting with agent auto-generation, evaluation, and optimization capabilities.

## Architecture

- **main.py**: Entry point that loads environment and compiles the LangGraph application
- **project/graph.py**: Core LangGraph application defining a complex multi-node graph with conditional routing
- **project/model.py**: Custom state model (CustomMessageState) with agent selection and control flags
- **project/agent/**: Directory containing specialized agent modules:
  - **agents/**: Primary conversational agents that handle user queries
  - **coordinator/**: Coordinates workflow between different agent types
  - **orchestrator/**: Routes requests between agents and human operators
  - **generator/**: Generates new agent prompts and configurations
  - **evaluator/**: Evaluates agent performance and responses
  - **optimizer/**: Optimizes agent prompts based on evaluations
- **project/human.py**: Human operator and user interaction nodes
- **project/llm.py**: LLM configuration and utilities
- **langgraph.json**: Configuration file defining the graph entry point (`./main.py:app`) and environment settings
- **pyproject.toml**: Python project configuration using uv for dependency management

The application uses a complex StateGraph with CustomMessageState that:
1. Routes user messages through an orchestrator
2. Delegates to either specialized agents or human operators
3. Coordinates responses and handles escalations
4. Supports agent evaluation and optimization workflows
5. Manages agent selection and performance tracking

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

- **langchain**: Core LangChain framework for LLM applications
- **langchain-openai**: OpenAI integration for LLM operations  
- **langgraph**: Graph-based agent framework for complex workflows
- **langgraph-cli**: Command-line interface with in-memory storage
- **langgraph-sdk**: SDK for LangGraph operations
- **pydantic**: Data validation and settings management
- **python-dotenv**: Environment variable management

## Environment Configuration

The project expects a `.env` file for environment variables (primarily OpenAI API credentials).