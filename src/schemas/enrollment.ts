import { z } from 'zod'

export const enrollmentSchema = z.object({
  angajat: z.object(
    {
      nume: z.string(),
      prenume: z.string(),
      id_angajat: z.number().positive(),
    },
    {
      required_error: 'Un angajat trebuie selectat',
    }
  ),
  curs: z.object(
    {
      nume: z.string(),
      id_curs: z.number().positive(),
    },
    {
      required_error: 'Un curs trebuie selectat',
    }
  ),
  stadiu: z.string({ required_error: 'Un stadiu trebuie selectat' }),
  dataInscriere: z.date().optional(),
})

export type EnrollmentSchemaType = z.infer<typeof enrollmentSchema>
