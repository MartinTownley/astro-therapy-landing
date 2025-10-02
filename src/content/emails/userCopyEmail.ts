export function userCopyEmail({
  firstName,
  message,
  isDev = false,
}: {
  firstName: string
  message: string
  isDev?: boolean
}) {
  const subject = isDev
    ? `[TESTING] Copy of your message to TherapyJZ`
    : `Copy of your message to TherapyJZ`

  const text = isDev
    ? `Hi ${firstName},\n\n[TESTING] This is a copy of the message you sent.\nPlease do not reply.\n\nMessage:\n${message}`
    : `Hi ${firstName},\n\nThis is a copy of the message you sent to TherapyJZ.\nPlease do not reply to this message directly.\n\nMessage:\n${message}`

  return { subject, text }
}
