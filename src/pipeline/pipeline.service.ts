import { validateIntent } from "../validators/intent.validator"
import { validatePlan } from "../validators/plan.validator"
import { validatePermission } from "../validators/permission.validator"
import { auditLog } from "./audit-log.service"

/* Day 3 */
import { parseIntentFromText } from "./intent.parser"
import { mapIntentToPlan } from "./plan.mapper"

/* Day 4 */
import { parseIntentWithLLM } from "./intent.llm"

/* Day 5 */
import { createExecutionProposal } from "./execution-proposal"
import { requestUserConfirmation } from "./confirmation.service"

/* Day 6 */
import { gmailReadEmails } from "../adapters/gmail.adapter"


export function runPipeline(
  intent: any,
  plan: any,
  permission: any
) {
  auditLog({ stage: "INTENT_INPUT", data: intent })
  validateIntent(intent)

  auditLog({ stage: "PLAN_INPUT", data: plan })
  validatePlan(plan)

  auditLog({ stage: "PERMISSION_INPUT", data: permission })
  validatePermission(permission)

  for (const step of plan.steps) {
    if (!permission.allowed_actions.includes(step.action_type)) {
      auditLog({
        stage: "PERMISSION_DENIED",
        data: step
      })
      throw new Error(
        `Permission denied for action: ${step.action_type}`
      )
    }
  }

  auditLog({
    stage: "DRY_RUN_EXECUTION",
    data: plan.steps
  })

  return {
    status: "DRY_RUN_SUCCESS",
    executedSteps: plan.steps
  }
}

/* Day 3 */
export function runPipelineFromText(
  userInput: string,
  permission: any
) {
  const intent = parseIntentFromText(userInput)
  auditLog({ stage: "INTENT_PARSED", data: intent })
  validateIntent(intent)

  const plan = mapIntentToPlan(intent)
  auditLog({ stage: "PLAN_MAPPED", data: plan })
  validatePlan(plan)

  validatePermission(permission)

  for (const step of plan.steps) {
    if (!permission.allowed_actions.includes(step.action_type)) {
      auditLog({ stage: "PERMISSION_DENIED", data: step })
      throw new Error(`Permission denied: ${step.action_type}`)
    }
  }

  auditLog({ stage: "DRY_RUN_EXECUTION", data: plan.steps })

  return {
    status: "DRY_RUN_SUCCESS",
    executedSteps: plan.steps
  }
}

/* Day 4 + Day 5 */
export async function runPipelineFromTextLLM(
  userInput: string,
  permission: any
) {
  const intent = await parseIntentWithLLM(userInput)
  auditLog({ stage: "INTENT_LLM_OUTPUT", data: intent })

  validateIntent(intent)

  const plan = mapIntentToPlan(intent)
  auditLog({ stage: "PLAN_MAPPED", data: plan })

  validatePlan(plan)
  validatePermission(permission)

  for (const step of plan.steps) {
    if (!permission.allowed_actions.includes(step.action_type)) {
      auditLog({ stage: "PERMISSION_DENIED", data: step })
      throw new Error(`Permission denied: ${step.action_type}`)
    }
  }

  /* Day 5 — EXECUTION GATE */
  const proposal = createExecutionProposal(plan)
  auditLog({ stage: "EXECUTION_PROPOSED", data: proposal })

  const confirmed = await requestUserConfirmation(proposal)

  if (!confirmed.approved) {
    auditLog({ stage: "EXECUTION_REJECTED", data: confirmed })
    throw new Error("User rejected execution")
  }

  auditLog({ stage: "EXECUTION_APPROVED", data: confirmed })

  /* Still dry-run */
  // auditLog({ stage: "DRY_RUN_EXECUTION", data: plan.steps })

  /* Day 6 */
  const results = []

  for (const step of plan.steps) {
    if (step.action_type === "gmail_read") {
      const emails = await gmailReadEmails({ maxResults: 5 })
      results.push({ step, result: emails })
    }
  }

  auditLog({ stage: "READ_EXECUTION_RESULT", data: results })


  return {
    status: "DRY_RUN_SUCCESS",
    executedSteps: plan.steps
  }
}




