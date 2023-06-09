import { IconPlant } from '@tabler/icons-react'

export interface IPlantIconProps {}

export const PlantIcon = ({}: IPlantIconProps) => {
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full shadow-lg cursor-pointer via-transparent bg-gradient-to-t from-primary-25 to-transparent shadow-black/30">
      <IconPlant />
    </div>
  )
}
