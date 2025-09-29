import { useForm } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form'
import { actions } from 'astro:actions'
import { messageSchema } from '../actions'
import type { z } from 'astro:schema'

type MessageForm = z.infer<typeof messageSchema>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MessageForm>()

  const onSubmit = async (data: MessageForm) => {
    try {
      // call astro action
      const result = await actions.send(data)

      if (result.error) {
        console.error(result.error)
        alert('Something went wrong: ' + result.error.message)
      } else {
        alert('Message sent! ✅')
        reset()
      }
    } catch (err) {
      console.error(err)
      alert('Unexpected error, please try again.')
    }
  }

  return (
    <div className="bg-white p-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 "
      >
        <input
          {...register('name', { required: 'Name is required' })}
          type="text"
          placeholder="Your Name"
          className="px-4 py-2 rounded-xl"
        />
        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          placeholder="Your Email Address"
          className="px-4 py-2 rounded-xl"
        />
        <textarea
          {...register('message', { required: 'Message is required' })}
          placeholder="Your Message"
          className="px-4 py-2 rounded-xl"
        />

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
