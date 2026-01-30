export function parseIntentFromText(input: string) {
  // TEMPORARY deterministic parser (NO LLM YET)

  const text = input.toLowerCase()

  if (text.includes("draft") && text.includes("email")) {
    return {
      intent_type: "draft_email",
      entities: {},
      confidence: 0.8,
      rejection_reason: null
    }
  }

  if (text.includes("send") && text.includes("email")) {
    return {
      intent_type: "send_email",
      entities: {},
      confidence: 0.9,
      rejection_reason: null
    }
  }

  return {
    intent_type: null,
    entities: {},
    confidence: 0,
    rejection_reason: "Unsupported intent"
  }
}
