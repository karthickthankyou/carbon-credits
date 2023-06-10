import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Button } from '../../atoms/Button'
import { RangeSlider } from '../../molecules/RangeSlider'
import { FilterHeading } from '../../molecules/FilterHeading'
import {
  FormTypeSearchProject,
  formDefaultValuesSearchProjects,
} from '@carbon-credits/forms/src/searchProjects'
import { Dialog } from '../../atoms/Dialog'
import { IconFilter } from '@tabler/icons-react'
import { PulsingDot } from '../../atoms/Dot'
import { Sidebar } from '../Sidebar'
import { Logo } from '../../atoms/Logo'

export interface IFilterSidebarProps {}

export const FilterSidebar = () => {
  const [open, setOpen] = useState(false)

  const {
    control,
    reset,
    getValues,
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchProject>()
  return (
    <>
      <Button
        variant="text"
        onClick={() => setOpen(true)}
        className=" hover:bg-gray-200"
      >
        <IconFilter className="stroke-1.5 " />
        {Object.keys(dirtyFields).length ? <PulsingDot /> : null}
      </Button>
      <Sidebar open={open} setOpen={setOpen}>
        <Sidebar.Header>
          <Logo />
        </Sidebar.Header>{' '}
        <Sidebar.Body className="flex flex-col items-start gap-3">
          <Controller
            name="price"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Price" />
                  <RangeSlider
                    min={defaultValues?.price?.[0]}
                    max={defaultValues?.price?.[1]}
                    // max={200}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `Rs.${sliderValue.toLocaleString()}`
                    }
                    step={5}
                  />
                </div>
              )
            }}
          />
          <Controller
            name="balance"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Width" />
                  <RangeSlider
                    min={defaultValues?.balance?.[0]}
                    max={defaultValues?.balance?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `${sliderValue.toLocaleString()} ft`
                    }
                    step={2}
                  />
                </div>
              )
            }}
          />
        </Sidebar.Body>
        <Sidebar.Footer>
          <Button
            onClick={() =>
              reset({ ...getValues(), ...formDefaultValuesSearchProjects })
            }
          >
            Reset
          </Button>
        </Sidebar.Footer>
      </Sidebar>
    </>
  )
}
