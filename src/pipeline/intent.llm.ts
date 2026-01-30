export async function parseIntentWithLLM(input: string) {
  // TEMP MOCK — replace with real LLM later
  // Simulates untrusted AI output

  if (input.toLowerCase().includes("draft")) {
    return {
      intent_type: "draft_email",
      entities: {},
      confidence: 0.85,
      rejection_reason: null
    }
  }

  if (input.toLowerCase().includes("send")) {
    return {
      intent_type: "send_email",
      entities: {},
      confidence: 0.9,
      rejection_reason: null
    }
  }

  if (input.toLowerCase().includes("read") && input.toLowerCase().includes("email")) {
    return {
      intent_type: "read_email",
      entities: {},
      confidence: 0.9,
      rejection_reason: null
    }
  }


  return {
    intent_type: "unknown_intent",
    entities: {},
    confidence: 0.1,
    rejection_reason: "LLM could not classify"
  }
}
