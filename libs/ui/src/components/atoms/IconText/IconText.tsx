import { ReactNode } from 'react'
import { IconAlertHexagon } from '@tabler/icons-react'

export interface IIconTextProps {
  Icon?: ReactNode
  children: ReactNode
}

export const IconText = ({
  Icon = <IconAlertHexagon />,
  children,
}: IIconTextProps) => {
  return (
    <div className="flex items-center gap-1">
      {Icon}
      <div>{children}</div>
    </div>
  )
}
