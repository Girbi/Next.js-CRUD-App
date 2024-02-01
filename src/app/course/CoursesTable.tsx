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
import AddCourseModal from './AddCourseModal'
import EditButton from '../../components/ui/EditButton'

export default async function CoursesTable() {
  const courses = await prisma.curs.findMany({
    orderBy: { id_curs: 'desc' },
  })
  return (
    <div className="mx-10 rounded-lg border bg-black font-semibold">
      <div className="flex w-full items-center justify-between p-5">
        <h2>Cursuri</h2>
        <AddCourseModal />
      </div>
      <div className="h-0.5 border-t-0 bg-gray-800"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id_curs</TableHead>
            <TableHead>Nume</TableHead>
            <TableHead>Durata (zile)</TableHead>
            <TableHead>Pret (€)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map(course => (
            <TableRow key={course.id_curs} className="relative">
              {Object.values(course).map(value => (
                <TableCell key={value}>{value}</TableCell>
              ))}
              <TableCell>
                <EditButton href={`/course/${course.id_curs}`} />
                <DeleteButton id={course.id_curs} fetchUrl="course" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
