import React, { useRef, useEffect, useState, useCallback } from 'react'

/**
 * Canvas-based water and drum washing visualization.
 * This is an illustrative animation, not a simulation based on engineering data.
 */
export default function WaterVisualization() {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedDrum, setSelectedDrum] = useState(1)
  const particlesRef = useRef([])
  const timeRef = useRef(0)

  const initParticles = useCallback((canvas) => {
    const particles = []
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 60 + Math.random() * 100
      particles.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        baseX: cx + Math.cos(angle) * radius,
        baseY: cy + Math.sin(angle) * radius,
        radius: 1.5 + Math.random() * 3,
        speed: 0.3 + Math.random() * 0.7,
        angle: angle,
        orbitRadius: radius,
        opacity: 0.3 + Math.random() * 0.5,
        color: Math.random() > 0.5 ? '0, 119, 217' : '54, 215, 242',
      })
    }
    particlesRef.current = particles
  }, [])

  const draw = useCallback((canvas, ctx) => {
    const { width, height } = canvas
    const cx = width / 2
    const cy = height / 2
    const time = timeRef.current

    ctx.clearRect(0, 0, width, height)

    // Background gradient
    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.6)
    bgGrad.addColorStop(0, '#0D2240')
    bgGrad.addColorStop(1, '#081428')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, width, height)

    // Drum outline
    const drumRadius = Math.min(width, height) * 0.32
    ctx.beginPath()
    ctx.arc(cx, cy, drumRadius, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(100, 140, 180, 0.3)'
    ctx.lineWidth = 2
    ctx.stroke()

    // Inner drum
    ctx.beginPath()
    ctx.arc(cx, cy, drumRadius * 0.85, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(100, 140, 180, 0.15)'
    ctx.lineWidth = 1
    ctx.stroke()

    // Drum perforations
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2 + (isPlaying ? time * 0.2 : 0)
      const px = cx + Math.cos(a) * drumRadius * 0.78
      const py = cy + Math.sin(a) * drumRadius * 0.78
      ctx.beginPath()
      ctx.arc(px, py, 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(54, 215, 242, 0.2)'
      ctx.fill()
    }

    // Water level
    if (isPlaying) {
      const waterLevel = cy + drumRadius * 0.15
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, drumRadius * 0.82, 0, Math.PI * 2)
      ctx.clip()

      // Water surface wave
      ctx.beginPath()
      ctx.moveTo(cx - drumRadius, waterLevel)
      for (let x = cx - drumRadius; x <= cx + drumRadius; x += 2) {
        const wave = Math.sin((x - cx) * 0.03 + time * 2) * 8 +
                     Math.sin((x - cx) * 0.05 + time * 3) * 4
        ctx.lineTo(x, waterLevel + wave)
      }
      ctx.lineTo(cx + drumRadius, height)
      ctx.lineTo(cx - drumRadius, height)
      ctx.closePath()

      const waterGrad = ctx.createLinearGradient(0, waterLevel, 0, cy + drumRadius)
      waterGrad.addColorStop(0, 'rgba(0, 119, 217, 0.15)')
      waterGrad.addColorStop(0.5, 'rgba(54, 215, 242, 0.1)')
      waterGrad.addColorStop(1, 'rgba(0, 60, 120, 0.2)')
      ctx.fillStyle = waterGrad
      ctx.fill()
      ctx.restore()
    }

    // Particles (water droplets)
    if (isPlaying) {
      particlesRef.current.forEach((p) => {
        p.angle += p.speed * 0.02
        p.x = cx + Math.cos(p.angle) * p.orbitRadius
        p.y = cy + Math.sin(p.angle) * p.orbitRadius
        
        // Keep within drum
        const dist = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2)
        if (dist > drumRadius * 0.8) {
          p.orbitRadius *= 0.99
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity * 0.6})`
        ctx.fill()
      })
    }

    // Center drum hub
    ctx.beginPath()
    ctx.arc(cx, cy, 12, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(54, 215, 242, 0.15)'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cx, cy, 4, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0, 119, 217, 0.4)'
    ctx.fill()

    // Drum zone labels (conceptual)
    const drumNames = ['DRUM 01', 'DRUM 02', 'DRUM 03']
    const drumPositions = [
      { x: cx, y: cy - drumRadius * 0.45 },
      { x: cx - drumRadius * 0.35, y: cy + drumRadius * 0.35 },
      { x: cx + drumRadius * 0.35, y: cy + drumRadius * 0.35 },
    ]
    drumPositions.forEach((pos, i) => {
      const isActive = selectedDrum === i + 1
      ctx.font = `${isActive ? '600' : '400'} 10px "Outfit", sans-serif`
      ctx.textAlign = 'center'
      ctx.fillStyle = isActive ? 'rgba(54, 215, 242, 0.9)' : 'rgba(255,255,255,0.3)'
      ctx.fillText(drumNames[i], pos.x, pos.y)
      if (isActive) {
        ctx.beginPath()
        ctx.arc(pos.x, pos.y + 10, 20, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(54, 215, 242, 0.3)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
    })

    // Overlay label
    ctx.font = '500 11px "Outfit", sans-serif'
    ctx.textAlign = 'left'
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    ctx.fillText('WASHING PROCESS · CONCEPTUAL ILLUSTRATION', 20, height - 20)
  }, [isPlaying, selectedDrum])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      initParticles(canvas)
    }

    resize()
    window.addEventListener('resize', resize)
    
    const animate = () => {
      if (isPlaying) timeRef.current += 0.016
      const dpr = window.devicePixelRatio
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      draw({ width: w, height: h, ...canvas }, ctx)
      animFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isPlaying, selectedDrum, draw, initParticles])

  const handleReset = () => {
    setIsPlaying(false)
    timeRef.current = 0
  }

  return (
    <div>
      <div className="water-viz__display">
        <canvas ref={canvasRef} className="water-viz__canvas" />
      </div>
      <div className="water-viz__controls">
        <button className={`water-viz__control-btn ${isPlaying ? '' : 'water-viz__control-btn--active'}`} onClick={() => setIsPlaying(false)} aria-label="Pause demonstration">⏸ Pause</button>
        <button className={`water-viz__control-btn ${isPlaying ? 'water-viz__control-btn--active' : ''}`} onClick={() => setIsPlaying(true)} aria-label="Start demonstration">▶ Start</button>
        <button className="water-viz__control-btn" onClick={handleReset} aria-label="Reset animation">↺ Reset</button>
        <button className={`water-viz__control-btn ${selectedDrum === 1 ? 'water-viz__control-btn--active' : ''}`} onClick={() => setSelectedDrum(1)}>Drum 01</button>
        <button className={`water-viz__control-btn ${selectedDrum === 2 ? 'water-viz__control-btn--active' : ''}`} onClick={() => setSelectedDrum(2)}>Drum 02</button>
        <button className={`water-viz__control-btn ${selectedDrum === 3 ? 'water-viz__control-btn--active' : ''}`} onClick={() => setSelectedDrum(3)}>Drum 03</button>
      </div>
    </div>
  )
}
