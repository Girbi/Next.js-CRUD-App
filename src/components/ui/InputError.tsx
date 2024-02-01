export default function InputError({
  message,
}: {
  message: string | undefined
}) {
  return <span className="block pl-1 font-medium text-red-600">{message}</span>
}
