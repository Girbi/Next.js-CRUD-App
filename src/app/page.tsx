import CoursesTable from '@/app/course/CoursesTable'
import EmployeesTable from '@/app/employee/EmployeesTable'
import EnrollmentTable from '@/app/enrollment/EnrollmentTable'

export default async function HomePage() {
  return (
    <div className="mb-10 grid gap-10">
      <EmployeesTable />
      <CoursesTable />
      <EnrollmentTable />
    </div>
  )
}
