import { prisma } from '@/server/db'
import { notFound } from 'next/navigation'
import EditCourseForm from './EditCourseForm'

type PageProps = {
  params: { id: string }
}

export default async function EditPage({ params: { id } }: PageProps) {
  const courseId = Number(id)
  const course = await prisma.curs.findFirst({
    select: {
      nume: true,
      durata: true,
      pret: true,
    },
    where: {
      id_curs: courseId,
    },
  })

  if (!course) notFound()

  return <EditCourseForm course={course} courseId={courseId} />
}
