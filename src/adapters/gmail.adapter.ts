export async function gmailReadEmails(options: {
  maxResults: number
}) {
  // TEMP MOCK for Day 6
  // Replace with real Gmail API later

  return [
    {
      id: "email_1",
      from: "example@company.com",
      subject: "Welcome",
      snippet: "Thanks for signing up..."
    },
    {
      id: "email_2",
      from: "alerts@bank.com",
      subject: "Monthly Statement",
      snippet: "Your statement is ready..."
    }
  ].slice(0, options.maxResults)
}
