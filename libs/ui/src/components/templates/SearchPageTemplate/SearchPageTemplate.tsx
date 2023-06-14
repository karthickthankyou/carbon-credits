import { Map } from '../../organisms/Map'
import { SetStateAction, useEffect, useState } from 'react'
import { produce } from 'immer'
import { LocationInfo, useSearchLocation } from '@carbon-credits/hooks/location'
import { Button } from '../../atoms/Button'
import {
  IconCurrentLocation,
  IconExclamationCircle,
  IconInfoCircle,
  IconRefresh,
} from '@tabler/icons-react'
import { useFormContext } from 'react-hook-form'

import {
  FormProviderSearchProject,
  FormTypeSearchProject,
} from '@carbon-credits/forms/src/searchProjects'
import { useConvertSearchFormToVariables } from '@carbon-credits/forms/src/adapters/searchFormAdapter'
import { FilterSidebar } from '../../organisms/FilterSidebar'
import { Panel } from '../../organisms/Map/Panel'
import { DefaultZoomControls } from '../../organisms/Map/ZoomControls/ZoomControls'
import {
  InventoriesQuery,
  SearchProjectsQuery,
  useInventoriesQuery,
  useSearchProjectsLazyQuery,
} from '@carbon-credits/network/src/generated'
import { Marker } from '../../organisms/Map/MapMarker'
import { ViewStateChangeEvent, useMap } from 'react-map-gl'
import { useKeypress } from '@carbon-credits/util'
import { PlantIcon } from '../../atoms/PlantIcon'
import { Autocomplete } from '../../atoms/Autocomplete'
import { majorCitiesLocationInfo } from '../../organisms/SearchPlaceBox/SearchPlaceBox'
import { Dialog } from '../../atoms/Dialog'

import { BuyCreditsPopup } from '../../organisms/Map/BuyCreditsPopup'
import {
  FormProviderBuyCredits,
  userFormBuyCredits,
} from '@carbon-credits/forms/src/buyCredits'
import { Popup } from '../../organisms/Map/Popup'
import { ShowData } from '../../organisms/ShowData'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { PlainButton } from '../../atoms/PlainButton'
import { Form } from '../../atoms/Form'
import { useAccount } from '@carbon-credits/hooks/web3'
import { useAsync } from '@carbon-credits/hooks/async'
import { buyCredits } from '@carbon-credits/contract-utilities'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Switch } from '../../atoms/Switch'

export interface ISearchPageTemplateProps {
  initialProps: {
    type: string[]
    endTime: string
    startTime: string
    placeName: string
    lat: number
    lng: number
  }
}

export const CurrentLocationButton = () => {
  const { current: map } = useMap()

  return (
    <Button
      variant="text"
      className="hover:bg-gray-200"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            map?.flyTo({ center: { lat: latitude, lng: longitude }, zoom: 10 })
          },
          (error) => {
            console.error(error)
          },
          { enableHighAccuracy: true, timeout: 20000 },
          //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        )
      }}
    >
      <IconCurrentLocation className="stroke-1.5" />
    </Button>
  )
}

export const SearchPageTemplate = () => {
  return (
    <FormProviderSearchProject>
      <SearchPageTemplateContent />
    </FormProviderSearchProject>
  )
}

export const SearchPageTemplateContent = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormTypeSearchProject>()

  function handleMapChange(event: ViewStateChangeEvent) {
    const bounds = event.target.getBounds()

    const locationFilter = {
      nw_lat: bounds?.getNorthWest().lat || 0,
      nw_lng: bounds?.getNorthWest().lng || 0,
      se_lat: bounds?.getSouthEast().lat || 0,
      se_lng: bounds?.getSouthEast().lng || 0,
    }

    setValue('locationFilter', locationFilter)
  }

  return (
    <Map pitch={30} onZoomEnd={handleMapChange} onDragEnd={handleMapChange}>
      {/* Query and display garages */}
      <ShowMarkers />
      <Panel position="left-top" className="bg-white/50">
        <div className="flex flex-col items-stretch gap-2 py-2">
          {/* Self managing search box. Moves map to the selected location. */}
          <SearchBox />
        </div>
      </Panel>
      <Panel position="right-top">
        <div className="flex">
          <CurrentLocationButton />
          <FilterSidebar />
        </div>
      </Panel>
      <Panel position="right-center">
        <DefaultZoomControls />
      </Panel>
      {Object.entries(errors).length ? (
        <Panel position="center-bottom">
          {Object.entries(errors).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center gap-1 p-2 border border-red"
            >
              <IconExclamationCircle />
              <div className="font-medium">
                {key}: {value.message}
              </div>
            </div>
          ))}
        </Panel>
      ) : null}
    </Map>
  )
}

