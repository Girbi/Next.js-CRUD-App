import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { prisma } from '@/server/db'
import DeleteButton from '../../components/ui/DeleteButton'
import AddEnrollmentModal from './AddEnrollmentModal'
import EditButton from '../../components/ui/EditButton'

export default async function EnrollmentTable() {
  const enrollments = await prisma.inscriere.findMany({
    orderBy: { id_inscriere: 'desc' },
    include: {
      angajat: {
        select: {
          nume: true,
          prenume: true,
        },
      },
      curs: {
        select: {
          nume: true,
        },
      },
    },
  })

  return (
    <div className="mx-10 rounded-lg border bg-black font-semibold">
      <div className="flex w-full items-center justify-between p-5">
        <h2>Inscrieri</h2>
        <AddEnrollmentModal />
      </div>
      <div className="h-0.5 border-t-0 bg-gray-800"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id_inscriere</TableHead>
            <TableHead>Data_inscriere</TableHead>
            <TableHead>Angajat</TableHead>
            <TableHead>Curs</TableHead>
            <TableHead>Stadiu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.map(enrollment => {
            const angajat = `${enrollment.angajat.nume} ${enrollment.angajat.prenume}`
            return (
              <TableRow key={enrollment.id_inscriere} className="relative">
                <TableCell>{enrollment.id_inscriere}</TableCell>
                <TableCell>
                  {enrollment.data_inscriere.toLocaleDateString('en-UK')}
                </TableCell>
                <TableCell>{angajat}</TableCell>
                <TableCell>{enrollment.curs.nume}</TableCell>
                <TableCell>{enrollment.stadiu}</TableCell>

                <TableCell>
                  <EditButton href={`/enrollment/${enrollment.id_inscriere}`} />
                  <DeleteButton
                    id={enrollment.id_inscriere}
                    fetchUrl="enrollment"
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
