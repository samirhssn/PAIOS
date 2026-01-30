import { runPipeline } from "./pipeline/pipeline.service"
import { intentDraftEmail, intentSendEmail } from "./pipeline/intent.mock"
import { draftEmailPlan } from "./pipeline/plan.mock"
import { gmailPermission } from "./pipeline/permission.mock"

console.log("---- SUCCESS CASE ----")
runPipeline(intentDraftEmail, draftEmailPlan, gmailPermission)

console.log("---- REJECTION CASE ----")
runPipeline(intentSendEmail as any, draftEmailPlan, gmailPermission)
