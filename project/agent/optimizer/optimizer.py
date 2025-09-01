from langgraph.store.base import BaseStore

from project.llm import get_chatmodel
from project.model import CustomMessageState


def agent_optimizer(state: CustomMessageState, store: BaseStore) -> CustomMessageState:
    """
    エージェントを最適化し更新するノード
    """
    optimization_prompt = f"""
あなたはプロンプトに基づき問い合わせを「ステップ・バイ・ステップ」で解決するプロセス設計の専門家です。
以下に示した会話ログ、使用したプロンプトを解析して、問い合わせを解決するために必要な処理（アクション）を順序立てて整理した「実行可能な手順書（ステップ順のプロセス）」を生成してください。
出力は必ず有効なYAML形式のみとし、説明や注釈、追加文は一切含めないでください。

会話ログ:
{state.messages}

エージェントプロンプト:
{state.selected_agent}

今回のエージェントによる対応の評価:
{state.selected_agent_evaluation}

出力フォーマット（必ずこの構造で有効なYAMLを返すこと）:
plan:
  problem_summary: <短い要約（1行）>
  priority: <高|中|低|null>
  derived_from: <ログ内の識別子や根拠の要約（例: session_id, 会話の主要トピック）|null>
  root_cause_hypotheses:
    - id: <string>
      hypothesis: <string>
      confidence: <0.0-1.0|null>
  required_resources:
    - id: <string>
      type: <人|ツール|データ|その他>
      description: <string>
  timeline:
    start_date: <ISO8601|null>
    end_date: <ISO8601|null>
    checkpoints:
      - id: <string>
        name: <string>
        due_offset_days: <整数|null>
  rollback_plan:
    id: <string|null>
    steps: [<string>, ...] | null
  steps:
    - id: <string>
      title: <短いタイトル>
      action: <実行する具体的なアクション（命令形）>
      rationale: <なぜこのアクションが必要か（短文）>
      inputs:
        - id: <string>
          description: <string>
      outputs:
        - id: <string>
          description: <string>
      estimated_duration_minutes: <数値|null>
      owner: <string|null>
      prerequisites: [<step_id or requirement>, ...]
      verification_criteria: <成功を判定する条件（短文）>
      subtasks:
        - id: <string>
          action: <string>
          estimated_duration_minutes: <数値|null>
  checklist:
    - id: <string>
      item: <チェック項目>
      required: <true|false>
      owner: <string|null>

指示:
- messages から必要な処理を抽出し、実行順に steps に並べること。順序不明な場合は優先度と並列可能性を示すために prerequisites を使うこと。
- 各 step は具体的に誰が何をいつまでに確認・実行するかが分かるようにすること。
- タイムスタンプはあれば ISO8601 に正規化、なければ null またはメッセージ順序に基づく推定を使うこと。
- derived_from に session_id や conversation_id があれば入れること、なければ null。
- 出力は厳密に有効なYAMLのみ。説明文や注釈、追加出力は一切禁止。
"""
    msg = get_chatmodel().invoke(optimization_prompt)
    store.put(
        namespace=("prompts", "agents"),
        key=state.selected_agent_id,
        value={"scenario": msg.content, "src_prompt": optimization_prompt},
        index=["scenario"],
    )

    return state
