# Agent Research

エージェント自動生成を検証するためのリポジトリ

## 概要

このプロジェクトは、LangGraph を使用したシンプルな対話型 AI エージェントです。OpenAI の GPT-4o-mini モデルを活用して、エージェントの自動生成機能を研究・検証することを目的としています。

## 技術スタック

- **Python 3.12+**: プログラミング言語
- **LangGraph**: グラフベースのエージェントフレームワーク
- **LangChain OpenAI**: OpenAI API 統合
- **uv**: 高速パッケージマネージャー

## セットアップ

### 前提条件

- Python 3.12 以上
- OpenAI API キー

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
uv run langgraph up
```

アプリケーションが起動すると、LangGraph Studio を通してエージェントと対話できます。

### 開発コマンド

```bash
# 依存関係の追加
uv add <パッケージ名>

# 依存関係の更新
uv sync
```
