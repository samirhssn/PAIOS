export const intentDraftEmail = {
  intent_type: "draft_email",
  entities: {
    email_address: "test@example.com",
    subject: "Hello"
  },
  confidence: 0.92,
  rejection_reason: null
}

export const intentSendEmail = {
  intent_type: "send_email",
  entities: {
    email_address: "test@example.com"
  },
  confidence: 0.95,
  rejection_reason: null
}
