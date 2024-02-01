import {
  type FieldValues,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form'
import InputError from './InputError'
import { type HTMLInputTypeAttribute, type HTMLProps } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends HTMLProps<HTMLInputElement> {
  name: string
  type?: HTMLInputTypeAttribute
  label: string
  placeholder: string
  registerOptions?: RegisterOptions<FieldValues, string> | undefined
  children?: React.ReactNode
}

export default function Input({
  name,
  type,
  label,
  placeholder,
  registerOptions,
  children,
  ...props
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = errors[name]

  return (
    <div className="relative space-y-2">
      <label htmlFor={name}>
        <p className="pl-1 text-sm font-medium">{label}</p>
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(
          'flex w-full rounded-lg border bg-black px-3 py-2 text-sm outline-0 transition-colors duration-500 ease-out focus-visible:ring-1',
          error
            ? 'border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600'
            : 'focus-visible:ring-white'
        )}
        {...register(name, registerOptions)}
        {...props}
      />
      {children}
      <InputError message={error?.message as string} />
    </div>
  )
}
