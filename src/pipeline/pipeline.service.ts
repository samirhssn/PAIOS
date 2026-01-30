import { validateIntent } from "../validators/intent.validator"
import { validatePlan } from "../validators/plan.validator"
import { validatePermission } from "../validators/permission.validator"
import { auditLog } from "./audit-log.service"

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
