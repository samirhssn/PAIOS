export function createExecutionProposal(plan: any) {
  return {
    proposal_id: crypto.randomUUID(),
    steps: plan.steps,
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 min
    approved: false
  }
}
