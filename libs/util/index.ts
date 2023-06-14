import { useEffect, useState, useCallback } from 'react'

import axios from 'axios'
import { format } from 'date-fns'
import { MenuItem, ROLES } from '@carbon-credits/types'

export type LatLng = {
  lat: number
  lng: number
}

export const getYesterday = () => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday
}

export const useKeypress = (keys: string[], action: () => void) => {
  useEffect(() => {
    const onKeyup = (e: { key: any }) => {
      if (keys.includes(e.key)) action()
    }
    window.addEventListener('keyup', onKeyup)
    return () => window.removeEventListener('keyup', onKeyup)
  }, [action, keys])
}

export const makeId = (length: number = 4) => {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const getMsFromString = (timeString: string) => {
  const time = new Date('1970-01-01T' + timeString)
  return time.getTime()
}

export const getTimeFromDateTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return format(date, 'p')
}

export const getHHMMSS = (timestamp: string) => {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}:00`
}

export const getDistanceFromLatLonInKm = ({
  from,
  to,
}: {
  from: { lat: number; lng: number }
  to: { lat: number; lng: number }
}) => {
  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(to.lat - from.lat) // deg2rad below
  var dLon = deg2rad(to.lng - from.lng)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(from.lat)) *
      Math.cos(deg2rad(to.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c // Distance in km
  return d
}

export const getDistance = async (origin: LatLng, destination: LatLng) => {
  if (!origin || !destination) {
    return
  }
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

  try {
    const response = await axios.get(url)
    const data = response.data
    console.log('Data ', data)
    const distance = data.routes[0].distance // distance in meters

    return distance / 1000 // convert to kilometers
  } catch (error) {
    console.error(error)
  }
}

export const filterMenuItems = ({
  roles,
  menuItems,
}: {
  roles: ROLES
  menuItems: MenuItem[]
}) => {
  return menuItems
    .filter(({ loggedIn }) => (loggedIn ? roles.loggedIn : true))
    .filter(({ admin }) => (admin ? roles.admin : true))
    .filter(({ verifier }) => (verifier ? roles.verifier : true))
}

export const MENUITEMS: MenuItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Inventory', href: '/inventory', loggedIn: true },
  { label: 'Admin', href: '/admin', loggedIn: true, admin: true },
  {
    label: 'Verifier',
    href: '/verifier',
    loggedIn: true,
    verifier: true,
  },
]
export const SUBMENUITEMS: MenuItem[] = [
  ...MENUITEMS,
  { label: 'My projects', href: '/my-projects', loggedIn: true },
  { label: 'Reports', href: '/reports', loggedIn: true },
  { label: 'Settings', href: '/settings', loggedIn: false },
]

export const uploadImagesIPFS = async (files: any) => {
  const ipfsDataArray = []

  for (let i = 0; i < files.length; i++) {
    const formData = new FormData()
    formData.append('file', files[i])

    const response = await fetch('https://api.tatum.io/v3/ipfs', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_TATUM_KEY || '',
      },
      body: formData,
    })

    const ipfsData = await response.text()

    ipfsDataArray.push(ipfsData)
  }

  console.log('ipfsDataArray ', ipfsDataArray)
  return ipfsDataArray
}
export const useFetchIPFS = (ipfsImages: string[]) => {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    try {
      const fetchImages = async () => {
        const newImages = []

        if (!ipfsImages?.length) {
          return
        }
        for (const hash of ipfsImages) {
          const { ipfsHash } = JSON.parse(hash)

          const response = await fetch(
            `https://api.tatum.io/v3/ipfs/${ipfsHash}`,
            {
              method: 'GET',
              headers: {
                'x-api-key': process.env.NEXT_PUBLIC_TATUM_KEY || '',
              },
            },
          )

          const blob = await response.blob()
          const url = URL.createObjectURL(blob)
          newImages.push(url)
        }

        setImages(newImages)
      }
      fetchImages()
    } catch (error) {
      console.log('error', error)
    }
  }, [ipfsImages, setImages])

  return { images }
}
