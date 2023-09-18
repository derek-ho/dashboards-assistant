/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export const API_BASE = '/api/assistant';
export const DSL_BASE = '/api/dsl';
export const DSL_SEARCH = '/search';

export const ASSISTANT_API = {
  LLM: `${API_BASE}/send_message`,
  HISTORY: `${API_BASE}/chats`,
  PPL_GENERATOR: `${API_BASE}/generate_ppl`,
  AGENT_TEST: `${API_BASE}/agent_test`,
  FEEDBACK: `${API_BASE}/feedback`,
} as const;

export const LLM_INDEX = {
  FEEDBACK: '.llm-feedback',
  TRACES: '.llm-traces',
  VECTOR_STORE: '.llm-vector-store',
};
