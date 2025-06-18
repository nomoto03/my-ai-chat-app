# Chatアプリケーションコンセプト

## 概要

ローカル実行可能なLLM（Gemma3:4b via Ollama）をバックエンドに用い、モダンなWebフロントエンド上でリアルタイムチャットと3Dアバター表示を実現するアプリケーション。

## 目的・ゴール

* **プライバシー保護**：全ての処理をローカルで完結
* **高速レスポンス**：ストリーミングAPI（SSE/WebSocket）による即時応答
* **直感的UI**：Tailwind CSS と shadcn/ui によるシンプルで洗練されたデザイン
* **没入感のある表現**：React Three Fiber と Framer Motion で動的な3Dキャラクター演出

## アーキテクチャ

```mermaid
flowchart LR
  A[ユーザーブラウザ] -->|HTTP/WebSocket| B[Next.js API]
  B -->|内部HTTP| C[Ollama (Gemma3)]
  C --> B
  B --> A
  A --> D[3D Canvas (Three Fiber)]
```

## 技術スタック

| レイヤー      | 技術                       | 理由                                      |
| --------- | ------------------------ | --------------------------------------- |
| バックエンド    | Node.js + TypeScript     | Next.js App Router + API Routes で統合的に管理 |
| API呼び出し   | axios                    | Promiseベースでストリーミング対応しやすい                |
| リアルタイム    | SSE or WebSocket         | チャット応答の逐次表示を実現                          |
| フロントエンド   | Next.js + TypeScript     | SSR/ISR と API がシームレス、型安全                |
| UIフレームワーク | Tailwind CSS + shadcn/ui | ユーティリティ＋コンポーネントライブラリで高速開発               |
| 状態管理      | Zustand                  | 軽量かつ直感的、グローバル状態管理に最適                    |
| データ同期     | SWR or React Query       | キャッシュ＋再取得／リトライ機能を自動で                    |
| アニメーション   | Framer Motion            | モダンで滑らかなUIアニメーション                       |
| 3D表現      | React Three Fiber + drei | Three.jsをReactで扱いやすく、GLTFモデル読み込み簡易化     |

## 主な機能要件

1. **チャットUI**

   * 入力フィールド + 送信ボタン
   * SSE/WebSocketによるストリーミング応答表示
2. **3Dアバター**

   * GLTF/GLBモデル読み込み
   * `speaking`フラグでリップシンク・アニメ制御
3. **履歴管理**

   * IndexedDB/localStorage で会話履歴保存
4. **多言語対応（将来）**

   * i18n対応可能な設計
5. **設定画面**

   * モデル切替、プロンプトテンプレート管理、テーマ切替

## UI/UX デザイン

* **ダーク＆ライトモード**切替
* **レスポンシブ対応**（モバイル／PC）
* **モダンなカード／バブル**レイアウト
* **フローティング3D Canvas**：チャット欄と並列またはオーバーレイ表示

## 開発ロードマップ

1. 環境構築：Next.js + Ollama 連携確認
2. ベーシックチャットUI + SSE ストリーミング
3. 3Dアバター Canvas 組み込み
4. 状態管理・履歴保存機能追加
5. UIブラッシュアップ・アニメーション強化
6. プラグイン／エクステンション対応検討

---

*このドキュメントは、プロジェクトの初期コンセプトをまとめたものです。必要に応じて機能追加や技術変更を行ってください。*
