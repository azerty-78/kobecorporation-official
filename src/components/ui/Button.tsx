import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  onClick?: () => void
  className?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  icon,
  iconPosition = 'right',
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-neutral-700 border border-neutral-200 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 shadow-subtle hover:shadow-md',
    outline: 'bg-transparent text-brand-500 border border-brand-500 hover:bg-brand-50 hover:border-brand-600',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3.5 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const baseClasses = `inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-0 focus:border-0 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </>
  )

  if (to) {
    return (
      <NavLink to={to} className={baseClasses}>
        {content}
      </NavLink>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  )
}
