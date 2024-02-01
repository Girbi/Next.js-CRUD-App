import { type CourseSchemaType, courseSchema } from '@/schemas/course'
import { prisma } from '@/server/db'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body: CourseSchemaType = await req.json()
    const course = courseSchema.parse(body)

    await prisma.curs.create({
      data: course,
    })

    return NextResponse.json({ message: 'Curs adaugat' }, { status: 201 })
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
    const body: { course: CourseSchemaType; courseId: number } =
      await req.json()
    const course = courseSchema.parse(body.course)

    await prisma.curs.update({
      where: {
        id_curs: body.courseId,
      },
      data: course,
    })

    return NextResponse.json({ message: 'Curs actualizat' }, { status: 201 })
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
    const courseId = body.id

    await prisma.curs.delete({
      where: {
        id_curs: courseId,
      },
    })

    return NextResponse.json({ message: 'Curs sters' }, { status: 200 })
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
