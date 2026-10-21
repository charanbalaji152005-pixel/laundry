import React, { useState, useRef, useEffect, useCallback } from 'react'
import WashingMachineSVG from './WashingMachineSVG'

const VIEW_PRESETS = [
  { id: 'front', label: 'Front', rotY: 0, rotX: 0, scale: 1, variant: 'hero' },
  { id: 'side', label: 'Side Profile', rotY: -25, rotX: 5, scale: 0.95, variant: 'side' },
  { id: 'rear', label: 'Rear Connections', rotY: 0, rotX: 0, scale: 0.95, variant: 'rear' },
  { id: 'top', label: 'Top Lid', rotY: 0, rotX: 30, scale: 0.9, variant: 'top' },
  { id: 'detail', label: 'Drum Macro', rotY: 0, rotX: 0, scale: 1.15, variant: 'detail' },
]

const HOTSPOTS = [
  {
    id: 'control-panel',
    title: 'Intelligent Control Fascia',
    category: 'Interface',
    viewId: 'front',
    x: '56%',
    y: '18%',
    desc: 'Digital LED telemetry display and rotary tactile jog-dial with real-time programme monitoring and child-lock safety.',
  },
  {
    id: 'main-drum',
    title: 'Primary Wash Drum (Drum 01)',
    category: 'Drum Cavity',
    viewId: 'front',
    x: '50%',
    y: '42%',
    desc: 'Large capacity primary stainless steel drum designed for standard everyday loads, bedding, and heavy fabrics.',
  },
  {
    id: 'aux-drums',
    title: 'Care & Refresh Chambers (02 & 03)',
    category: 'Triple Drum',
    viewId: 'front',
    x: '42%',
    y: '58%',
    desc: 'Two independent secondary wash compartments allowing separate simultaneous or staggered washing of delicates and quick refreshes.',
  },
  {
    id: 'door-seal',
    title: 'ABT® Antibacterial Door Gasket',
    category: 'Hygiene',
    viewId: 'front',
    x: '75%',
    y: '51%',
    desc: 'Anti-Bacterial Treatment (ABT) gasket that eliminates up to 99.9% of bacteria and mould buildup around the triple-zone door.',
  },
  {
    id: 'detergent-drawer',
    title: 'Smart Auto-Dosing Drawer',
    category: 'Convenience',
    viewId: 'front',
    x: '30%',
    y: '81%',
    desc: 'Precision multi-compartment dispenser that automatically calculates and measures liquid detergent and conditioner based on load.',
  },
  {
    id: 'plumbing-connections',
    title: 'Water Inlet & Drainage Connections',
    category: 'Plumbing',
    viewId: 'rear',
    x: '74%',
    y: '15%',
    desc: 'Dual hot & cold electromagnetic inlet valves paired with heavy-duty anti-siphon drainage hose connection.',
  },
  {
    id: 'exterior-finish',
    title: 'Acoustic Dampening Chassis',
    category: 'Architecture',
    viewId: 'side',
    x: '25%',
    y: '48%',
    desc: 'Zinc-coated galvanic steel exterior with patented wave-embossed side panels that dissipate vibrational resonance.',
  },
]

