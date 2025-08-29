# Agent Research

エージェント自動生成を検証するためのリポジトリ

## 概要

このプロジェクトは、LangGraphを使用したシンプルな対話型AIエージェントです。OpenAIのGPT-4o-miniモデルを活用して、エージェントの自動生成機能を研究・検証することを目的としています。

## 技術スタック

- **Python 3.12+**: プログラミング言語
- **LangGraph**: グラフベースのエージェントフレームワーク
- **LangChain OpenAI**: OpenAI API統合
- **uv**: 高速パッケージマネージャー

## セットアップ

### 前提条件

- Python 3.12以上
- OpenAI APIキー

### インストール

1. リポジトリをクローン
```bash
git clone <repository-url>
cd agent-research
```

2. 依存関係をインストール
```bash
uv sync
```

3. 環境変数を設定
```bash
cp .env.sample .env
# .envファイルにOpenAI APIキーを設定
```

## 使い方

### アプリケーションの起動

```bash
langgraph up
```

アプリケーションが起動すると、LangGraph Studioを通してエージェントと対話できます。

### 開発コマンド

```bash
# 依存関係の追加
uv add <パッケージ名>

# 依存関係の更新
uv sync
```

## アーキテクチャ

このエージェントは非常にシンプルな構造を持っています：

1. **メッセージ受信**: ユーザーからのメッセージを受け取る
2. **LLM処理**: OpenAIのGPT-4o-miniで応答を生成
3. **応答返却**: 生成された応答をユーザーに返す

```python
graph = StateGraph(MessagesState)
graph.add_node("llm", answer)
graph.add_edge("__start__", "llm")
graph.add_edge("llm", "__end__")
```

## ファイル構成

- `main.py`: メインのLangGraphアプリケーション
- `langgraph.json`: LangGraphの設定ファイル
- `pyproject.toml`: Pythonプロジェクトの設定
- `.env`: 環境変数（APIキーなど）

## 今後の拡張予定

- より複雑なエージェントワークフローの実装
- 複数ノードでの並列処理
- 外部ツールとの連携機能
- エージェントの自動生成機能の検証
