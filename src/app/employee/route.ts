import { employeeSchema, type EmployeeSchemaType } from '@/schemas/employee'
import { prisma } from '@/server/db'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body: EmployeeSchemaType = await req.json()
    const employee = employeeSchema.parse(body)

    await prisma.angajat.create({
      data: employee,
    })

    return Response.json({ message: 'Angajat adaugat' }, { status: 201 })
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
    const body: { employee: EmployeeSchemaType; employeeId: number } =
      await req.json()
    const employee = employeeSchema.parse(body.employee)

    await prisma.angajat.update({
      where: {
        id_angajat: body.employeeId,
      },
      data: employee,
    })

    return NextResponse.json({ message: 'Angajat actualizat' }, { status: 201 })
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
    const employeeId = body.id

    await prisma.angajat.delete({
      where: {
        id_angajat: employeeId,
      },
    })

    return NextResponse.json({ message: 'Angajat Sters' }, { status: 200 })
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
