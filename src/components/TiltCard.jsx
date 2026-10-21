import React, { useRef, useState, useCallback } from 'react'

/**
 * 3D Tilt Card with pointer-responsive rotation, spring physics, and dynamic specular glare.
 * Respects touch devices and reduced-motion preferences.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  scale = 1.02,
  glare = true,
  onClick,
  role,
  tabIndex,
  onKeyDown,
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  style = {}
}) {
  const cardRef = useRef(null)
  const [transformStyle, setTransformStyle] = useState('')
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Normalized between -1 and 1
    const normX = (x / rect.width) * 2 - 1
    const normY = (y / rect.height) * 2 - 1

    const rotX = -normY * maxTilt
    const rotY = normX * maxTilt

    setTransformStyle(`perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`)
    
    if (glare) {
      setGlareStyle({
        opacity: 0.35,
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      })
    }
  }, [maxTilt, scale, glare])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    if (glare) {
      setGlareStyle(prev => ({ ...prev, opacity: 0 }))
    }
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      style={{
        transform: transformStyle,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transformStyle: 'preserve-3d',
        position: 'relative',
        ...style
      }}
    >
      {children}
      {glare && (
        <div
          className="tilt-card-glare"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(54, 215, 242, 0.25) 0%, rgba(255, 255, 255, 0.15) 30%, transparent 70%)`,
            opacity: glareStyle.opacity,
            transition: isHovered ? 'opacity 0.2s ease' : 'opacity 0.5s ease',
            zIndex: 10,
          }}
        />
      )}
    </div>
  )
}
