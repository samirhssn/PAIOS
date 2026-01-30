import { readFileSync } from "fs"
import Ajv from "ajv"

const ajv = new Ajv()

const schema = JSON.parse(
  readFileSync("contracts/action-plan.schema.json", "utf-8")
)

const validate = ajv.compile(schema)

export function validatePlan(plan: unknown) {
  const valid = validate(plan)
  if (!valid) {
    throw new Error("Plan validation failed")
  }
  return plan
}
