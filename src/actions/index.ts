import { ActionError, defineAction } from 'astro:actions'
import { Resend } from 'resend'
import { z } from 'astro:schema'

export const messageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
})

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const server = {
  send: defineAction({
    accept: 'json',
    input: messageSchema,

    async handler({ name, email, message }) {
      console.log('✅ Action triggered!')
      console.log('Incoming data:', { name, email, message })
      //   const { data, error } = await resend.emails.send({
      //     from: 'JZ Therapy <onboarding@resend.dev>',
      //     to: ['martloaf.townley@gmail.com'],
      //     subject: 'Message from TherapyJZ Contact Form',
      //     text: `From ${name} (${email}) \n\n${message}`,
      //   })

      const { data, error } = await resend.emails.send({
        from: 'JZ Therapy <onboarding@resend.dev>',
        to: ['martloaf.townley@gmail.com'],
        subject: 'TestSubject',
        text: `Did this work?`,
      })

      if (error) {
        console.error('❌ Resend error:', error)
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        })
      }

      console.log('✅ Email sent:', data)
      return data
    },
  }),
}
