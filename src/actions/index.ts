//src/actions/index.ts

import { ActionError, defineAction } from 'astro:actions'
import { Resend } from 'resend'
import { z } from 'astro:schema'
import { RESEND_API_KEY } from 'astro:env/server'

export const messageSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  message: z.string(),
})

const resend = new Resend(RESEND_API_KEY)

export const server = {
  sendEmail: defineAction({
    accept: 'json',
    input: messageSchema,

    handler: async ({ firstName, lastName, email, message }) => {
      console.log('✅ Action triggered!')
      console.log('Incoming data:', { firstName, lastName, email, message })

      try {
        const { data, error } = await resend.emails.send({
          from: 'JZ Therapy <onboarding@resend.dev>',
          to: ['martloaf.townley@gmail.com'],
          subject: 'Message from TherapyJZ Contact Form',
          text: `From ${firstName} ${lastName} (${email}) \n\n${message}`,
        })

        // const { data, error } = await resend.emails.send({
        //   from: 'JZ Therapy <onboarding@resend.dev>',
        //   to: ['martloaf.townley@gmail.com'],
        //   subject: 'TestSubject',
        //   text: `Did this work?`,
        // })

        if (error) {
          console.error('❌ Resend error:', error)
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: error.message,
          })
        }

        console.log('✅ Email sent:', data)
        return data
      } catch (err) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Email Failed',
        })
      }
    },
  }),
}
