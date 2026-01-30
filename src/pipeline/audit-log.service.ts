export function auditLog(entry: {
  stage: string
  data: unknown
}) {
  console.log(
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        ...entry
      },
      null,
      2
    )
  )
}
