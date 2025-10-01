import { z } from 'zod'

export const messageSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name must be under 50 characters' }),

  lastName: z
    .string()
    .max(50, { message: 'Last name must be under 50 characters' })
    .optional(),

  email: z.string().email({ message: 'Please enter a valid email address' }),

  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be under 1000 characters' }),
})

export type TMessageForm = z.infer<typeof messageSchema>
