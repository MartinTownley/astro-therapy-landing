//src/actions/index.ts

import { ActionError, defineAction } from 'astro:actions'
import { Resend } from 'resend'
import { RESEND_API_KEY } from 'astro:env/server'
import { messageSchema } from '../lib/schemas/contact'
import { ownerEmail } from '../content/emails/ownerEmail'
import { userCopyEmail } from '../content/emails/userCopyEmail'

const resend = new Resend(RESEND_API_KEY)

export const server = {
  sendEmail: defineAction({
    accept: 'json',
    input: messageSchema,

    handler: async ({ firstName, lastName, email, message, sendCopy }) => {
      console.log('✅ Action triggered!')
      console.log('Incoming data:', {
        firstName,
        lastName,
        email,
        message,
        sendCopy,
      })

      const isDev = import.meta.env.MODE === 'development'

      console.log(
        'Environment:',
        isDev ? 'development (TESTING)' : 'production',
      )

      let result

      // ------------------------
      // 1️⃣ Send clinic email (critical)
      // ------------------------

      try {
        const ownerContent = ownerEmail({
          firstName,
          lastName,
          email,
          message,
          isDev,
        })

        result = await resend.emails.send({
          from: '[TESTING] <noreply@therapyjz.com>',
          to: ['contact@therapyjz.com'],
          subject: ownerContent.subject,
          text: ownerContent.text,
        })

        if (result.error) {
          throw new ActionError({
            code: 'BAD_REQUEST',
            message: result.error.message,
          })
        }

        console.log('✅ Clinic email sent:', result.data)
      } catch (err) {
        // fail hard if clinic email doesn't send
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Clinic email failed',
        })
      }

      // ------------------------
      // 2️⃣ Send user copy (optional)
      // ------------------------

      if (sendCopy) {
        try {
          const userCopyContent = userCopyEmail({ firstName, message, isDev })

          const copyResult = await resend.emails.send({
            from: 'noreply@therapyjz.com',
            to: [email],
            subject: userCopyContent.subject,
            text: userCopyContent.text,
          })

          if (copyResult.error) {
            console.error('❌ Copy failed:', copyResult.error)
          } else {
            console.log('✅ Copy sent:', copyResult.data)
          }
        } catch (err) {
          console.error('❌ Unexpected copy error:', err)
        }
      }

      return result.data
    },
  }),
}
