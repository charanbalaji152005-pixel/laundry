import React, { useState } from 'react'
import TiltCard from './TiltCard'

const COMPARISON_CATEGORIES = [
  {
    category: 'Drum Architecture',
    features: [
      {
        name: 'Compartment Count',
        triple: '3 Dedicated Independent Drums',
        dual: '2 Staggered Drums',
        single: '1 Monolithic Drum',
        highlight: true,
      },
      {
        name: 'Simultaneous Washing',
        triple: 'Yes (Multi-cycle parallel washing)',
        dual: 'Yes (Dual-cycle washing)',
        single: 'No (Sequential cycles only)',
        highlight: true,
      },
      {
        name: 'Fabric Isolation',
        triple: 'Maximum (Baby care / Delicates / Normal separated)',
        dual: 'High (Upper/Lower separation)',
        single: 'Requires separate washing bags',
        highlight: false,
      },
    ],
  },
  {
    category: 'Capacity & Dimensions',
    features: [
      {
        name: 'Estimated Footprint',
        triple: '~600 × 680 × 850 mm',
        dual: '~600 × 600 × 1280 mm (Tower)',
        single: '~595 × 600 × 850 mm',
        highlight: false,
      },
      {
        name: 'Load Capacity Partition',
        triple: 'Primary Main + 2 Micro-Care Drums',
        dual: 'Upper 4kg + Lower 8-10kg',
        single: 'Single 8-12kg Drum',
        highlight: false,
      },
    ],
  },
  {
    category: 'Technology & Programmes',
    features: [
      {
        name: 'Motor Architecture',
        triple: 'Direct Motion Inverter (Brushless)',
        dual: 'Dual Inverter Motors',
        single: 'Direct Motion Inverter',
        highlight: false,
      },
      {
        name: 'Antibacterial Treatment (ABT)',
        triple: 'Gasket & Multi-Drawer Protection',
        dual: 'Door Gasket & Dispenser',
        single: 'Door Gasket',
        highlight: false,
      },
      {
        name: 'Smart IoT Connectivity',
        triple: 'Wi-Fi & Mobile App Ecosystem (Select models)',
        dual: 'hOn Smart App Integration',
        single: 'hOn Smart App Integration',
        highlight: false,
      },
      {
        name: 'Spin Speed',
        triple: 'Up to 1400 RPM (Model dependent)',
        dual: '1400 / 1200 RPM',
        single: '1400 - 1600 RPM',
        highlight: false,
      },
    ],
  },
]

