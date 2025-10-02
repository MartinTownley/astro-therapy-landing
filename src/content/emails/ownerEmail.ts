export function ownerEmail({
  firstName,
  lastName = '',
  email,
  message,
  isDev = false,
}: {
  firstName: string
  lastName?: string
  email: string
  message: string
  isDev?: boolean
}) {
  const subject = isDev
    ? `[TESTING] New message from ${firstName} ${lastName}`
    : `New message from ${firstName} ${lastName}`

  const text = isDev
    ? `[TESTING] You’ve received a new message from the contact form.\n\nFrom: ${firstName} ${lastName} <${email}>\n\nMessage:\n${message}`
    : `You’ve received a new message from your contact form.\n\nFrom: ${firstName} ${lastName} <${email}>\n\nMessage:\n${message}`

  return { subject, text }
}
