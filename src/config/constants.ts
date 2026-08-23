// Routed through OpenRouter (see OPENROUTER_BASE_URL below).
// openai/text-embedding-3-small produces 1536-dim vectors — matches lesson_embeddings.embedding VECTOR(1536).
export const EMBEDDING_MODEL = "openai/text-embedding-3-small";
export const EMBEDDING_DIM = 1536;
export const CHAT_MODEL = "meta-llama/llama-3.3-70b-instruct";
export const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
