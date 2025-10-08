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
    <div className="bg-[#f8f9f6] mx-auto w-full max-w-2xl rounded-4xl shadow-md py-12 px-4 md:px-12">
      <h2 className="text-3xl text-center text-theme-green-light font-bold mb-6">
        Get in Touch
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // className="space-y-6 md:space-y-10"
      >
        {/* Outer Div */}

        {/* Name */}
        <div className="form-input-and-label">
          <label className="form-label" htmlFor="first-name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            placeholder="Enter your name here"
            className="form-input-2 w-full"
            id="first-name"
            // defaultValue="test-first-name"
          />
          <div className="form-error-div">
            {errors.firstName && (
              <p className="form-error-content">{`${errors.firstName.message}`}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="form-input-and-label">
          <label className="form-label" htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Enter your email address here"
            className="form-input-2 w-full"
            id="email"
            // defaultValue="testEmail@email.com"
          />
          <div className="form-error-div">
            {errors.email && (
              <p className="form-error-content">{`${errors.email.message}`}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="form-input-and-label">
          <label className="form-label" htmlFor="message">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('message', { required: 'Message is required' })}
            placeholder="Enter your message here"
            className="form-textarea w-full h-32"
            id="message"
            // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          />
          <div className="form-error-div">
            {errors.message && (
              <p className="form-error-content">{`${errors.message.message}`}</p>
            )}
          </div>
        </div>

        {/* Send Copy */}
        <div className="flex items-center gap-2 mb-6">
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
            Email me a copy of this message
          </label>
        </div>

        {/* Submit */}
        <div className="flex">
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
