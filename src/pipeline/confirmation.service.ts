export async function requestUserConfirmation(proposal: any) {
  // TEMP: simulate user confirmation
  // Later this becomes UI / API / mobile prompt

  console.log("CONFIRMATION REQUIRED:")
  console.log(JSON.stringify(proposal, null, 2))

  // simulate approval
  return {
    ...proposal,
    approved: true,
    approved_at: new Date().toISOString()
  }
}
