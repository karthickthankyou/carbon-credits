import { useEffect, useState } from 'react'
import { config, animated, useTransition } from 'react-spring'

export interface IScrollBannerProps {
  input: string[]
  className?: string
}

export const ScrollText = ({ input, className }: IScrollBannerProps) => {
  const [selected, setSelected] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % input.length)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [input.length])

  const markersTransitions = useTransition([input[selected]] || [], {
    keys: (item) => item,
    from: { opacity: 0, transform: 'translateX(-6px)' },
    enter: { opacity: 1, transform: 'translateX(0)' },

    config: config.gentle,
  })

  return (
    <div className="inline-block ">
      {markersTransitions((style, item) => (
        <animated.div key={item} style={style}>
          <div className={className} key={item}>
            {item}
          </div>
        </animated.div>
      ))}
    </div>
  )
}
