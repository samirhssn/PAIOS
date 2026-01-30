import { readFileSync } from "fs"
import Ajv from "ajv"

const ajv = new Ajv()

const schema = JSON.parse(
  readFileSync("contracts/permission.schema.json", "utf-8")
)

const validate = ajv.compile(schema)

export function validatePermission(permission: unknown) {
  const valid = validate(permission)
  if (!valid) {
    throw new Error("Permission validation failed")
  }
  return permission
}
