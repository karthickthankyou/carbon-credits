import { Map } from '../../organisms/Map'
import { SetStateAction, useEffect, useState } from 'react'
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
import { FormProviderBuyCredits } from '@carbon-credits/forms/src/buyCredits'
import { Popup } from '../../organisms/Map/Popup'
import { ShowData } from '../../organisms/ShowData'

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
          className="flex flex-col gap-2"
        >
          {data?.inventories.map((inventory) => (
            <div key={inventory.id}>
              <div>{inventory.price}</div>
              <div>{inventory.balance}</div>
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
  const [garages, setGarages] = useState<SearchProjectsQuery['searchProjects']>(
    [],
  )

  const { current: map } = useMap()
  const [searchGarages, { loading, data }] = useSearchProjectsLazyQuery()

  const { variables } = useConvertSearchFormToVariables()

  useEffect(() => {
    if (variables) {
      console.log('zoom level ', map?.getZoom())
      searchGarages({ variables })
    }
  }, [variables])
  useEffect(() => {
    if (data?.searchProjects) {
      setGarages(data.searchProjects || [])
    }
  }, [data?.searchProjects])

  if (data?.searchProjects.length === 0) {
    return (
      <Panel position="center-center" className="bg-white/50">
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>No projects found in this area.</div>
        </div>
      </Panel>
    )
  }

  return (
    <>
      {loading ? (
        <Panel position="center-bottom">
          <IconRefresh className="animate-spin-reverse" />
        </Panel>
      ) : null}
      {garages.map((garage) => (
        <MarkerWithPopup key={garage.id} marker={garage} />
      ))}
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
      isOptionEqualToValue={(option, value) =>
        option.placeName === value.placeName
      }
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
