'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { Button } from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { employeeSchema, type EmployeeSchemaType } from '@/schemas/employee'

type EmployeeFormProps = {
  type: 'Adauga' | 'Editeaza'
  onSubmit: SubmitHandler<EmployeeSchemaType>
  defaultValues?: EmployeeSchemaType
}

export default function EmployeeForm({
  type,
  onSubmit,
  defaultValues,
}: EmployeeFormProps) {
  const methods = useForm<EmployeeSchemaType>({
    resolver: zodResolver(employeeSchema),
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

        <Input name="prenume" label="Prenume" placeholder="Alexandru" />

        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="alex@alex.com"
        />

        <Input
          name="departament"
          type="text"
          label="Departament"
          placeholder="IT"
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={type === 'Editeaza' && !isDirty}>
          {type} Angajat
        </Button>
      </form>
    </FormProvider>
  )
}
