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
    <div className="bg-[#f8f9f6] mx-auto w-full rounded-lg shadow-md p-12">
      <h2 className="text-3xl text-center text-theme-green font-bold mb-6">
        Contact Me
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 "
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="first-name"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              type="text"
              placeholder=""
              className="form-input"
              id="first-name"
              defaultValue="test-first-name"
            />
            {errors.firstName && (
              <p className="text-sm italic mt-1 text-red-500">{`${errors.firstName.message}`}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="last-name"
            >
              Last Name
            </label>
            <input
              {...register('lastName')}
              type="text"
              placeholder=""
              className="form-input"
              id="last-name"
              defaultValue="test-last-name"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              placeholder="Your Email Address"
              className="form-input"
              id="email"
              defaultValue="testEmail@email.com"
            />
            {errors.email && (
              <p className="text-red-500">{`${errors.email.message}`}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="message"
            >
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              placeholder="Your Message"
              className="form-input h-32"
              id="message"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
            />
            {errors.message && (
              <p className="text-red-500">{`${errors.message.message}`}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
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
              Send a copy of this message to my email address
            </label>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-theme-green-light text-white font-semibold disabled:bg-gray-500 py-2 rounded"
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
