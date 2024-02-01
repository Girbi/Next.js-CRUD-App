import { z } from 'zod'

export const employeeSchema = z.object({
  nume: z.string().min(1, 'Nume obligatoriu').trim(),
  prenume: z.string().min(1, 'Prenume obligatoriu').trim(),
  email: z.string().min(1, 'Email obligatoriu').email('Email Invalid').trim(),
  departament: z.string().min(1, 'Departament obligatoriu').trim(),
})

export type EmployeeSchemaType = z.infer<typeof employeeSchema>
