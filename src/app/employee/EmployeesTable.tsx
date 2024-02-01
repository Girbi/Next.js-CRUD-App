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
import EditButton from '../../components/ui/EditButton'
import AddEmployeeModal from './AddEmployeeModal'

export default async function EmployeesTable() {
  const employees = await prisma.angajat.findMany({
    orderBy: { id_angajat: 'desc' },
  })
  return (
    <div className="mx-10 rounded-lg border bg-black font-semibold">
      <div className="flex w-full items-center justify-between p-5">
        <h2>Angajati</h2>
        <AddEmployeeModal />
      </div>
      <div className="h-0.5 border-t-0 bg-gray-800"></div>
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(employees[0]!).map(column => (
              <TableHead key={column}>
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map(employee => (
            <TableRow key={employee.id_angajat} className="relative">
              {Object.values(employee).map(value => (
                <TableCell key={value}>{value}</TableCell>
              ))}
              <TableCell>
                <EditButton href={`/employee/${employee.id_angajat}`} />
                <DeleteButton id={employee.id_angajat} fetchUrl="employee" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
