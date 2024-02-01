'use client'
import { SERVER_ENDPOINT } from '@/utils/constants'
import { revalidatePathAction } from '@/utils/revalidateAction'
import { Trash2 } from 'lucide-react'
import { Button } from './Button'
import { useRouter } from 'next/navigation'

type DeleteButtonProps = {
  id: number
  fetchUrl: string
}

export default function DeleteButton({ id, fetchUrl }: DeleteButtonProps) {
  const router = useRouter()
  async function handleDelete() {
    try {
      await fetch(`${SERVER_ENDPOINT}/${fetchUrl}`, {
        body: JSON.stringify({ id }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await revalidatePathAction('/')
      router.refresh()
    } catch (e) {
      const error = e as Error
      console.log(error.message)
    }
  }

  return (
    <form onSubmit={handleDelete}>
      <Button
        variant="ghost"
        title="Sterge"
        className="absolute right-2 top-1 rounded-full border-0 p-2 hover:text-red-500 focus-visible:text-red-500 focus-visible:ring-0">
        <Trash2 className="h-auto w-5" strokeWidth={2.5} />
      </Button>
    </form>
  )
}
