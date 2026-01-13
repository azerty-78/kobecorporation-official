import { useEffect, useState } from 'react'

interface UseCounterOptions {
  duration?: number
  start?: number
  decimals?: number
}

export function useCounter(
  target: number,
  isActive: boolean,
  options: UseCounterOptions = {}
) {
  const { duration = 2000, start = 0, decimals = 0 } = options
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!isActive) return

    const startTime = Date.now()
    const startValue = start
    const endValue = target

    const updateCount = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      const currentValue = startValue + (endValue - startValue) * easeOut
      setCount(Number(currentValue.toFixed(decimals)))

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(endValue)
      }
    }

    const animationFrame = requestAnimationFrame(updateCount)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [target, isActive, duration, start, decimals])

  return count
}
