import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'accent' | 'neutral'
  className?: string
  icon?: ReactNode
}

export function Badge({ 
  children, 
  variant = 'accent',
  className = '',
  icon 
}: BadgeProps) {
  const variantClasses = {
    primary: 'bg-brand-50 text-brand-600',
    accent: 'bg-accent-50 text-accent-600',
    neutral: 'bg-neutral-100 text-neutral-700',
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold shadow-subtle transition-all duration-300 hover:shadow-md ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </div>
  )
}
