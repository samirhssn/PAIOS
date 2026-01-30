import { readFileSync } from "fs"
import Ajv from "ajv"

const ajv = new Ajv()

const schema = JSON.parse(
  readFileSync("contracts/intent.schema.json", "utf-8")
)

const validate = ajv.compile(schema)

export function validateIntent(intent: unknown) {
  const valid = validate(intent)
  if (!valid) {
    throw new Error("Intent validation failed")
  }
  return intent
}