export default function ProductComparison() {
  const [expandedCategories, setExpandedCategories] = useState({
    'Drum Architecture': true,
    'Capacity & Dimensions': true,
    'Technology & Programmes': true,
  })

  const [activeTab, setActiveTab] = useState('triple')

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  return (
    <div className="comparison-container">
      {/* Overview Cards with 3D Tilt */}
      <div className="comparison__highlight-cards">
        <TiltCard className="comparison-card comparison-card--featured" maxTilt={8}>
          <div className="comparison-card__badge">FEATURED CONCEPT</div>
          <div className="comparison-card__icon">🌀</div>
          <h3 className="comparison-card__title">Triple Drum Concept</h3>
          <p className="comparison-card__desc">
            Next-generation 3-cavity architecture designed for total laundry segregation, saving weekly wash time without cross-contamination.
          </p>
          <div className="comparison-card__stat">3 Washing Zones</div>
        </TiltCard>

        <TiltCard className="comparison-card" maxTilt={8}>
          <div className="comparison-card__badge comparison-card__badge--neutral">HAIER DUO SERIES</div>
          <div className="comparison-card__icon">⚖️</div>
          <h3 className="comparison-card__title">Dual Drum Reference</h3>
          <p className="comparison-card__desc">
            Verified two-drum tower configuration separating large garments from intimate apparel and fine silks.
          </p>
          <div className="comparison-card__stat">2 Washing Zones</div>
        </TiltCard>

        <TiltCard className="comparison-card" maxTilt={8}>
          <div className="comparison-card__badge comparison-card__badge--neutral">CONVENTIONAL</div>
          <div className="comparison-card__icon">⚪</div>
          <h3 className="comparison-card__title">Standard Single Drum</h3>
          <p className="comparison-card__desc">
            Traditional high-capacity front-loader requiring consecutive loads for colour sorting and gentle garments.
          </p>
          <div className="comparison-card__stat">1 Washing Zone</div>
        </TiltCard>
      </div>

      {/* Mobile Configuration Selector */}
      <div className="comparison__mobile-tabs">
        <button
          className={`comparison__mobile-tab ${activeTab === 'triple' ? 'comparison__mobile-tab--active' : ''}`}
          onClick={() => setActiveTab('triple')}
        >
          Triple Drum
        </button>
        <button
          className={`comparison__mobile-tab ${activeTab === 'dual' ? 'comparison__mobile-tab--active' : ''}`}
          onClick={() => setActiveTab('dual')}
        >
          Dual Drum
        </button>
        <button
          className={`comparison__mobile-tab ${activeTab === 'single' ? 'comparison__mobile-tab--active' : ''}`}
          onClick={() => setActiveTab('single')}
        >
          Single Drum
        </button>
      </div>

      {/* Expandable Technical Specification Matrix */}
      <div className="comparison__table-wrapper anim-fade-up">
        <div className="comparison__table-header">
          <div className="comparison__col comparison__col--feature">Specification Category</div>
          <div className={`comparison__col comparison__col--model ${activeTab === 'triple' ? 'comparison__col--active' : ''}`}>
            <strong>Triple Drum Concept</strong>
            <span className="comparison__col-sub">Flagship Showcase</span>
          </div>
          <div className={`comparison__col comparison__col--model ${activeTab === 'dual' ? 'comparison__col--active' : ''}`}>
            <strong>Dual Drum Reference</strong>
            <span className="comparison__col-sub">Haier Duo Series</span>
          </div>
          <div className={`comparison__col comparison__col--model ${activeTab === 'single' ? 'comparison__col--active' : ''}`}>
            <strong>Single Drum Front-Loader</strong>
            <span className="comparison__col-sub">Traditional Model</span>
          </div>
        </div>

        {COMPARISON_CATEGORIES.map((catGroup) => {
          const isExpanded = expandedCategories[catGroup.category]

          return (
            <div key={catGroup.category} className="comparison__category-group">
              <button
                type="button"
                className="comparison__category-toggle"
                onClick={() => toggleCategory(catGroup.category)}
                aria-expanded={isExpanded}
              >
                <span>{catGroup.category}</span>
                <span className="comparison__toggle-icon">{isExpanded ? '−' : '+'}</span>
              </button>

              {isExpanded && (
                <div className="comparison__rows">
                  {catGroup.features.map((feat, idx) => (
                    <div key={idx} className={`comparison__row ${feat.highlight ? 'comparison__row--highlight' : ''}`}>
                      <div className="comparison__cell comparison__cell--feature">
                        {feat.name}
                      </div>
                      <div className={`comparison__cell comparison__cell--val ${activeTab === 'triple' ? 'comparison__cell--active' : ''}`}>
                        <span className="comparison__cell-badge">Triple: </span>
                        {feat.triple}
                      </div>
                      <div className={`comparison__cell comparison__cell--val ${activeTab === 'dual' ? 'comparison__cell--active' : ''}`}>
                        <span className="comparison__cell-badge">Dual: </span>
                        {feat.dual}
                      </div>
                      <div className={`comparison__cell comparison__cell--val ${activeTab === 'single' ? 'comparison__cell--active' : ''}`}>
                        <span className="comparison__cell-badge">Single: </span>
                        {feat.single}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="comparison__disclaimer">
        *Note: The Triple Drum configuration is presented as an advanced conceptual showcase. Dual Drum and Single Drum specifications are derived from standard Haier product benchmarks. Verification with official datasheets is recommended.
      </div>
    </div>
  )
}
