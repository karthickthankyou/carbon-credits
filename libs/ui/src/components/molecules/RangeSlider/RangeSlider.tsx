import Slider, { SliderProps } from '@mui/material/Slider'

const RangeSlider = (props: SliderProps) => (
  <div className="w-full pt-6 pl-2 pr-4">
    <Slider
      valueLabelDisplay="on"
      classes={{
        root: `h-0.5 w-full border-0 `,
        thumb:
          'rounded-none border w-4 h-4 after:active:bg-black/10 after:w-8 after:h-8 after:rounded-none bg-white hover:shadow-none hover:border-black hover:bg-gray-50 focus:bg-gray-50',
        track: 'text-gray-800',
        rail: 'bg-gray-400',
        valueLabel:
          'text-black rounded-none py-0 px-0.5 text-sm bg-white/20  before:border-b before:border-r before:border-black active:shadow-none',
      }}
      {...props}
    />
  </div>
)

export { RangeSlider }
