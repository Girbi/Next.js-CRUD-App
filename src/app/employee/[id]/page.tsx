import { prisma } from '@/server/db'
import { notFound } from 'next/navigation'
import EditEmployeeForm from './EditEmployeeForm'

type PageProps = {
  params: { id: string }
}

export default async function EditPage({ params: { id } }: PageProps) {
  const employeeId = Number(id)
  const employee = await prisma.angajat.findFirst({
    select: {
      nume: true,
      prenume: true,
      departament: true,
      email: true,
    },
    where: {
      id_angajat: employeeId,
    },
  })

  if (!employee) notFound()

  return <EditEmployeeForm employee={employee} employeeId={employeeId} />
}
