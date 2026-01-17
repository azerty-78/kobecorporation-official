import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  elevation?: 'none' | 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function Card({ 
  children, 
  className = '', 
  hover = true,
  elevation = 'md',
  onClick 
}: CardProps) {
  const elevationClasses = {
    none: 'shadow-none',
    sm: 'shadow-subtle',
    md: 'shadow-card',
    lg: 'shadow-card-hover',
  }

  const hoverClasses = hover
    ? 'transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover'
    : 'transition-all duration-300'

  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white p-6 ${elevationClasses[elevation]} ${hoverClasses} ${className}`}
      onClick={onClick}
      style={{ 
        zIndex: elevation === 'lg' ? 20 : elevation === 'md' ? 10 : 1,
        position: 'relative'
      }}
    >
      {children}
    </div>
  )
}
