import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import WashingMachineSVG from './components/WashingMachineSVG'
import WaterVisualization from './components/WaterVisualization'
import ProductViewer3D from './components/ProductViewer3D'
import ProductComparison from './components/ProductComparison'
import ProductGallery from './components/ProductGallery'
import TiltCard from './components/TiltCard'
import MagneticButton from './components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
   DATA CONSTANTS
   ───────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'design', label: 'Design' },
  { id: 'triple-drum', label: 'Triple Drum' },
  { id: 'technology', label: 'Technology' },
  { id: 'water-process', label: 'Washing Process' },
  { id: 'wash-modes', label: 'Wash Modes' },
  { id: 'specs', label: 'Specifications' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

const DRUM_DATA = [
  {
    number: 'DRUM 01',
    title: 'Primary Wash Drum',
    subtitle: 'Daily & Bulky Garments',
    color: '#0077D9',
    desc: 'The central high-capacity stainless steel drum designed for everyday mixed loads, towels, and family bedding. Operates independently or simultaneously with auxiliary drums.',
    specs: ['Large Capacity Volume', 'Direct Motion Drive', 'Diamond Pillow Perforations'],
  },
  {
    number: 'DRUM 02',
    title: 'Dedicated Care Drum',
    subtitle: 'Intimates, Silks & Wool',
    color: '#36D7F2',
    desc: 'A precision secondary compartment engineered for garments demanding specialized care. Allows gentle low-temperature cycles with zero risk of colour bleeding or friction with coarse fabrics.',
    specs: ['Ultra-Gentle Pulsation', 'Thermo-Regulated Bath', 'Fabric Protection Guard'],
  },
  {
    number: 'DRUM 03',
    title: 'Quick Refresh Drum',
    subtitle: 'Activewear & Express Sterilization',
    color: '#00A3FF',
    desc: 'An agile micro-compartment tailored for rapid 15-minute cycles, sportswear sanitization, or baby clothes sterilization without wasting full-load water and electricity.',
    specs: ['15-Min Express Clean', 'Steam Allergy Shield', 'Energy Efficient Micro-Dosing'],
  },
]

const DESIGN_CARDS = [
  {
    title: 'Exterior Silhouette',
    category: 'Industrial Form',
    desc: 'Clean geometric lines, flush seams, and balanced proportions allow the Triple Drum machine to fit gracefully into contemporary luxury laundry suites.',
    variant: 'hero',
    featured: true,
  },
  {
    title: 'Multi-Zone Access',
    category: 'Ergonomic Portal',
    desc: 'Engineered multi-chamber glass portal provides intuitive access to all three drum compartments while maintaining high-pressure water containment.',
    variant: 'drums-only',
    featured: false,
  },
  {
    title: 'Intelligent Fascia',
    category: 'User Interface',
    desc: 'Integrated digital display screen and tactile rotary dial provide immediate telemetry regarding cycle duration, water temperature, and spin RPM.',
    variant: 'detail',
    featured: false,
  },
  {
    title: 'Acoustic Dampening',
    category: 'Materials & Finish',
    desc: 'Patented wave-embossed side panels dissipate motor torque and resonance, ensuring whisper-quiet operation during 1400 RPM spin cycles.',
    variant: 'side',
    featured: false,
  },
]

const TECH_FEATURES = [
  {
    icon: '🔄',
    title: 'Intelligent Drum Movement',
    category: 'Motion Dynamics',
    summary: 'Direct Motion inverter motor coordinates tailored rotation angles and gentle rock-and-roll pulsation for each specific fabric type.',
    details: 'Haier’s patented Direct Motion brushless inverter motor is directly connected to the drum shafts without drive belts. This eliminates mechanical friction, cuts vibration, and enables micro-step rotation control for supreme fabric preservation.',
  },
  {
    icon: '💧',
    title: 'Smart Water Management',
    category: 'Hydro Efficiency',
    summary: 'Dual electromagnetic intake valves and multi-spray nozzles optimize water distribution across all active compartments simultaneously.',
    details: 'Dynamic multi-spray water jets saturate fabrics 30% faster than passive pooling, achieving deeper detergent penetration while reducing total water consumption per kilogram of laundry.',
  },
  {
    icon: '🌡️',
    title: 'Thermo-Precision Control',
    category: 'Thermal Regulation',
    summary: 'Precise multi-zone temperature heating elements adapt from cold gentle rinse up to 90°C hygienic sterilization.',
    details: 'Individual digital temperature sensors monitor thermal levels throughout the wash cycle, protecting delicate natural proteins in silk and wool from thermal shock while enabling deep sanitization.',
  },
  {
    icon: '📊',
    title: 'Dynamic Load Detection',
    category: 'Sensor Suite',
    summary: 'Internal sensors calculate load inertia and fabric density to calibrate water volume and cycle duration automatically.',
    details: 'Upon startup, brief rotational calibration pulses measure drum resistance to determine the exact dry weight of clothing, fine-tuning the cycle timeline to prevent wasted electricity.',
  },
  {
    icon: '🔇',
    title: 'Noise Reduction Architecture',
    category: 'Acoustic Engineering',
    summary: 'Multi-point hydraulic shock absorbers and wave-profile cabinet dissipate operational sound down to whisper levels.',
    details: 'Engineered specifically for modern open-plan apartments, multi-layered insulation and vibration-absorbing chassis reduce operational spin volume, permitting overnight wash cycles without household disturbance.',
  },
  {
    icon: '⚡',
    title: 'Energy Class Optimization',
    category: 'Eco Performance',
    summary: 'Engineered to achieve top-tier European energy class ratings through direct magnetic drive and auto-dosing efficiency.',
    details: 'By allowing users to wash smaller loads in the micro-care compartments rather than running an entire 10kg drum, the Triple Drum architecture can reduce weekly energy and water consumption substantially.',
  },
]

const WASH_MODES = [
  {
    icon: '👕',
    title: 'Everyday Mixed',
    category: 'Daily Laundry',
    temp: '40°C',
    duration: '45 min',
    spin: '1200 RPM',
    desc: 'Standard balanced cycle for mixed cotton and synthetic clothing with optimized rinse phases.',
  },
  {
    icon: '🧣',
    title: 'Delicates & Silk',
    category: 'Gentle Care',
    temp: '30°C',
    duration: '35 min',
    spin: '600 RPM',
    desc: 'Subdued cradle agitation designed specifically for lace, silk, and delicate items in Drum 02.',
  },
  {
    icon: '🧺',
    title: 'Cotton Intensive',
    category: 'Heavy Duty',
    temp: '60°C',
    duration: '60 min',
    spin: '1400 RPM',
    desc: 'High-temperature stain removal cycle with extended wash action for durable linens and towels.',
  },
  {
    icon: '⚡',
    title: 'Quick Express',
    category: 'Speed Wash',
    temp: '30°C',
    duration: '15 min',
    spin: '1000 RPM',
    desc: 'Shortened freshening cycle for lightly soiled activewear or single shirts in Drum 03.',
  },
  {
    icon: '🛏️',
    title: 'Bedding & Bulky',
    category: 'Large Items',
    temp: '40°C',
    duration: '75 min',
    spin: '1000 RPM',
    desc: 'Engineered for duvet covers, sheets, and curtains with deep water infusion in Drum 01.',
  },
  {
    icon: '💧',
    title: 'Rinse & High Spin',
    category: 'Spin Cycle',
    temp: 'Cold',
    duration: '18 min',
    spin: '1400 RPM',
    desc: 'Dedicated fresh-water rinse followed by maximum centrifugal spin extraction.',
  },
  {
    icon: '🔧',
    title: 'Self-Clean & Steam',
    category: 'Maintenance',
    temp: '90°C',
    duration: '90 min',
    spin: '800 RPM',
    desc: 'High-temperature sterilization cycle that flushes out detergent residues and sanitizes drum walls.',
  },
]

const SPECS = [
  { label: 'Model Concept', value: 'Haier Triple Drum Showcase', note: 'Conceptual Prototype' },
  { label: 'Drum Configuration', value: '3 Independent Washing Zones', note: 'Tri-Cavity System' },
  { label: 'Exterior Dimensions', value: '~600 × 680 × 850 mm', note: 'Subject to model confirmation' },
  { label: 'Cabinet Weight (est.)', value: '~78 kg', note: 'Standard chassis balance' },
  { label: 'Max Spin Velocity', value: 'Up to 1400 RPM', note: 'Variable inverter speed' },
  { label: 'Motor Technology', value: 'Brushless Direct Motion', note: 'Beltless magnetic drive' },
  { label: 'Hygiene Treatment', value: 'ABT® Antibacterial Gasket', note: '99.9% Bacteria elimination' },
  { label: 'Smart Connectivity', value: 'Wi-Fi & hOn Ecosystem', note: 'Select production models' },
  { label: 'Auto-Dosing System', value: 'Dual Reservoir (Detergent/Softener)', note: 'Precision milliliter dosing' },
  { label: 'Display & UI', value: 'Digital LED + Rotary Jog Dial', note: 'Tactile selection interface' },
]

const REVEAL_STEPS = [
  {
    title: 'Stage 1: Exterior Silhouette',
    desc: 'Refined proportions and zinc-coated steel cabinet designed for contemporary architecture.',
    variant: 'hero',
    badge: 'Overview',
  },
  {
    title: 'Stage 2: Precision Door Portal',
    desc: 'Smoked glass portal with chrome bezel and ABT® antibacterial hygiene gasket barrier.',
    variant: 'hero',
    badge: 'Portal Focus',
  },
  {
    title: 'Stage 3: Triple-Drum Architecture',
    desc: 'Internal layout featuring the primary high-capacity drum and twin micro-care compartments.',
    variant: 'drums-only',
    badge: 'Multi-Chamber',
  },
  {
    title: 'Stage 4: Intelligent Digital Telemetry',
    desc: 'Integrated control fascia with real-time programme monitoring and cycle diagnostics.',
    variant: 'detail',
    badge: 'Fascia Macro',
  },
  {
    title: 'Stage 5: Dynamic Washing Equilibrium',
    desc: 'Direct Motion inverter motor synchronizing balanced centrifugal motion at 1400 RPM.',
    variant: 'drums-only',
    badge: 'Dynamic Drive',
  },
]

const FAQ_DATA = [
  {
    q: 'What is a triple-drum washing machine?',
    a: 'A triple-drum washing machine is an innovative home appliance concept incorporating three separate washing compartments within a single unified cabinet. This enables users to organize and wash different fabric categories (such as darks, whites, and delicates) simultaneously with independent cycle settings.',
  },
  {
    q: 'How is the selected model\'s drum arrangement designed?',
    a: 'In this Haier Triple Drum showcase, the arrangement features a primary large-volume drum situated at the top center for standard everyday loads, complemented by two dedicated micro-care compartments at the lower tier for intimate garments and quick refresh cycles. Consult official product documentation for specific production layouts.',
  },
  {
    q: 'What washing programmes are available?',
    a: 'The appliance provides over 12 specialized cycles including Everyday Mixed, Cotton Intensive, Delicates & Silk, Quick Express (15-min), Bedding & Bulky, Rinse & High Spin, and a 90°C Drum Self-Clean sterilization mode.',
  },
  {
    q: 'What is the capacity of each drum?',
    a: 'Individual compartment capacities vary according to model engineering. The primary wash drum typically accommodates full family loads, while the auxiliary chambers are scaled for smaller 1–2kg delicate or express items. Drum capacities cannot simply be added together as a continuous single space.',
  },
  {
    q: 'What are the machine\'s dimensions?',
    a: 'The concept machine is designed to conform to standard European laundry counter dimensions of approximately 600 mm width, 680 mm depth, and 850 mm height, enabling seamless integration within standard kitchen and utility room cabinetry.',
  },
  {
    q: 'Which maintenance procedures are recommended?',
    a: 'Regular maintenance includes running the high-temperature Drum Clean cycle periodically, wiping down the ABT® antibacterial door gasket, rinsing the auto-dosing detergent dispenser drawer, and clearing the bottom lint filter.',
  },
  {
    q: 'Where can I find the official user manual?',
    a: 'Official user manuals, installation guides, and certified technical specification sheets are distributed through the official Haier support portal or included within commercial packaging upon verified product launch.',
  },
  {
    q: 'How can I request product information?',
    a: 'You can submit an inquiry via the showroom contact form on this page. Please note that this website is an independent conceptual product showcase created for demonstration purposes.',
  },
]

/* ─────────────────────────────────────────────────────────
   MAIN APP COMPONENT
   ───────────────────────────────────────────────────────── */

export default function App() {
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [activeDrum, setActiveDrum] = useState(1)
  const [activeMode, setActiveMode] = useState(0)
  const [techModal, setTechModal] = useState(null)
  const [revealStep, setRevealStep] = useState(0)

  // Enquiry form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '', message: '' })
  const [formErrors, setFormErrors] = useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  // FAQ accordion state
  const [faqOpen, setFaqOpen] = useState(0)

  const heroRef = useRef(null)

  // ─── SMOOTH SCROLL (LENIS) ───
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  // ─── INITIAL LOADER TIMER ───
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  // ─── NAVBAR SCROLL DETECTOR ───
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ─── GSAP HERO ENTRANCE ANIMATION ───
  useEffect(() => {
    if (loading) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to('.hero__label', { opacity: 1, y: 0, duration: 0.6 }, 0.1)
        .to('.hero__title', { opacity: 1, y: 0, duration: 0.8 }, 0.25)
        .to('.hero__secondary-title', { opacity: 1, y: 0, duration: 0.6 }, 0.45)
        .to('.hero__description', { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        .to('.hero__buttons', { opacity: 1, y: 0, duration: 0.6 }, 0.65)
        .to('.hero__product-wrapper', { opacity: 1, scale: 1, duration: 0.9 }, 0.3)
        .to('.hero__floating-label', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.8)
        .to('.hero__stats', { opacity: 1, y: 0, duration: 0.6 }, 0.9)
    }, heroRef)
    return () => ctx.revert()
  }, [loading])

  // ─── GSAP SCROLLTRIGGERS & SECTION TRACKING ───
  useEffect(() => {
    if (loading) return

    const ctx = gsap.context(() => {
      // General fade-up animations
      gsap.utils.toArray('.anim-fade-up').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })

      // Section active tracking
      NAV_LINKS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      })

      // Scroll Reveal Pin & Step Transition
      const revealEl = document.querySelector('.scroll-reveal')
      if (revealEl) {
        ScrollTrigger.create({
          trigger: '.scroll-reveal',
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const step = Math.min(4, Math.floor(self.progress * 5))
            setRevealStep(step)
          },
        })
      }
    })

    return () => ctx.revert()
  }, [loading])

  // ─── SMOOTH SCROLL NAVIGATION ───
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }, [])

  // ─── FORM VALIDATION & SUBMISSION ───
  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setFormErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Please provide your full name'
    if (!formData.email.trim()) errors.email = 'Please provide your email address'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please provide a valid email'
    if (!formData.message.trim()) errors.message = 'Please input your product question or message'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setFormSubmitted(true)
    }
  }

  return (
    <>
      {/* ── WEBSITE LOADER ── */}
      <div className={`loader ${loading ? '' : 'loader--hidden'}`} aria-hidden={!loading}>
        <div className="loader__brand">HAIER</div>
        <div className="loader__bar-track"><div className="loader__bar" /></div>
        <div className="loader__tagline">TRIPLE DRUM EXPERIENCE · NEXT-GENERATION LAUNDRY</div>
      </div>

      {/* ── FLOATING NAVIGATION BAR ── */}
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} role="navigation" aria-label="Main product navigation">
        <div className="nav__inner">
          <div className="nav__brand" role="banner" onClick={() => scrollToSection('overview')} style={{ cursor: 'pointer' }}>
            <span className="nav__logo">HAIER</span>
            <span className="nav__tagline">TRIPLE DRUM EXPERIENCE</span>
          </div>

          <div className="nav__links" role="menubar">
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                role="menuitem"
                className={`nav__link ${activeSection === id ? 'nav__link--active' : ''}`}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}
          </div>

          <MagneticButton
            className="btn btn--primary nav__cta"
            onClick={() => scrollToSection('viewer-section')}
            strength={0.25}
          >
            Explore Product
          </MagneticButton>

          <button
            className={`nav__mobile-toggle ${mobileMenuOpen ? 'nav__mobile-toggle--open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!mobileMenuOpen}>
        {NAV_LINKS.map(({ id, label }) => (
          <button key={id} className="mobile-menu__link" onClick={() => scrollToSection(id)}>
            {label}
          </button>
        ))}
        <button
          className="btn btn--primary"
          style={{ marginTop: 24, width: '100%' }}
          onClick={() => scrollToSection('contact')}
        >
          Request Product Information
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════
         1. HERO SECTION
         ══════════════════════════════════════════════════════ */}
      <section id="overview" className="hero" ref={heroRef}>
        <div className="hero__bg-shapes">
          <div className="hero__bg-circle hero__bg-circle--1" />
          <div className="hero__bg-circle hero__bg-circle--2" />
          <div className="hero__bg-circle hero__bg-circle--3" />
          <div className="hero__grid-overlay" />
        </div>

        <div className="container hero__content">
          <div className="hero__text">
            <div className="hero__label">Haier Innovation</div>
            <h1 className="hero__title">
              <span>LAUNDRY,</span>
              <span className="highlight">REIMAGINED.</span>
            </h1>
            <p className="hero__secondary-title">THREE DRUMS. ONE SMARTER EXPERIENCE.</p>
            <p className="hero__description">
              Discover an innovative laundry concept designed to bring intelligent washing experiences and modern design into your home. Three independent drums for uncompromising fabric care.
            </p>

            <div className="hero__buttons">
              <MagneticButton
                className="btn btn--primary"
                onClick={() => scrollToSection('technology')}
                strength={0.3}
              >
                Explore the Technology <span className="arrow">→</span>
              </MagneticButton>

              <MagneticButton
                className="btn btn--secondary"
                onClick={() => scrollToSection('viewer-section')}
                strength={0.3}
              >
                Discover the Design <span className="arrow">→</span>
              </MagneticButton>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-value">3</div>
                <div className="hero__stat-label">Independent Drums</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-value">12+</div>
                <div className="hero__stat-label">Wash Programmes</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-value">A+++</div>
                <div className="hero__stat-label">Energy Efficiency*</div>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <TiltCard className="hero__product-wrapper" maxTilt={8} scale={1.01}>
              <div className="hero__product-glow" />
              <div className="hero__product-image">
                <WashingMachineSVG variant="hero" activeDrum={1} />
              </div>

              <div className="hero__floating-label hero__floating-label--1">
                🎛️ Smart LED Fascia
              </div>
              <div className="hero__floating-label hero__floating-label--2">
                🌀 Tri-Zone Cavity
              </div>
              <div className="hero__floating-label hero__floating-label--3">
                ⚡ Direct Motion Drive
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         2. INTERACTIVE 3D PRODUCT VIEWER
         ══════════════════════════════════════════════════════ */}
      <section id="viewer-section" className="section viewer">
        <div className="container">
          <div className="anim-fade-up">
            <span className="section-label">Interactive 3D Viewer</span>
            <h2 className="section-title">MEET YOUR NEXT-GENERATION WASHING MACHINE.</h2>
            <p className="section-subtitle">
              Explore the product from every angle and discover the details behind its design. Click and drag to orbit in 3D, inspect mechanical hotspots, or switch camera views.
            </p>
          </div>

          <ProductViewer3D />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         3. SCROLL-CONTROLLED PRODUCT REVEAL
         ══════════════════════════════════════════════════════ */}
      <section className="scroll-reveal">
        <div className="scroll-reveal__sticky">
          <div className="scroll-reveal__visual">
            <div className="scroll-reveal__product">
              <WashingMachineSVG variant={REVEAL_STEPS[revealStep].variant} activeDrum={revealStep === 2 ? 1 : null} />
            </div>
          </div>

          <div className="scroll-reveal__text-overlay">
            <div className="anim-fade-up">
              <span className="section-label" style={{ color: '#36D7F2', justifyContent: 'center' }}>
                Engineering Reveal
              </span>
              <h2 className="section-title" style={{ color: '#fff', textAlign: 'center' }}>
                DESIGNED TO REVEAL MORE.
              </h2>
              <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center', margin: '0 auto' }}>
                Move beyond the exterior and explore the design and technology behind the washing experience.
              </p>
            </div>
          </div>

          {/* Dynamic Step Narrative Badge */}
          <div className="scroll-reveal__step-card">
            <span className="scroll-reveal__step-badge">{REVEAL_STEPS[revealStep].badge}</span>
            <span className="scroll-reveal__step-title">{REVEAL_STEPS[revealStep].title}</span>
            <span className="scroll-reveal__step-desc">{REVEAL_STEPS[revealStep].desc}</span>
          </div>

          {/* Interactive Progress Indicators */}
          <div className="scroll-reveal__progress">
            {REVEAL_STEPS.map((step, i) => (
              <button
                key={i}
                type="button"
                className={`scroll-reveal__progress-dot ${revealStep === i ? 'scroll-reveal__progress-dot--active' : ''}`}
                onClick={() => setRevealStep(i)}
                aria-label={`Jump to ${step.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         4. PRODUCT DESIGN SECTION
         ══════════════════════════════════════════════════════ */}
      <section id="design" className="section design">
        <div className="container">
          <div className="anim-fade-up">
            <span className="section-label">Appliance Architecture</span>
            <h2 className="section-title">FORM MEETS FUNCTION.</h2>
            <p className="section-subtitle">
              Every surface, curve, and interface detail contributes to a modern appliance experience that integrates seamlessly into luxury residential spaces.
            </p>
          </div>

          <div className="design__grid">
            {DESIGN_CARDS.map((card, i) => (
              <TiltCard
                key={i}
                className={`design-card anim-fade-up ${card.featured ? 'design-card--featured' : ''}`}
                maxTilt={8}
              >
                <div className="design-card__visual">
                  <div style={{ width: '60%', height: '60%' }}>
                    <WashingMachineSVG variant={card.variant} activeDrum={1} />
                  </div>
                </div>
                <div className="design-card__info">
                  <span className="gallery__card-meta">{card.category}</span>
                  <h3 className="design-card__title">{card.title}</h3>
                  <p className="design-card__desc">{card.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         5. TRIPLE DRUM TECHNOLOGY SHOWCASE
         ══════════════════════════════════════════════════════ */}
      <section id="triple-drum" className="section section--dark triple-drum">
        <div className="container">
          <div className="anim-fade-up">
            <span className="section-label" style={{ color: '#36D7F2' }}>Triple Drum Technology</span>
            <h2 className="section-title">THREE DRUMS. MORE WAYS TO THINK ABOUT LAUNDRY.</h2>
            <p className="section-subtitle">
              Explore the triple-drum concept through an interactive visual demonstration of washing zones and laundry organization.
            </p>
          </div>

          <div className="triple-drum__showcase">
            <div className="triple-drum__visual anim-scale-in">
              <div className="triple-drum__visual-bg" />
              <WashingMachineSVG variant="drums-only" activeDrum={activeDrum} className="triple-drum__svg" />
            </div>

            <div className="triple-drum__selector">
              {DRUM_DATA.map((drum, i) => (
                <TiltCard
                  key={i}
                  className={`drum-card anim-fade-up ${activeDrum === i + 1 ? 'drum-card--active' : ''}`}
                  onClick={() => setActiveDrum(i + 1)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveDrum(i + 1)}
                  aria-pressed={activeDrum === i + 1}
                  aria-label={`Select ${drum.title}`}
                  maxTilt={6}
                >
                  <div className="drum-card__indicator" style={{ background: drum.color }} />
                  <div className="drum-card__header">
                    <span className="drum-card__number" style={{ color: drum.color }}>{drum.number}</span>
                    <span className="gallery__card-badge" style={{ position: 'static' }}>{drum.subtitle}</span>
                  </div>
                  <h3 className="drum-card__title">{drum.title}</h3>
                  <p className="drum-card__desc">{drum.desc}</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                    {drum.specs.map((sp, idx) => (
                      <span key={idx} style={{ fontSize: '0.68rem', padding: '3px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: 4, color: 'rgba(255,255,255,0.7)' }}>
                        ✓ {sp}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         6. WASHING TECHNOLOGY
         ══════════════════════════════════════════════════════ */}
      <section id="technology" className="section section--dark technology">
        <div className="technology__bg" />
        <div className="container">
          <div className="anim-fade-up">
            <span className="section-label" style={{ color: '#36D7F2' }}>Core Technologies</span>
            <h2 className="section-title">INTELLIGENCE IN EVERY CYCLE.</h2>
            <p className="section-subtitle">
              Explore the engineering and controls that shape the washing experience. Click on any card to view detailed specifications.
            </p>
          </div>

          <div className="technology__grid">
            {TECH_FEATURES.map((feat, i) => (
              <TiltCard
                key={i}
                className="tech-card anim-fade-up"
                onClick={() => setTechModal(feat)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setTechModal(feat)}
                aria-label={`Learn more about ${feat.title}`}
                maxTilt={8}
              >
                <div className="tech-card__icon">{feat.icon}</div>
                <span className="gallery__card-meta" style={{ color: '#36D7F2' }}>{feat.category}</span>
                <h3 className="tech-card__title">{feat.title}</h3>
                <p className="tech-card__desc">{feat.summary}</p>
                <span className="tech-card__link">Inspect Details →</span>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         7. WATER & WASHING SIMULATION
         ══════════════════════════════════════════════════════ */}
      <section id="water-process" className="section section--dark water-viz">
        <div className="container">
          <div className="anim-fade-up">
            <span className="section-label" style={{ color: '#36D7F2' }}>Hydro-Dynamics</span>
            <h2 className="section-title">SEE THE WASHING PROCESS DIFFERENTLY.</h2>
            <p className="section-subtitle">
              An illustrative demonstration of water movement, droplet dispersion, and drum rotation. Toggle play/pause, reset, or switch between individual washing zones.
            </p>
          </div>

          <div className="anim-scale-in">
            <WaterVisualization />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         8. WASH MODE EXPLORER
         ══════════════════════════════════════════════════════ */}
      <section id="wash-modes" className="section wash-modes">
        <div className="container">
          <div className="anim-fade-up">
            <span className="section-label">Programme Library</span>
            <h2 className="section-title">A MODE FOR EVERY MOMENT.</h2>
            <p className="section-subtitle">
              Explore the available washing programmes. Choose any cycle to review temperature, spin speed, and duration specifications.
            </p>
          </div>

          <div className="wash-modes__grid">
            {WASH_MODES.map((mode, i) => (
              <TiltCard
                key={i}
                className={`mode-card anim-fade-up ${activeMode === i ? 'mode-card--active' : ''}`}
                onClick={() => setActiveMode(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveMode(i)}
                aria-pressed={activeMode === i}
                maxTilt={6}
              >
                <div className="mode-card__icon">{mode.icon}</div>
                <span className="gallery__card-meta">{mode.category}</span>
                <h3 className="mode-card__title">{mode.title}</h3>
                <p className="mode-card__desc">{mode.desc}</p>

                <div className="mode-card__meta">
                  <span className="mode-card__meta-item">🌡️ {mode.temp}</span>
                  <span className="mode-card__meta-item">⏱️ {mode.duration}</span>
                  <span className="mode-card__meta-item">🔄 {mode.spin}</span>
                </div>

                <span className="mode-card__learn-more">
                  {activeMode === i ? 'Selected Active Programme ✓' : 'Select Programme →'}
                </span>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         9. SPECIFICATIONS SECTION
         ══════════════════════════════════════════════════════ */}
      <section id="specs" className="section specs">
        <div className="container">
          <div className="anim-fade-up">
            <span className="section-label">Datasheet</span>
            <h2 className="section-title">DETAILS THAT MATTER.</h2>
            <p className="section-subtitle">
              Key engineering specifications for the Haier Triple Drum Washing Machine concept. Values marked with asterisks are subject to verification on official production sheets.
            </p>
          </div>

          <div className="specs__grid anim-fade-up">
            {SPECS.slice(0, 4).map((spec, i) => (
              <TiltCard key={i} className="spec-card" maxTilt={6}>
                <div className="spec-card__value">{spec.value}</div>
                <div className="spec-card__label">{spec.label}</div>
                {spec.note && <div className="spec-card__note">*{spec.note}</div>}
              </TiltCard>
            ))}
          </div>

          <div className="specs__table anim-fade-up">
            {SPECS.map((spec, i) => (
              <div key={i} className="specs__row">
                <span className="specs__row-label">{spec.label}</span>
                <span className="specs__row-value">
                  {spec.value}
                  {spec.note && <span style={{ fontSize: '0.72rem', color: '#94A3B8', marginLeft: 8 }}>*{spec.note}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         10. PRODUCT COMPARISON MATRIX
         ══════════════════════════════════════════════════════ */}
      <section id="comparison" className="section comparison">
        <div className="container">
          <div className="anim-fade-up">
            <span className="section-label">Solution Matrix</span>
            <h2 className="section-title">FIND THE RIGHT LAUNDRY SOLUTION.</h2>
            <p className="section-subtitle">
              Compare the Triple Drum architecture against verified Dual Drum and conventional Single Drum formats across capacity, hygiene, and washing efficiency.
            </p>
          </div>

          <ProductComparison />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         11. PRODUCT GALLERY
         ══════════════════════════════════════════════════════ */}
      <section id="gallery" className="section gallery">
        <div className="container">
          <div className="anim-fade-up">
            <span className="section-label">Visual Archive</span>
            <h2 className="section-title">A CLOSER LOOK.</h2>
            <p className="section-subtitle">
              Explore precision blueprints and conceptual renders. Click on any panel to open the interactive high-resolution lightbox with technical annotations.
            </p>
          </div>

          <ProductGallery />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         12. PRODUCT ENQUIRY / SHOWROOM CONTACT
         ══════════════════════════════════════════════════════ */}
      <section id="contact" className="section enquiry">
        <div className="container">
          <div className="anim-fade-up">
            <span className="section-label">Showroom Consultation</span>
            <h2 className="section-title">READY TO DISCOVER MORE?</h2>
            <p className="section-subtitle">
              Find out more about the Haier triple-drum washing machine and explore the details that matter to you.
            </p>
          </div>

          <div className="enquiry__content anim-fade-up">
            <div className="enquiry__info">
              <h3 className="enquiry__info-title">Product Consultation</h3>
              <p className="enquiry__info-desc">
                Submit your inquiry to request product specifications, showroom availability, or dealer demonstrations. Please note that this website is an independent conceptual showcase created for demonstration purposes.
              </p>

              <div className="enquiry__info-features">
                {[
                  'Technical Specification Datasheet',
                  'Triple Drum Zone Configuration Guide',
                  'Simultaneous Programme Compatibility',
                  'Showroom Demonstration Inquiries',
                  'Energy & Water Efficiency Verification',
                  'Installation & Cabinet Footprint Guidance',
                ].map((feat, i) => (
                  <div key={i} className="enquiry__feature">
                    <div className="enquiry__feature-icon">✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <MagneticButton
                  className="btn btn--primary"
                  onClick={() => document.getElementById('enquiry-form-element')?.scrollIntoView({ behavior: 'smooth' })}
                  strength={0.3}
                >
                  Request Product Information
                </MagneticButton>
                <MagneticButton
                  className="btn btn--secondary"
                  onClick={() => scrollToSection('specs')}
                  strength={0.3}
                >
                  Explore Specifications
                </MagneticButton>
              </div>
            </div>

            <div className="enquiry__form" id="enquiry-form-element">
              {formSubmitted ? (
                <div className="form__success">
                  <div className="form__success-icon">✓</div>
                  <h3 className="form__success-title">Enquiry Successfully Logged</h3>
                  <p className="form__success-desc">
                    Thank you, <strong>{formData.name}</strong>. Your enquiry regarding "{formData.interest || 'General Overview'}" has been processed. Note: As an independent conceptual prototype showcase, no external commercial data transmission has occurred.
                  </p>
                  <MagneticButton
                    className="btn btn--primary"
                    style={{ marginTop: 24 }}
                    onClick={() => {
                      setFormSubmitted(false)
                      setFormData({ name: '', email: '', phone: '', interest: '', message: '' })
                    }}
                  >
                    Submit Another Inquiry
                  </MagneticButton>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate>
                  <div className="form__group">
                    <label className="form__label" htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={`form__input ${formErrors.name ? 'form__input--error' : ''}`}
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Eleanor Vance"
                    />
                    {formErrors.name && <div className="form__error">{formErrors.name}</div>}
                  </div>

                  <div className="form__group">
                    <label className="form__label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form__input ${formErrors.email ? 'form__input--error' : ''}`}
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="e.g. eleanor@example.com"
                    />
                    {formErrors.email && <div className="form__error">{formErrors.email}</div>}
                  </div>

                  <div className="form__group">
                    <label className="form__label" htmlFor="phone">Phone Number (Optional)</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form__input"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+1 (555) 019-2834"
                    />
                  </div>

                  <div className="form__group">
                    <label className="form__label" htmlFor="interest">Area of Interest</label>
                    <select
                      id="interest"
                      name="interest"
                      className="form__select"
                      value={formData.interest}
                      onChange={handleFormChange}
                    >
                      <option value="">Select an inquiry topic</option>
                      <option value="Product Specifications">Product Specifications & Dimensions</option>
                      <option value="Drum Configuration">Triple Drum Multi-Cavity Architecture</option>
                      <option value="Washing Programmes">Parallel Washing Programmes</option>
                      <option value="Showroom Demonstration">Showroom Demonstration Inquiries</option>
                      <option value="Architectural Integration">Custom Laundry Suite Architectural Fit</option>
                    </select>
                  </div>

                  <div className="form__group">
                    <label className="form__label" htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className={`form__textarea ${formErrors.message ? 'form__input--error' : ''}`}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Tell us about your home requirements or technical questions..."
                    />
                    {formErrors.message && <div className="form__error">{formErrors.message}</div>}
                  </div>

                  <MagneticButton type="submit" className="btn btn--primary form__submit" strength={0.25}>
                    Submit Inquiry <span className="arrow">→</span>
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         13. FAQ SECTION
         ══════════════════════════════════════════════════════ */}
      <section className="section faq">
        <div className="container">
          <div className="anim-fade-up" style={{ textAlign: 'center' }}>
            <span className="section-label" style={{ justifyContent: 'center' }}>Knowledge Base</span>
            <h2 className="section-title">FREQUENTLY ASKED QUESTIONS.</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Essential answers regarding the triple-drum engineering concept, capacity, dimensions, and operational maintenance.
            </p>
          </div>

          <div className="faq__list" style={{ marginTop: 40 }}>
            {FAQ_DATA.map((item, i) => (
              <div key={i} className={`faq__item ${faqOpen === i ? 'faq__item--open' : ''}`}>
                <button
                  className="faq__question"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{item.q}</span>
                  <span className="faq__icon">{faqOpen === i ? '−' : '+'}</span>
                </button>
                <div className="faq__answer" id={`faq-answer-${i}`} role="region" aria-hidden={faqOpen !== i}>
                  <p className="faq__answer-text">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         14. FINAL CALL TO ACTION
         ══════════════════════════════════════════════════════ */}
      <section className="section final-cta">
        <div className="final-cta__bg" />
        <div className="container final-cta__content anim-fade-up">
          <h2 className="final-cta__title">A NEW PERSPECTIVE ON LAUNDRY.</h2>
          <p className="final-cta__desc">
            Explore the design, understand the technology, and discover a new way to experience modern laundry in your home.
          </p>

          <div className="final-cta__buttons">
            <MagneticButton
              className="btn btn--primary"
              onClick={() => scrollToSection('viewer-section')}
              strength={0.35}
            >
              Explore the Product <span className="arrow">→</span>
            </MagneticButton>

            <MagneticButton
              className="btn btn--white"
              onClick={() => scrollToSection('specs')}
              strength={0.35}
            >
              View Specifications <span className="arrow">→</span>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         15. FOOTER
         ══════════════════════════════════════════════════════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <span className="footer__logo">HAIER</span>
              <span className="footer__product-name">TRIPLE DRUM WASHING MACHINE</span>
            </div>

            <div className="footer__nav" role="navigation" aria-label="Footer navigation">
              {NAV_LINKS.map(({ id, label }) => (
                <button key={id} className="footer__link" onClick={() => scrollToSection(id)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="footer__bottom">
            <span className="footer__copy">© 2024–2026 Conceptual Appliance Showcase</span>
            <span className="footer__disclaimer">
              This is an independent conceptual product showcase created for demonstration purposes. It is not affiliated with, endorsed by, or an official website of Haier Group Corporation. All product features, capacities, and technical configurations are conceptual and subject to verified commercial specifications.
            </span>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════
         TECH DETAIL MODAL
         ══════════════════════════════════════════════════════ */}
      <div
        className={`modal-overlay ${techModal ? 'modal-overlay--open' : ''}`}
        onClick={() => setTechModal(null)}
        role="dialog"
        aria-modal="true"
        aria-label={techModal ? techModal.title : 'Technology Modal'}
      >
        {techModal && (
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>{techModal.icon}</div>
            <span className="gallery__card-meta" style={{ color: '#0077D9' }}>{techModal.category}</span>
            <h3 className="modal__title" style={{ marginTop: 6 }}>{techModal.title}</h3>
            <p className="modal__desc" style={{ marginTop: 14 }}>{techModal.details}</p>
            <p className="modal__desc" style={{ marginTop: 14, fontSize: '0.75rem', fontStyle: 'italic', color: '#94A3B8' }}>
              *Note: Feature implementation parameters may vary according to production model series.
            </p>
            <MagneticButton
              className="btn btn--primary"
              style={{ marginTop: 24 }}
              onClick={() => setTechModal(null)}
            >
              Close Details
            </MagneticButton>
          </div>
        )}
      </div>
    </>
  )
}
