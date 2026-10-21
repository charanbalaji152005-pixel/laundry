import React, { useRef, useState, useCallback } from 'react'

/**
 * Magnetic button that subtly moves toward the pointer on hover,
 * with spring physics and smooth reset.
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  type = 'button',
  style = {},
  'aria-label': ariaLabel,
  disabled = false
}) {
  const btnRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current || disabled) return
    const rect = btnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    setPosition({ x: deltaX, y: deltaY })
  }, [strength, disabled])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <button
      ref={btnRef}
      type={type}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        transform: `translate3d(${position.x.toFixed(1)}px, ${position.y.toFixed(1)}px, 0)`,
        transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: 'transform',
        ...style
      }}
    >
      {children}
    </button>
  )
}
