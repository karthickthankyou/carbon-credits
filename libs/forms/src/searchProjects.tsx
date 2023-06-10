import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'

const minMaxTuple = z.tuple([z.number(), z.number()])

export const formSchemaSearchProject = z.object({
  locationFilter: z
    .object({
      nw_lat: z.number().optional(),
      nw_lng: z.number().optional(),
      se_lat: z.number().optional(),
      se_lng: z.number().optional(),
    })
    .optional(),

  price: minMaxTuple.optional(),
  balance: minMaxTuple.optional(),

  skip: z.number().optional(),
  take: z.number().optional(),
})

export type FormTypeSearchProject = z.infer<typeof formSchemaSearchProject>

export const formDefaultValuesSearchProjects = {
  price: [0, 20000] as [number, number],
  balance: [0, 1000000] as [number, number],
}

export const FormProviderSearchProject = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useForm<FormTypeSearchProject>({
    resolver: zodResolver(formSchemaSearchProject),
    defaultValues: formDefaultValuesSearchProjects,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
