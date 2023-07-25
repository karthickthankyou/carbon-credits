import { IconSeeding, IconTrees } from '@tabler/icons-react'

export interface IPlantIconProps {}

export const PlantIcon = ({}: IPlantIconProps) => {
  return (
    <div className="flex items-center justify-center w-8 h-8 border border-white rounded shadow-lg cursor-pointer bg-white/40 shadow-black/30">
      <IconTrees />
    </div>
  )
}
