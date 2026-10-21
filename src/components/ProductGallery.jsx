import React, { useState, useEffect, useCallback } from 'react'
import WashingMachineSVG from './WashingMachineSVG'
import TiltCard from './TiltCard'

const GALLERY_DATA = [
  {
    id: 'front',
    title: 'Front Product View',
    subtitle: 'Studio Perspective',
    category: 'Full Appliance',
    badge: 'Flagship View',
    variant: 'hero',
    caption: 'Full-body front perspective showcasing the refined proportions, clean digital fascia, and distinctive triple-drum portal geometry.',
    spec: 'H: 850mm · W: 600mm · D: 680mm',
  },
  {
    id: 'side',
    title: 'Side Profile & Dampening',
    subtitle: 'Acoustic Architecture',
    category: 'Chassis',
    badge: 'Engineering',
    variant: 'side',
    caption: 'Side profile illustrating the patented wave acoustic embossing that dissipates motor torque and vibrational resonance during 1400 RPM spin cycles.',
    spec: 'Anti-Vibration Wave Geometry',
  },
  {
    id: 'rear',
    title: 'Rear Utilities & Connections',
    subtitle: 'Service Blueprint',
    category: 'Plumbing',
    badge: 'Technical',
    variant: 'rear',
    caption: 'Rear technical presentation highlighting dual electromagnetic water inlet valves, heavy-duty anti-siphon drainage connection, and 4 transport bolt mountings.',
    spec: 'Dual Hot/Cold Inlets · IPX4 Rated',
  },
  {
    id: 'drums',
    title: 'Triple Drum Internal Layout',
    subtitle: 'Multi-Chamber Concept',
    category: 'Drums',
    badge: 'Core Innovation',
    variant: 'drums-only',
    caption: 'Schematic cutaway displaying the three independent washing zones: Primary high-capacity drum combined with two specialized micro-care compartments.',
    spec: '3 Independent Wash Zones',
  },
  {
    id: 'control',
    title: 'Digital Control Fascia',
    subtitle: 'Smart Telemetry',
    category: 'Interface',
    badge: 'Smart Touch',
    variant: 'hero',
    caption: 'Integrated LED display screen displaying live cycle time, spin RPM, and wash phase, flanked by a precision-milled aluminum programme selection dial.',
    spec: 'Integrated LED · Jog Dial',
  },
  {
    id: 'lifestyle',
    title: 'Architectural Laundry Suite',
    subtitle: 'Contemporary Interior',
    category: 'Interior',
    badge: 'Lifestyle',
    variant: 'top',
    caption: 'Seamless architectural integration within a contemporary home environment, featuring clean lines, flush cabinetry, and premium stone surfaces.',
    spec: 'Modern Living Concept',
  },
  {
    id: 'gasket',
    title: 'ABT® Door & Gasket Detail',
    subtitle: 'Hygiene Engineering',
    category: 'Materials',
    badge: '99.9% Antibacterial',
    variant: 'detail',
    caption: 'Close-up of the Anti-Bacterial Treatment (ABT®) door seal and laser-welded stainless steel diamond drum perforations that prevent fabric snags.',
    spec: 'ABT® Certified Gasket',
  },
  {
    id: 'top',
    title: 'Countertop & Touch Surface',
    subtitle: 'Ergonomic Workspace',
    category: 'Ergonomics',
    badge: 'Tempered Glass',
    variant: 'top',
    caption: 'Top-down perspective demonstrating the anti-scratch tempered surface with integrated NFC quick-sync zone for smart laundry programmes.',
    spec: 'NFC Quick-Sync · Scratch Resistant',
  },
]

export default function ProductGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_DATA.length)
  }, [])

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, nextImage, prevImage])

  const currentItem = GALLERY_DATA[currentIndex]

  return (
    <div className="gallery-section">
      <div className="gallery__grid">
        {GALLERY_DATA.map((item, index) => (
          <TiltCard
            key={item.id}
            className={`gallery__card anim-fade-up ${index === 0 || index === 3 ? 'gallery__card--large' : ''}`}
            maxTilt={6}
            onClick={() => openLightbox(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(index)}
            aria-label={`View gallery item: ${item.title}`}
          >
            <div className="gallery__card-visual">
              <div className="gallery__card-bg" />
              <div className="gallery__svg-frame">
                <WashingMachineSVG variant={item.variant} activeDrum={1} />
              </div>
              <span className="gallery__card-badge">{item.badge}</span>
            </div>

            <div className="gallery__card-info">
              <div className="gallery__card-meta">{item.category}</div>
              <h3 className="gallery__card-title">{item.title}</h3>
              <p className="gallery__card-caption">{item.subtitle}</p>
            </div>

            <div className="gallery__card-hover-overlay">
              <span>Inspect Detail 🔍</span>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="lightbox lightbox--open"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
        >
          <div className="lightbox__modal" onClick={(e) => e.stopPropagation()}>
            {/* Top Toolbar */}
            <div className="lightbox__header">
              <div>
                <span className="lightbox__counter">
                  {currentIndex + 1} / {GALLERY_DATA.length}
                </span>
                <span className="lightbox__badge">{currentItem.category}</span>
              </div>
              <button
                type="button"
                className="lightbox__close-btn"
                onClick={closeLightbox}
                aria-label="Close Lightbox"
              >
                ✕
              </button>
            </div>

            {/* Main Stage */}
            <div className="lightbox__body">
              <button
                type="button"
                className="lightbox__nav-arrow lightbox__nav-arrow--prev"
                onClick={prevImage}
                aria-label="Previous Image"
              >
                ‹
              </button>

              <div className="lightbox__stage">
                <div className="lightbox__svg-wrapper">
                  <WashingMachineSVG variant={currentItem.variant} activeDrum={1} />
                </div>
              </div>

              <button
                type="button"
                className="lightbox__nav-arrow lightbox__nav-arrow--next"
                onClick={nextImage}
                aria-label="Next Image"
              >
                ›
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="lightbox__footer">
              <div className="lightbox__caption-group">
                <h3 className="lightbox__title">{currentItem.title}</h3>
                <p className="lightbox__desc">{currentItem.caption}</p>
              </div>
              <div className="lightbox__spec-pill">
                <span>{currentItem.spec}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