export default function ProductViewer3D() {
  const [currentView, setCurrentView] = useState('front')
  const [rotY, setRotY] = useState(0)
  const [rotX, setRotX] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotY: 0, rotX: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)

  const viewerContainerRef = useRef(null)

  // Switch camera view
  const setPresetView = (presetId) => {
    const preset = VIEW_PRESETS.find(p => p.id === presetId)
    if (!preset) return
    setCurrentView(preset.id)
    setRotY(preset.rotY)
    setRotX(preset.rotX)
    setZoom(preset.scale)
    setActiveHotspot(null)
  }

  // Reset to default
  const resetCamera = () => {
    setPresetView('front')
  }

  // Zoom handlers
  const zoomIn = () => setZoom(prev => Math.min(prev + 0.15, 2.0))
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.65))

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      zoomIn()
    } else {
      zoomOut()
    }
  }

  // Mouse drag rotation
  const handleMouseDown = (e) => {
    // Only drag on left mouse button
    if (e.button !== 0) return
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY, rotY, rotX })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    // Damped rotational speed
    const newRotY = dragStart.rotY + deltaX * 0.45
    const newRotX = Math.max(-30, Math.min(30, dragStart.rotX - deltaY * 0.3))

    setRotY(newRotY)
    setRotX(newRotX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch drag rotation
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return
    setIsDragging(true)
    const t = e.touches[0]
    setDragStart({ x: t.clientX, y: t.clientY, rotY, rotX })
  }

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return
    const t = e.touches[0]
    const deltaX = t.clientX - dragStart.x
    const deltaY = t.clientY - dragStart.y

    setRotY(dragStart.rotY + deltaX * 0.5)
    setRotX(Math.max(-30, Math.min(30, dragStart.rotX - deltaY * 0.35)))
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!viewerContainerRef.current) return
    if (!document.fullscreenElement) {
      viewerContainerRef.current.requestFullscreen?.().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.().catch(() => {})
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  const activePreset = VIEW_PRESETS.find(p => p.id === currentView) || VIEW_PRESETS[0]

  return (
    <div className="viewer-wrapper" ref={viewerContainerRef}>
      {/* 3D Display Stage */}
      <div 
        className="viewer__display anim-scale-in"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        role="region"
        aria-label="Interactive 3D Washing Machine Viewer Stage"
      >
        {/* Subtle environment glow & floor reflections */}
        <div className="viewer__stage-glow" />
        
        {/* Hint banner */}
        <div className="viewer__hint">
          <span>✋ Click & Drag to Orbit</span>
          <span>·</span>
          <span>🔍 Scroll to Zoom</span>
        </div>

        {/* 3D Object Pivot */}
        <div 
          className="viewer__product-visual"
          style={{
            transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          <WashingMachineSVG variant={activePreset.variant} activeDrum={1} />
        </div>

        {/* Hotspots */}
        <div className="viewer__hotspots">
          {HOTSPOTS.map((hs) => {
            const isVisibleForView = (hs.viewId === currentView) || (hs.viewId === 'front' && currentView === 'detail')
            if (!isVisibleForView) return null
            const isSelected = activeHotspot === hs.id

            return (
              <React.Fragment key={hs.id}>
                <button
                  type="button"
                  className={`viewer__hotspot ${isSelected ? 'viewer__hotspot--active' : ''}`}
                  style={{ left: hs.x, top: hs.y }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveHotspot(isSelected ? null : hs.id)
                  }}
                  aria-label={`${hs.title} - ${hs.category}`}
                  aria-expanded={isSelected}
                >
                  <span className="viewer__hotspot-pulse" />
                </button>

                {isSelected && (
                  <div
                    className="viewer__hotspot-panel viewer__hotspot-panel--visible"
                    style={{ left: `calc(${hs.x} + 28px)`, top: hs.y }}
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-label={hs.title}
                  >
                    <div className="viewer__hotspot-badge">{hs.category}</div>
                    <h4 className="viewer__hotspot-title">{hs.title}</h4>
                    <p className="viewer__hotspot-desc">{hs.desc}</p>
                    <button
                      type="button"
                      className="viewer__hotspot-close"
                      onClick={() => setActiveHotspot(null)}
                      aria-label="Close hotspot information"
                    >
                      ✕ Close
                    </button>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Top-Right Quick Utilities: Fullscreen & Zoom +/- */}
        <div className="viewer__quick-tools">
          <button 
            type="button" 
            className="viewer__tool-btn" 
            onClick={zoomIn} 
            title="Zoom In" 
            aria-label="Zoom in"
          >
            +
          </button>
          <button 
            type="button" 
            className="viewer__tool-btn" 
            onClick={zoomOut} 
            title="Zoom Out" 
            aria-label="Zoom out"
          >
            −
          </button>
          <button 
            type="button" 
            className="viewer__tool-btn" 
            onClick={resetCamera} 
            title="Reset Camera" 
            aria-label="Reset camera"
          >
            ↺
          </button>
          <button 
            type="button" 
            className="viewer__tool-btn" 
            onClick={toggleFullscreen} 
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'} 
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? '⤓' : '⤢'}
          </button>
        </div>
      </div>

      {/* Camera View Preset Pills */}
      <div className="viewer__controls" role="toolbar" aria-label="Viewer camera presets">
        {VIEW_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={`viewer__control-btn ${currentView === preset.id ? 'viewer__control-btn--active' : ''}`}
            onClick={() => setPresetView(preset.id)}
          >
            {preset.label}
          </button>
        ))}
        <button
          type="button"
          className="viewer__control-btn viewer__control-btn--reset"
          onClick={resetCamera}
        >
          ↺ Reset View
        </button>
      </div>

      {/* Hotspots Quick Switcher Pills */}
      <div className="viewer__hotspot-pills">
        <span className="viewer__pills-title">Inspect Feature:</span>
        {HOTSPOTS.map((hs) => (
          <button
            key={hs.id}
            type="button"
            className={`viewer__hotspot-pill ${activeHotspot === hs.id ? 'viewer__hotspot-pill--active' : ''}`}
            onClick={() => {
              if (currentView !== hs.viewId) {
                setPresetView(hs.viewId)
              }
              setActiveHotspot(hs.id)
            }}
          >
            {hs.title}
          </button>
        ))}
      </div>
    </div>
  )
}
