// src/components/ContactForm.tsx
import { useForm } from 'react-hook-form'
import { actions } from 'astro:actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { messageSchema, type TMessageForm } from '../lib/schemas/contact'
import { toast } from 'sonner'

export default function ContactForm() {
  const isDev = import.meta.env.MODE === 'development'

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
        // alert('Something went wrong: ' + result.error.message)
        toast.error('Something went wrong – message not sent.')
      } else {
        // alert('Message sent! ✅')
        toast.success('Your message has been sent!')
        reset()
      }
    } catch (err) {
      console.error(err)
      // alert('Unexpected error, please try again.')
      toast.error('An unexpected error occurred, please try again.')
    }
  }

  return (
    <div
      className="mx-auto w-full max-w-lg px-8 py-12 bg-black/20 border-1 border-white"
      style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
    >
      {/* <h2 className="fade-up text-3xl text-center text-white font-bold mb-8 [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
        Get in Touch
      </h2> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div
          className="fade-up form-input-and-label"
          style={{ transitionDelay: '100ms' }}
        >
          <label className="form-label text-white/80" htmlFor="first-name">
            Name <span className="text-red-300">*</span>
          </label>
          <input
            {...register('firstName', { required: 'First name is required' })}
            type="text"
            placeholder="Enter your name here"
            className="form-input-2 w-full text-white border-white/50 placeholder:text-white/40"
            id="first-name"
            defaultValue={isDev ? 'test-name' : ''}
          />
          <div className="form-error-div">
            {errors.firstName && (
              <p className="form-error-content text-red-300">{`${errors.firstName.message}`}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div
          className="fade-up form-input-and-label"
          style={{ transitionDelay: '200ms' }}
        >
          <label className="form-label text-white/80" htmlFor="email">
            Email Address <span className="text-red-300">*</span>
          </label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Enter your email address here"
            className="form-input-2 w-full text-white border-white/50 placeholder:text-white/40"
            id="email"
            defaultValue={isDev ? 'martinrtownley@gmail.com' : ''}
          />
          <div className="form-error-div">
            {errors.email && (
              <p className="form-error-content text-red-300">{`${errors.email.message}`}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div
          className="fade-up form-input-and-label"
          style={{ transitionDelay: '300ms' }}
        >
          <label className="form-label text-white/80" htmlFor="message">
            Message <span className="text-red-300">*</span>
          </label>
          <textarea
            {...register('message', { required: 'Message is required' })}
            placeholder="Enter your message here"
            className="form-input-2 w-full h-32 resize-none text-white border-white/50 placeholder:text-white/40"
            id="message"
            defaultValue={
              isDev
                ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
                : ''
            }
          />
          <div className="form-error-div">
            {errors.message && (
              <p className="form-error-content text-red-300">{`${errors.message.message}`}</p>
            )}
          </div>
        </div>

        {/* Send Copy */}
        <div
          className="fade-up flex items-center gap-2 mb-6"
          style={{ transitionDelay: '400ms' }}
        >
          <label
            htmlFor="send-copy"
            className="flex items-center gap-2 text-white/80 text-base"
          >
            <input
              id="send-copy"
              type="checkbox"
              {...register('sendCopy')}
              className="h-4 w-4 accent-theme-pink-bright "
            />
            Email me a copy of this message
          </label>
        </div>

        {/* Submit */}
        <div className="fade-up flex" style={{ transitionDelay: '500ms' }}>
          <button
            disabled={isSubmitting}
            type="submit"
            className="mx-auto bg-theme-pink-bright text-white font-semibold disabled:bg-gray-500 py-2 px-4 rounded border border-white"
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}
