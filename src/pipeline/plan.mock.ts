export const draftEmailPlan = {
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
