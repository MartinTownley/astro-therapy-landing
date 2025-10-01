//src/actions/index.ts

import { ActionError, defineAction } from 'astro:actions'
import { Resend } from 'resend'
import { z } from 'astro:schema'
import { RESEND_API_KEY } from 'astro:env/server'
import { messageSchema } from '../lib/schemas/contact'

// export const messageSchema = z.object({
//   firstName: z
//     .string()
//     .min(1, { message: 'First name is required' })
//     .max(50, { message: 'First name must be under 50 characters' }),

//   lastName: z
//     .string()
//     .max(50, { message: 'Last name must be under 50 characters' }),

//   email: z.string().email({ message: 'Please enter a valid email address}' }),

//   message: z
//     .string()
//     .min(10, { message: 'Message must be at least 10 characters' })
//     .max(1000, { message: 'Message must be under 1000 characters' }),
// })

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
          from: '[TESTING] <noreply@therapyjz.com>',
          to: ['contact@therapyjz.com'],
          subject: 'Test Message from TherapyJZ Contact Form',
          text: `[Ignore] -- From ${firstName} ${lastName} (${email}) \n\n${message}`,
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
