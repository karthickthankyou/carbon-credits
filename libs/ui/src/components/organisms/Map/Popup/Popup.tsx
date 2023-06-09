import { IconX } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Popup, PopupProps } from 'react-map-gl'

const MapPopup = ({
  latitude,
  longitude,
  children,
  onClose,
  show,
  setShow,
  ...props
}: PopupProps & {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}) => {
  //   useEffect(() => {
  //     if (escapePressed) onClose({})
  //   }, [escapePressed, onClose])

  if (!show) {
    return null
  }

  return (
    <Popup
      anchor="bottom"
      offset={16}
      closeOnClick={false}
      closeButton={false}
      latitude={latitude}
      longitude={longitude}
    >
      <div className="grid grid-cols-1 grid-rows-1">
        <div className="col-start-1 row-start-1 ">{children}</div>
        <div className="flex justify-end col-start-1 row-start-1 p-2 items-top">
          <button
            type="button"
            onClick={() => setShow(false)}
            className="absolute top-0 right-0 p-0.5 rounded-bl bg-black/30 hover:bg-black/40"
          >
            <IconX className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </Popup>
  )
}

export { MapPopup as Popup }

export const PopupContent = ({
  onClose,
  children,
}: {
  onClose: () => void
  children: ReactNode
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, transform: 'translateY(50%)' }}
        animate={{ opacity: 1, transform: 'translateY(0px)' }}
        exit={{ opacity: 0, transform: 'translateY(50%)' }}
        className="grid grid-cols-1 grid-rows-1 "
      >
        <div className="col-start-1 row-start-1 ">{children}</div>
        <div className="flex justify-end col-start-1 row-start-1 p-2 items-top">
          <button
            type="button"
            className="absolute top-0 right-0 p-0.5 rounded-bl bg-black/30 hover:bg-black/40"
            onClick={onClose}
          >
            <IconX className="w-5 h-5 text-white" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
