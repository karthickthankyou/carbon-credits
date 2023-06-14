import { Form } from '../../atoms/Form'
import { Controller } from 'react-hook-form'

import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import {
  FormProviderCreateProject,
  FormTypeCreateProject,
} from '@carbon-credits/forms/src/createProject'
import { useFormContext, useWatch } from 'react-hook-form'
import { Marker } from '../../organisms/Map/MapMarker'

import { createProject } from '@carbon-credits/contract-utilities'
import { useAccount } from '@carbon-credits/hooks/web3'
import { Dialog } from '../../atoms/Dialog'
import { useEffect, useState } from 'react'
import { PlainButton } from '../../atoms/PlainButton'
import { IconPlant, IconPlus } from '@tabler/icons-react'
import { Button } from '../../atoms/Button'
import { useAsync } from '@carbon-credits/hooks/async'
import { Map } from '../../organisms/Map'
import { Panel } from '../../organisms/Map/Panel'
import { useMap } from 'react-map-gl'
import { SearchPlaceBox } from '../../organisms/SearchPlaceBox'
import {
  CenterOfMap,
  DefaultZoomControls,
} from '../../organisms/Map/ZoomControls/ZoomControls'
import { PlantIcon } from '../../atoms/PlantIcon'
import { uploadImagesIPFS } from '@carbon-credits/util'
import { HtmlTextArea } from '../../atoms/HtmlTextArea'

export interface ICreateProjectProps {}

export const CreateProject = () => {
  return (
    <FormProviderCreateProject>
      <CreateProjectContent />
    </FormProviderCreateProject>
  )
}

export const initialViewState = {
  longitude: 80.2,
  latitude: 12.9,
  zoom: 8,
}

export const CreateProjectContent = ({}: ICreateProjectProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useFormContext<FormTypeCreateProject>()
  console.log('errors ', errors)
  const { contract, account } = useAccount()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setValue('location.latitude', initialViewState.latitude)
    setValue('location.longitude', initialViewState.longitude)
  }, [setValue])
  const [{ data, loading, error }, createProjectFunction] =
    useAsync(createProject)

  const [{ loading: uploading, data: ipfsImages }, uploadImagesIPFSAsync] =
    useAsync(uploadImagesIPFS)

  // Reset on success.
  useEffect(() => {
    if (data) {
      reset()
    }
  }, [data])

  if (!account) {
    return null
  }

  return (
    <>
      <PlainButton
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 px-4 text-sm transition-shadow rounded-full hover:shadow-lg hover:border"
      >
        <IconPlus />
        Create project
      </PlainButton>

      <Dialog
        widthClassName="max-w-4xl"
        open={open}
        setOpen={setOpen}
        title={'Create project'}
      >
        <div className="flex gap-2">
          <Form
            onSubmit={handleSubmit(
              async ({
                name,
                images,
                about,
                location: { latitude, longitude },
              }) => {
                if (!contract) {
                  console.error('Contract not found')
                  return
                }
                const bigIntLat = Math.round(latitude * 10000)
                const bigIntLng = Math.round(longitude * 10000)

                await uploadImagesIPFSAsync(images)

                createProjectFunction({
                  account,
                  contract,
                  payload: {
                    name,
                    about,
                    images: ipfsImages,
                    lat: bigIntLat,
                    lng: bigIntLng,
                  },
                })
              },
            )}
          >
            <HtmlLabel error={errors.name?.message} title="name">
              <HtmlInput placeholder="Project name" {...register('name')} />
            </HtmlLabel>
            <HtmlLabel error={errors.name?.message} title="about">
              <HtmlTextArea
                placeholder="About"
                {...register('about')}
                rows={3}
              />
            </HtmlLabel>
            <Controller
              control={control}
              name="images"
              render={({ field }) => (
                <HtmlLabel
                  title="Images"
                  error={errors.images?.message?.toString()}
                >
                  <HtmlInput
                    type="file"
                    onChange={(e) => field.onChange(e?.target?.files)}
                  />
                </HtmlLabel>
              )}
            />
            <Button
              disabled={Boolean(data)}
              loading={loading || uploading}
              color="black"
              type="submit"
            >
              Create
            </Button>
            {data ? <div>Project creation success.🎉🎉🎉</div> : null}
          </Form>
          <Map height="36rem" initialViewState={initialViewState}>
            <MapMarker />
            <Panel position="left-top">
              <SearchBox
                onChange={({ lat, lng }) => {
                  setValue('location.latitude', lat, { shouldValidate: true })
                  setValue('location.longitude', lng, { shouldValidate: true })
                }}
              />
            </Panel>
            <Panel position="right-center">
              <DefaultZoomControls>
                <CenterOfMap
                  Icon={() => (
                    <IconPlant className="w-8 h-8 p-1.5 text-black" />
                  )}
                  onClick={(latLng) => {
                    const lat = parseFloat(latLng.lat.toFixed(6))
                    const lng = parseFloat(latLng.lng.toFixed(6))
                    console.log('latLng', lat, lng)
                    setValue('location.latitude', lat, { shouldValidate: true })
                    setValue('location.longitude', lng, {
                      shouldValidate: true,
                    })
                  }}
                />
              </DefaultZoomControls>
            </Panel>
          </Map>
        </div>
      </Dialog>
    </>
  )
}

export const SearchBox = ({
  onChange,
}: {
  onChange: ({ lat, lng }: { lat: number; lng: number }) => void
}) => {
  const { current: map } = useMap()
  return (
    <SearchPlaceBox
      setLocationInfo={(locationInfo) => {
        const lat = locationInfo.latLng[0]
        const lng = locationInfo.latLng[1]
        onChange({ lat, lng })

        map?.flyTo({
          center: { lat, lng },
          essential: true,
        })
      }}
    />
  )
}

export const MapMarker = () => {
  const { location } = useWatch<FormTypeCreateProject>()
  const { setValue } = useFormContext<FormTypeCreateProject>()

  return (
    <Marker
      anchor="bottom"
      pitchAlignment="auto"
      longitude={location?.longitude || initialViewState.longitude}
      latitude={location?.latitude || initialViewState.latitude}
      draggable
      onDragEnd={({ lngLat }) => {
        const { lat, lng } = lngLat
        setValue('location.latitude', lat || 0)
        setValue('location.longitude', lng || 0)
      }}
    >
      <PlantIcon />
    </Marker>
  )
}
