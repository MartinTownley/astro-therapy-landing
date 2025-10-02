// src/components/ContactForm.tsx
import { useForm } from 'react-hook-form'
import { actions } from 'astro:actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema, type TMessageForm } from '../lib/schemas/contact'

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TMessageForm>({ resolver: zodResolver(messageSchema) })

  const onSubmit = async (formData: TMessageForm) => {
    try {
      // call astro action
      const result = await actions.sendEmail(formData)

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
    <div className="bg-[#f8f9f6] mx-auto w-full max-w-2xl rounded-lg shadow-md py-12 px-6 md:px-12">
      <h2 className="text-3xl text-center text-theme-green font-bold mb-6">
        Contact Me
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-10"
      >
        {/* Outer Div */}

        {/* Name */}
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="first-name"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            placeholder="Enter your name here"
            className="form-input w-full"
            id="first-name"
            // defaultValue="test-first-name"
          />
          {errors.firstName && (
            <p className="text-sm italic mt-1 text-red-500">{`${errors.firstName.message}`}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Enter your email address here"
            className="form-input w-full"
            id="email"
            // defaultValue="testEmail@email.com"
          />
          {errors.email && (
            <p className="text-sm italic mt-1 text-red-500">{`${errors.email.message}`}</p>
          )}
        </div>
        {/* </div> */}

        {/* Message */}
        <div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="message"
          >
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('message', { required: 'Message is required' })}
            placeholder="Enter your message here"
            className="form-input w-full h-32"
            id="message"
            // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          {errors.message && (
            <p className="text-sm italic mt-1 text-red-500">{`${errors.message.message}`}</p>
          )}
        </div>

        {/* Send Copy */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="send-copy"
            className="flex items-center gap-2 text-gray-700 text-sm"
          >
            <input
              id="send-copy"
              type="checkbox"
              {...register('sendCopy')}
              className=" h-4 w-4 text-theme-green"
            />
            Send a copy of this query to my email address
          </label>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            disabled={isSubmitting}
            type="submit"
            className="mx-auto bg-theme-green-light text-white font-semibold disabled:bg-gray-500 py-2 px-4 rounded"
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