export const MarkerWithPopup = ({
  marker,
}: {
  marker: SearchProjectsQuery['searchProjects'][number]
}) => {
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(12)
  const [showPopup, setShowPopup] = useState(false)
  useKeypress(['Escape'], () => setShowPopup(false))

  const { data, loading } = useInventoriesQuery({
    variables: { where: { projectId: { equals: marker.id } } },
  })

  if (!marker.lat || !marker.lng) {
    return null
  }

  return (
    <>
      {/* <Dialog
        title="Buy credits"
        widthClassName="max-w-3xl"
        open={showPopup}
        setOpen={setShowPopup}
      >
        <FormProviderBuyCredits>
          <BuyCreditsPopup project={marker} />
        </FormProviderBuyCredits>
      </Dialog> */}

      <Popup
        latitude={marker.lat || 0}
        longitude={marker.lng || 0}
        show={showPopup}
        setShow={setShowPopup}
        className="w-full max-w-xl"
      >
        <ShowData
          loading={loading}
          pagination={{
            skip,
            take,
            resultCount: data?.inventories.length,
            totalCount: data?.inventoriesCount.count,
            setSkip,
            setTake,
          }}
          className="flex flex-col gap-2 p-2"
        >
          {data?.inventories.map((inventory) => (
            <div key={inventory.id} className="z-10">
              <div>{inventory.price}</div>
              <div>{inventory.balance}</div>
              <AddCreditsDialog inventory={inventory} />
            </div>
          ))}
        </ShowData>
      </Popup>
      <Marker
        latitude={marker.lat || 0}
        longitude={marker.lng || 0}
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          setShowPopup((state) => !state)
        }}
      >
        <PlantIcon />
      </Marker>
    </>
  )
}

export const ZOOM_LIMIT = 10

export const ShowMarkers = () => {
  const { current: map } = useMap()
  const [searchGarages, { loading, data, previousData }] =
    useSearchProjectsLazyQuery()

  const { variables } = useConvertSearchFormToVariables()

  useEffect(() => {
    if (variables) {
      const variabledWithVerifiers = produce(variables, (variablesDraft) => {
        if (variablesDraft.where) {
          variablesDraft.where.verifiers = { some: {} }
        } else {
          variablesDraft.where = { verifiers: { some: {} } }
        }
      })
      console.log('variabledWithVerifiers ', variabledWithVerifiers)
      searchGarages({
        variables: variabledWithVerifiers,
        fetchPolicy: 'cache-first',
      })
    }
  }, [variables])

  console.log(data, loading)

  return (
    <>
      {loading ? (
        <Panel position="center-bottom">
          <IconRefresh className="animate-spin-reverse" />
        </Panel>
      ) : null}
      {data?.searchProjects.length === 0 && !loading ? (
        <Panel position="center-center" className="bg-white/50">
          <div className="flex items-center justify-center gap-2 ">
            <IconInfoCircle /> <div>No projects found in this area.</div>
          </div>
        </Panel>
      ) : (
        (data || previousData)?.searchProjects.map((project) => (
          <MarkerWithPopup key={project.id} marker={project} />
        ))
      )}
    </>
  )
}

export const SearchBox = () => {
  const { current: map } = useMap()
  const { loading, setLoading, searchText, setSearchText, locationInfo } =
    useSearchLocation()

  return (
    <Autocomplete<LocationInfo, false, false, false>
      options={locationInfo.length ? locationInfo : majorCitiesLocationInfo}
      isOptionEqualToValue={(option, value) => {
        console.log('option, value ', option, value)
        return option.placeName === value.placeName
      }}
      noOptionsText={searchText ? 'No options.' : 'Type something...'}
      getOptionLabel={(x) => x.placeName}
      onInputChange={(_, v) => {
        setLoading(true)
        setSearchText(v)
      }}
      loading={loading}
      onChange={(_, v) => {
        if (v) {
          const { latLng, placeName } = v
          map?.flyTo({ center: { lat: latLng[0], lng: latLng[1] }, zoom: 10 })
        }
      }}
    />
  )
}

export const AddCreditsDialog = ({
  inventory,
}: {
  inventory: InventoriesQuery['inventories'][number]
}) => {
  const [open, setOpen] = useState(false)
  const { account, contract, isOwner } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormBuyCredits()
  const [{ data, loading, error }, buyCreditsFunction] = useAsync(buyCredits)
  return (
    <>
      <PlainButton
        className="text-sm underline underline-offset-4"
        onClick={() => {
          console.log('setOpen')
          setOpen(true)
        }}
      >
        Buy credits
      </PlainButton>
      <Dialog open={open} setOpen={setOpen} title={'Buy credits'}>
        <div>{inventory.price}</div>
        <div>{inventory.balance}</div>
        <div>{inventory?.project?.name}</div>
        <Form
          onSubmit={handleSubmit(async ({ quantity, forSale }) => {
            if (!contract) {
              return
            }

            await buyCreditsFunction({
              account,
              contract,
              payload: {
                projectId: inventory.projectId,
                quantity,
                price: inventory.price,
                forSale,
              },
            })
          })}
        >
          <HtmlLabel error={errors.quantity?.message} title="Quantity">
            <HtmlInput
              placeholder="Quantity"
              {...register('quantity', { valueAsNumber: true })}
            />
          </HtmlLabel>
          <HtmlLabel title="For sale" error={errors.forSale?.message}>
            <Switch {...register('forSale')} />
          </HtmlLabel>

          <Button loading={loading} type="submit">
            Add credits
          </Button>
        </Form>
        {data ? <div>🎉 🎉 🎉Credits added successfully. 🎉 🎉 🎉</div> : null}
        {error ? (
          <div className="mt-1 text-sm text-red-800">
            Error for developers: {error}
          </div>
        ) : null}
      </Dialog>
    </>
  )
}
