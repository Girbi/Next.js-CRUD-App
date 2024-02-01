import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="containter flex flex-col items-center gap-2 pt-10 sm:gap-5 sm:pt-20">
      <span className="text-lg font-medium sm:text-2xl">Nu exista pagina!</span>
      <Button variant="link" className="sm:text-lg" asChild>
        <Link href="/">Acasa</Link>
      </Button>
    </div>
  )
}
