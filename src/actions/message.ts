// import { defineAction, ActionError } from 'astro:actions'
// import { Resend } from 'resend'
// import { RESEND_API_KEY } from 'astro:env/server'

// const resend = new Resend(RESEND_API_KEY)

// export const server = {
//   send: defineAction({
//     accept: 'json',
//     async handler({ name, email, message }) {
//       const { data, error } = await resend.emails.send({
//         from: 'JZ Therapy <onboarding@resend.dev>',
//         to: ['you@example.com'],
//         subject: `Message from ${name}`,
//         text: message,
//       })

//       if (error)
//         throw new ActionError({ code: 'BAD_REQUEST', message: error.message })
//       return { data }
//     },
//   }),
// }
