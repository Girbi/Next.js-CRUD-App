import { prisma } from '@/server/db'
import { notFound } from 'next/navigation'
import EditEnrollmentForm from './EditEnrollmentForm'

type PageProps = {
  params: { id: string }
}

export default async function EditPage({ params: { id } }: PageProps) {
  const enrollmentId = Number(id)
  const enrollment = await prisma.inscriere.findFirst({
    select: {
      angajat: {
        select: {
          nume: true,
          prenume: true,
          id_angajat: true,
        },
      },
      curs: {
        select: {
          nume: true,
          id_curs: true,
        },
      },

      stadiu: true,
    },
    where: {
      id_inscriere: enrollmentId,
    },
  })

  if (!enrollment) notFound()

  return (
    <EditEnrollmentForm enrollment={enrollment} enrollmentId={enrollmentId} />
  )
}
