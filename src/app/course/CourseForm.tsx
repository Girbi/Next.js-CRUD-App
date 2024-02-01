'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { Button } from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { type CourseSchemaType, courseSchema } from '@/schemas/course'

type EmployeeFormProps = {
  type: 'Adauga' | 'Editeaza'
  onSubmit: SubmitHandler<CourseSchemaType>
  defaultValues?: CourseSchemaType
}

export default function CourseForm({
  type,
  onSubmit,
  defaultValues,
}: EmployeeFormProps) {
  const methods = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues,
  })
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input name="nume" label="Nume" placeholder="Girbescu" />

        <Input
          name="durata"
          label="Durata"
          inputMode="numeric"
          placeholder="30 (zile)"
          registerOptions={{ valueAsNumber: true }}
        />

        <Input
          name="pret"
          label="Pret"
          inputMode="numeric"
          placeholder="50€"
          registerOptions={{ valueAsNumber: true }}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={type === 'Editeaza' && !isDirty}>
          {type} Curs
        </Button>
      </form>
    </FormProvider>
  )
}
