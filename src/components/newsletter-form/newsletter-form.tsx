
"use client";
import { cn } from '@/utils/cn'
import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import Buttons from '@/components/buttons/buttons'

function NewsletterForm({
  className,
  submitText = 'Submit',
}: {
  className?: string
  onSubmit: (email: string) => Promise<any>
  submitText?: string
}) {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess(false)
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const result = await response.json();
      console.log(result);
      setEmail('');
      setSuccess(true);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={cn('newsletter-form is-revealing flex flex-col gap-2 sm:flex-row', className)}
      >
        <div className="mr-2 flex-shrink flex-grow">
          <label className="hidden" htmlFor="email" aria-hidden="true">
            Email
          </label>
          <input
            required
            placeholder="Your best email&hellip;"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            autoComplete="off"
            className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm text-gray-500 shadow-none"
          />
          {success && (
            <div className="mt-2 text-xs italic text-gray-500">Email submitted successfully!</div>
          )}
          {error && (
            <div className="mt-2 text-xs italic text-red-500">Error: {error}</div>
          )}
        </div>

        <div className="control">
          <button
            className="-mt-px inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 px-7 py-4 text-center font-medium leading-4 text-white no-underline shadow-lg"
            type="submit"
          >
            {submitText}
          </button>
        </div>
      </form>
      <Buttons />
    </div>
  )
}

export default NewsletterForm

