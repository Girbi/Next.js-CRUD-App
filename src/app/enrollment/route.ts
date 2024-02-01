import { type SelectOption } from '@/components/ui/SelectInput'
import {
  enrollmentSchema,
  type EnrollmentSchemaType,
} from '@/schemas/enrollment'
import { prisma } from '@/server/db'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body: EnrollmentSchemaType = await req.json()
    const { angajat, curs, stadiu, dataInscriere } =
      enrollmentSchema.parse(body)

    await prisma.inscriere.create({
      data: {
        id_angajat: angajat.id_angajat,
        id_curs: curs.id_curs,
        stadiu: stadiu.toUpperCase(),
        data_inscriere: dataInscriere ?? new Date(),
      },
    })

    return NextResponse.json({ message: 'Inscriere adaugata' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'A aparut o eroare',
        error,
      },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body: { id: number } = await req.json()
    const enrollmentId = body.id

    await prisma.inscriere.delete({
      where: {
        id_inscriere: enrollmentId,
      },
    })

    return NextResponse.json({ message: 'Inscriere stearsa' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'A aparut o eroare',
        error,
      },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body: { enrollment: EnrollmentSchemaType; enrollmentId: number } =
      await req.json()
    const { angajat, curs, stadiu, dataInscriere } = enrollmentSchema.parse(
      body.enrollment
    )

    await prisma.inscriere.update({
      where: {
        id_inscriere: body.enrollmentId,
      },
      data: {
        id_angajat: angajat.id_angajat,
        id_curs: curs.id_curs,
        stadiu: stadiu.toUpperCase(),
        data_inscriere: dataInscriere ?? new Date(),
      },
    })

    return NextResponse.json(
      { message: 'Inscriere actualizata' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'A aparut o eroare',
        error,
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const employees = await prisma.angajat.findMany({
      select: {
        nume: true,
        prenume: true,
        id_angajat: true,
      },
    })

    const employeeOptions: SelectOption[] = employees.map(emp => ({
      value: {
        nume: emp.nume,
        prenume: emp.prenume,
        id_angajat: emp.id_angajat,
      },
      label: emp.nume + ' ' + emp.prenume,
    }))

    const courses = await prisma.curs.findMany({
      select: {
        nume: true,
        id_curs: true,
      },
    })

    const coursesOptions: SelectOption[] = courses.map(course => ({
      value: {
        nume: course.nume,
        id_curs: course.id_curs,
      },
      label: course.nume,
    }))

    const options = {
      employeeOptions,
      coursesOptions,
    }

    return NextResponse.json({ payload: options }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'A aparut o eroare',
        error,
      },
      { status: 500 }
    )
  }
}
