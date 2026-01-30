import { runPipeline, runPipelineFromText, runPipelineFromTextLLM } from "./pipeline/pipeline.service"
import { intentDraftEmail, intentSendEmail } from "./pipeline/intent.mock"
import { draftEmailPlan } from "./pipeline/plan.mock"
import { gmailPermission } from "./pipeline/permission.mock"


/* Day 2
console.log("---- SUCCESS CASE ----")
runPipeline(intentDraftEmail, draftEmailPlan, gmailPermission)

console.log("---- REJECTION CASE ----")
runPipeline(intentSendEmail as any, draftEmailPlan, gmailPermission)
*/


/* Day 3 */
// console.log("---- USER TEXT: draft email ----")
// runPipelineFromText("please draft an email", gmailPermission)

// console.log("---- USER TEXT: send email ----")
// runPipelineFromText("please send an email", gmailPermission)


async function main() {
  // console.log("---- LLM: draft email ----")
  // await runPipelineFromTextLLM("please draft an email", gmailPermission)

  // console.log("---- LLM: send email ----")
  // await runPipelineFromTextLLM("please send an email", gmailPermission)

  console.log("---- LLM: read email ----")
  await runPipelineFromTextLLM("read my emails", gmailPermission)
}

main().catch(err => {
  console.error(err.message)
})