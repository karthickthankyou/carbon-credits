import { ReactNode, useState } from 'react'
import { PlainButton } from '../../atoms/PlainButton'

export interface IShowHideProps {
  children: ReactNode
  showText?: string
  hideText?: string
}

export const ShowHide = ({
  children,
  showText = 'Show',
  hideText = 'Hide',
}: IShowHideProps): JSX.Element | null => {
  const [show, setShow] = useState(false)

  return (
    <div>
      {show ? children : null}
      <PlainButton
        className="text-xs"
        onClick={() => setShow((state) => !state)}
      >
        {show ? hideText : showText}
      </PlainButton>
    </div>
  )
}
