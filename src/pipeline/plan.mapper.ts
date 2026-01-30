export function mapIntentToPlan(intent: any) {
  switch (intent.intent_type) {
    case "draft_email":
      return {
        steps: [
          {
            action_type: "gmail_draft",
            target_service: "gmail",
            reversible: true,
            requires_confirmation: true
          }
        ],
        plan_valid: true,
        failure_reason: null
      }

    case "read_email":
      return {
        steps: [
          {
            action_type: "gmail_read",
            target_service: "gmail",
            reversible: true,
            requires_confirmation: true
          }
        ],
        plan_valid: true,
        failure_reason: null
      }


    default:
      return {
        steps: [],
        plan_valid: false,
        failure_reason: "No plan available for intent"
      }
  }
}
