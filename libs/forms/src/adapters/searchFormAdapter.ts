import {
  FieldNamesMarkedBoolean,
  UseFormSetError,
  UseFormClearErrors,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { useState, useEffect } from 'react'
import { FormTypeSearchProject } from '../searchProjects'
import { SearchProjectsQueryVariables } from '@carbon-credits/network/src/generated'

import { useDebouncedValue } from '@carbon-credits/hooks/async'

export const useConvertSearchFormToVariables = () => {
  const [variables, setVariables] =
    useState<SearchProjectsQueryVariables | null>(null)

  const {
    setError,
    clearErrors,
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchProject>()
  const formData = useWatch<FormTypeSearchProject>()

  const debouncedForm = useDebouncedValue(formData, 400)

  useEffect(() => {
    // Location filter
    const locationFilter = createLocationFilter({
      locationFilterData: formData.locationFilter,
      setError,
      clearErrors,
    })

    if (!locationFilter) {
      return
    }
    const garagesFilter = createGaragesFilter(dirtyFields, formData)

    const filter = {
      locationFilter,
      ...(Object.keys(garagesFilter).length && { garagesFilter }),
    }

    setVariables(filter)
  }, [debouncedForm])

  // Convert form data to query variables
  return { variables }
}

export const createLocationFilter = ({
  locationFilterData,
  setError,
  clearErrors,
}: {
  locationFilterData: FormTypeSearchProject['locationFilter']
  setError: UseFormSetError<FormTypeSearchProject>
  clearErrors: UseFormClearErrors<FormTypeSearchProject>
}) => {
  const { nw_lat, nw_lng, se_lat, se_lng } = locationFilterData || {}

  if (!nw_lat || !nw_lng || !se_lat || !se_lng) {
    setError('locationFilter', { message: 'Location is required.' })
    return null
  } else {
    clearErrors('locationFilter')
  }

  return { nw_lat, nw_lng, se_lat, se_lng }
}

export const createGaragesFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchProject>,
  formData: FormTypeSearchProject,
) => {
  const skip = (dirtyFields.skip && formData.skip) || 0
  const take = (dirtyFields.take && formData.take) || 10

  return {
    ...(skip && { skip }),
    ...(take && { take }),
  }
}

export const intFilter = (data?: [number, number]) => {
  if (!data) return {}
  const filterObj: { gte?: number; lte?: number } = {}
  if (data[0] !== 0) filterObj['gte'] = data[0]
  if (data[1] !== 0) filterObj['lte'] = data[1]
  return filterObj
}
