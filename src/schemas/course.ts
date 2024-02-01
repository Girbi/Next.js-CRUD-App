import { z } from 'zod'

export const courseSchema = z.object({
  nume: z.string().min(1, 'Nume obligatoriu').trim(),
  durata: z.number().finite().safe().positive('Durata trebuie sa fie pozitiva'),
  pret: z.number().finite().safe().positive('Pret trebuie sa fie pozitiv'),
})

export type CourseSchemaType = z.infer<typeof courseSchema>
