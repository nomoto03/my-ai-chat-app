## ローカルLLMチャットアプリ（Next.js + Ollama + 3D Avatar）

このリポジトリは、ローカルで動作する LLM（Ollama）をバックエンドに用い、Next.js フロントエンド上でストリーミング応答と 3D アバター表示を行うチャットアプリです。

`concept.md` に初期コンセプトをまとめています。README では、実行手順と使い方、API 仕様などを簡潔に説明します。

---

### 主な機能
- **ローカル推論**: Ollama 経由で Gemma 系モデルを使用（既定は `gemma:3b`）
- **ストリーミング応答**: SSE による逐次表示
- **3D アバター**: React Three Fiber による 3D Canvas（現在はダミーのキューブ表示）
- **モダンUI**: Tailwind CSS + Framer Motion

---

### アーキテクチャ概要
- フロントエンド: Next.js App Router（`/src/app`）
- API ルート: `POST /api/chat` → ローカル Ollama（`http://localhost:11434/api/chat`）へプロキシ
- ストリーミング: Ollama の SSE をそのままフロントへ中継
- 3D: `@react-three/fiber` + `@react-three/drei`

---

### 動作要件
- Node.js 18 以上を推奨（Next.js 14）
- npm または pnpm / yarn
- Ollama（ローカル推論サーバ）

---

### セットアップ
1) 依存関係のインストール
```bash
npm install
# または
# pnpm install
# yarn install
```

2) Ollama の用意
- Ollama をインストールして起動します（インストール方法は公式を参照）。
- 既定モデル `gemma:3b` を取得:
```bash
ollama pull gemma:3b
```
- デフォルトの Ollama エンドポイントは `http://localhost:11434` です。

3) 開発サーバ起動
```bash
npm run dev
```
- ブラウザで `http://localhost:3000` を開き、チャットを試せます。

---

### 使い方
- 画面左のチャット欄にメッセージを入力し、Send で送信します。
- 応答はストリーミングで逐次表示されます。
- 右側に 3D Canvas（ダミーオブジェクト）を表示します。

---

### スクリプト
```bash
npm run dev    # 開発サーバ
npm run build  # 本番ビルド
npm run start  # 本番サーバ起動（build 済み前提）
npm run lint   # Lint
```

---

### API 仕様（フロントからの利用）
- エンドポイント: `POST /api/chat`
- リクエストボディ:
```json
{
  "messages": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "..." }
  ]
}
```
- レスポンス: `text/event-stream`（SSE）。`data: { ... }` 形式の行を逐次送信。
  - 各 `data:` の JSON に `message.content` が含まれると、UI 側で追記して表示します。

テスト用 `curl` 例（SSE 表示が崩れる場合があります）:
```bash
curl -N -H "Content-Type: application/json" \
  -X POST http://localhost:3000/api/chat \
  -d '{
    "messages": [
      { "role": "user", "content": "こんにちは" }
    ]
  }'
```

---

### 設定・カスタマイズ
- **モデルの変更**: `src/app/api/chat/route.ts` の `model` を編集（既定は `gemma:3b`）。
```ts
// src/app/api/chat/route.ts
body: JSON.stringify({
  model: "gemma:3b",
  messages: messages,
  stream: true,
}),
```
- **Ollama のエンドポイント**: 既定は `http://localhost:11434`。変更したい場合は同ファイルの URL を書き換えてください。
- **3D アバター**: `src/components/avatar-3d.tsx` はダミーを表示中。GLTF/GLB を読み込む場合は drei の `useGLTF` などに差し替えてください。

---

### ディレクトリ構成（抜粋）
```
src/
  app/
    api/
      chat/
        route.ts        # Ollama へプロキシ（SSE）
    layout.tsx
    page.tsx            # 左: チャット / 右: 3D Canvas
  components/
    chat-interface.tsx  # チャットUI（SSEの読み取り＆表示）
    avatar-3d.tsx       # 3D Canvas（ダミー）
```

---

### 技術スタック
- Next.js 14, React 18, TypeScript
- Tailwind CSS, Framer Motion
- React Three Fiber, drei, three
- Zustand（導入予定/拡張余地）

---

### よくあるトラブルシュート
- 500 エラー / 応答が来ない:
  - Ollama が起動しているか (`11434` ポート) を確認
  - 対象モデル（既定: `gemma:3b`）を `ollama pull` 済みか確認
  - `src/app/api/chat/route.ts` の URL/モデル名が環境に合っているか確認

---

### ロードマップ（概略）
- SSE ベースのチャット安定化
- GLTF/GLB モデル読み込み・リップシンク/アニメ制御
- 履歴保存（IndexedDB / localStorage）
- 設定画面（モデル切替、テーマ切替など）
- UI/アニメーションのブラッシュアップ

詳細は `concept.md` を参照してください。

---

### ライセンス
- 本プロジェクトのライセンスは未定義です。必要に応じて追記してください。 