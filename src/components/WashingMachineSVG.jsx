import React from 'react'

/**
 * Ultra-detailed SVG illustration of the Haier Triple Drum Washing Machine.
 * Supports multiple cinematic angles: 'hero'/'front', 'side', 'rear', 'top', 'detail', 'xray', and 'drums-only'.
 * Conceptual illustration distinguishing proposed visualisations from verified product features.
 */
export default function WashingMachineSVG({ 
  width = '100%', 
  height = '100%', 
  activeDrum = 1,
  variant = 'hero',
  className = '',
  hotspot = null
}) {
  const drumColors = {
    1: activeDrum === 1 ? '#0077D9' : '#8BA4BC',
    2: activeDrum === 2 ? '#36D7F2' : '#8BA4BC',
    3: activeDrum === 3 ? '#00A3FF' : '#8BA4BC',
  }

  const glowOpacity = (drum) => activeDrum === drum ? 0.45 : 0.05

  // ─────────────────────────────────────────────────────────────
  // 1. DRUMS-ONLY CUTAWAY
  // ─────────────────────────────────────────────────────────────
  if (variant === 'drums-only') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420" width={width} height={height} className={className} role="img" aria-label="Haier Triple Drum configuration cutaway illustration">
        <defs>
          <radialGradient id="glowD1" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#0077D9" stopOpacity={glowOpacity(1)} />
            <stop offset="100%" stopColor="#0077D9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowD2" cx="30%" cy="75%" r="45%">
            <stop offset="0%" stopColor="#36D7F2" stopOpacity={glowOpacity(2)} />
            <stop offset="100%" stopColor="#36D7F2" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowD3" cx="70%" cy="75%" r="45%">
            <stop offset="0%" stopColor="#00A3FF" stopOpacity={glowOpacity(3)} />
            <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="drumRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#334155" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="steelInner" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>

        {/* Outer casing silhouette watermark */}
        <rect x="30" y="20" width="360" height="380" rx="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="6 6" />

        {/* Ambient Glows */}
        <circle cx="210" cy="135" r="140" fill="url(#glowD1)" />
        <circle cx="130" cy="285" r="120" fill="url(#glowD2)" />
        <circle cx="290" cy="285" r="120" fill="url(#glowD3)" />

        {/* Inter-drum synchronization conduits */}
        <path d="M 210 195 L 155 245" stroke="rgba(54, 215, 242, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 210 195 L 265 245" stroke="rgba(54, 215, 242, 0.3)" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 175 285 L 245 285" stroke="rgba(54, 215, 242, 0.3)" strokeWidth="2" strokeDasharray="4 4" />

        {/* ── DRUM 01: Top Center (Primary Large Cavity) ── */}
        <g style={{ transition: 'all 0.4s ease', transformOrigin: '210px 135px', transform: activeDrum === 1 ? 'scale(1.04)' : 'scale(1)' }}>
          <circle cx="210" cy="135" r="82" fill="url(#steelInner)" stroke="url(#drumRimGrad)" strokeWidth="3" />
          <circle cx="210" cy="135" r="76" fill="none" stroke={drumColors[1]} strokeWidth={activeDrum === 1 ? '3' : '1.5'} opacity={activeDrum === 1 ? 1 : 0.6} />
          <circle cx="210" cy="135" r="62" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="210" cy="135" r="46" fill="none" stroke={drumColors[1]} strokeWidth="1" opacity="0.4" />
          <circle cx="210" cy="135" r="16" fill="rgba(0,119,217,0.2)" stroke={drumColors[1]} strokeWidth="1.5" />
          {/* Perforations */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <circle key={`p1-${deg}`} cx={210 + Math.cos(deg * Math.PI / 180) * 54} cy={135 + Math.sin(deg * Math.PI / 180) * 54} r="2.5" fill={drumColors[1]} opacity={activeDrum === 1 ? 0.8 : 0.3} />
          ))}
          <text x="210" y="130" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="'Outfit', sans-serif" fontWeight="800" letterSpacing="1.5">DRUM 01</text>
          <text x="210" y="145" textAnchor="middle" fill={drumColors[1]} fontSize="8" fontFamily="'Inter', sans-serif" fontWeight="600" letterSpacing="1">PRIMARY</text>
        </g>

        {/* ── DRUM 02: Bottom-Left (Dedicated Care Cavity) ── */}
        <g style={{ transition: 'all 0.4s ease', transformOrigin: '130px 285px', transform: activeDrum === 2 ? 'scale(1.05)' : 'scale(1)' }}>
          <circle cx="130" cy="285" r="68" fill="url(#steelInner)" stroke="url(#drumRimGrad)" strokeWidth="3" />
          <circle cx="130" cy="285" r="62" fill="none" stroke={drumColors[2]} strokeWidth={activeDrum === 2 ? '3' : '1.5'} opacity={activeDrum === 2 ? 1 : 0.6} />
          <circle cx="130" cy="285" r="48" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="130" cy="285" r="34" fill="none" stroke={drumColors[2]} strokeWidth="1" opacity="0.4" />
          <circle cx="130" cy="285" r="14" fill="rgba(54,215,242,0.2)" stroke={drumColors[2]} strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <circle key={`p2-${deg}`} cx={130 + Math.cos(deg * Math.PI / 180) * 42} cy={285 + Math.sin(deg * Math.PI / 180) * 42} r="2.2" fill={drumColors[2]} opacity={activeDrum === 2 ? 0.9 : 0.3} />
          ))}
          <text x="130" y="280" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="'Outfit', sans-serif" fontWeight="800" letterSpacing="1.2">DRUM 02</text>
          <text x="130" y="294" textAnchor="middle" fill={drumColors[2]} fontSize="7.5" fontFamily="'Inter', sans-serif" fontWeight="600" letterSpacing="1">DELICATES</text>
        </g>

        {/* ── DRUM 03: Bottom-Right (Quick Refresh Cavity) ── */}
        <g style={{ transition: 'all 0.4s ease', transformOrigin: '290px 285px', transform: activeDrum === 3 ? 'scale(1.05)' : 'scale(1)' }}>
          <circle cx="290" cy="285" r="68" fill="url(#steelInner)" stroke="url(#drumRimGrad)" strokeWidth="3" />
          <circle cx="290" cy="285" r="62" fill="none" stroke={drumColors[3]} strokeWidth={activeDrum === 3 ? '3' : '1.5'} opacity={activeDrum === 3 ? 1 : 0.6} />
          <circle cx="290" cy="285" r="48" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="290" cy="285" r="34" fill="none" stroke={drumColors[3]} strokeWidth="1" opacity="0.4" />
          <circle cx="290" cy="285" r="14" fill="rgba(0,163,255,0.2)" stroke={drumColors[3]} strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <circle key={`p3-${deg}`} cx={290 + Math.cos(deg * Math.PI / 180) * 42} cy={285 + Math.sin(deg * Math.PI / 180) * 42} r="2.2" fill={drumColors[3]} opacity={activeDrum === 3 ? 0.9 : 0.3} />
          ))}
          <text x="290" y="280" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="'Outfit', sans-serif" fontWeight="800" letterSpacing="1.2">DRUM 03</text>
          <text x="290" y="294" textAnchor="middle" fill={drumColors[3]} fontSize="7.5" fontFamily="'Inter', sans-serif" fontWeight="600" letterSpacing="1">REFRESH</text>
        </g>
      </svg>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // 2. REAR VIEW (Engineering / Plumbing / Electrical)
  // ─────────────────────────────────────────────────────────────
  if (variant === 'rear') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480" width={width} height={height} className={className} role="img" aria-label="Haier Triple Drum Rear View Blueprint">
        <defs>
          <linearGradient id="rearChassis" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="hoseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="hotHoseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
        </defs>

        {/* Floor drop shadow */}
        <ellipse cx="180" cy="465" rx="130" ry="14" fill="rgba(0,0,0,0.18)" />

        {/* Rear Sheet Metal Cabinet */}
        <rect x="40" y="30" width="280" height="425" rx="12" fill="url(#rearChassis)" stroke="#475569" strokeWidth="2" />
        
        {/* Recessed Service Panel */}
        <rect x="65" y="70" width="230" height="330" rx="8" fill="#475569" stroke="#334155" strokeWidth="1.5" />
        
        {/* Anti-vibration Stiffening Ribs (Cross-brace emboss) */}
        <line x1="75" y1="80" x2="285" y2="390" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
        <line x1="75" y1="80" x2="285" y2="390" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
        <line x1="285" y1="80" x2="75" y2="390" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
        <line x1="285" y1="80" x2="75" y2="390" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />

        {/* Cold Water Inlet Valve (Top Right) */}
        <g id="water-inlet-cold">
          <circle cx="265" cy="55" r="14" fill="#1E293B" stroke="#0077D9" strokeWidth="2.5" />
          <circle cx="265" cy="55" r="8" fill="#0077D9" />
          <path d="M 265 55 Q 295 90 285 240" fill="none" stroke="url(#hoseGrad)" strokeWidth="6" strokeLinecap="round" />
          <text x="265" y="40" textAnchor="middle" fill="#0077D9" fontSize="7" fontFamily="'Outfit', sans-serif" fontWeight="700">COLD INLET</text>
        </g>

        {/* Hot Water Inlet Valve (Top Left) */}
        <g id="water-inlet-hot">
          <circle cx="95" cy="55" r="14" fill="#1E293B" stroke="#EF4444" strokeWidth="2.5" />
          <circle cx="95" cy="55" r="8" fill="#EF4444" />
          <text x="95" y="40" textAnchor="middle" fill="#EF4444" fontSize="7" fontFamily="'Outfit', sans-serif" fontWeight="700">HOT INLET</text>
        </g>

        {/* 4 Heavy-Duty Transit Shipping Bolts */}
        {[
          { x: 95, y: 130 },
          { x: 265, y: 130 },
          { x: 95, y: 310 },
          { x: 265, y: 310 }
        ].map((bolt, i) => (
          <g key={`bolt-${i}`}>
            <circle cx={bolt.x} cy={bolt.y} r="12" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
            <polygon points={`${bolt.x},${bolt.y-6} ${bolt.x+5},${bolt.y-3} ${bolt.x+5},${bolt.y+3} ${bolt.x},${bolt.y+6} ${bolt.x-5},${bolt.y+3} ${bolt.x-5},${bolt.y-3}`} fill="#64748B" />
          </g>
        ))}
        <text x="180" y="134" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="'Inter', sans-serif">TRANSIT BOLT MOUNTINGS (REMOVE BEFORE USE)</text>

        {/* Drainage Outlet Pipe (Bottom Left) */}
        <g id="drainage-connection">
          <rect x="75" y="410" width="30" height="24" rx="4" fill="#1E293B" stroke="#36D7F2" strokeWidth="2" />
          <path d="M 90 434 C 90 455 130 450 160 455" fill="none" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
          <text x="90" y="405" textAnchor="middle" fill="#36D7F2" fontSize="7" fontFamily="'Outfit', sans-serif" fontWeight="700">DRAIN HOSE</text>
        </g>

        {/* Grounding & Electrical Lead (Bottom Right) */}
        <g>
          <circle cx="270" cy="420" r="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M 270 428 Q 285 450 310 455" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <text x="270" y="410" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="'Inter', sans-serif">AC POWER</text>
        </g>

        {/* Compliance & Technical Spec Plate */}
        <rect x="130" y="215" width="100" height="50" rx="3" fill="#0F172A" stroke="#94A3B8" strokeWidth="1" />
        <text x="180" y="228" textAnchor="middle" fill="#F8FAFC" fontSize="7.5" fontFamily="'Outfit', sans-serif" fontWeight="800">HAIER APPLIANCE</text>
        <text x="180" y="238" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontFamily="'Inter', monospace">TRIPLE DRUM · 220-240V ~ 50Hz</text>
        <text x="180" y="248" textAnchor="middle" fill="#94A3B8" fontSize="6" fontFamily="'Inter', sans-serif">IPX4 WATER RESISTANT</text>
        <text x="180" y="258" textAnchor="middle" fill="#94A3B8" fontSize="5.5" fontFamily="'Inter', sans-serif">MADE FOR NEXT-GEN LAUNDRY</text>

        {/* Adjustable Leveling Feet */}
        <rect x="60" y="455" width="26" height="12" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
        <rect x="274" y="455" width="26" height="12" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
      </svg>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // 3. SIDE VIEW (Profile / Acoustic Stiffening / Footprint)
  // ─────────────────────────────────────────────────────────────
  if (variant === 'side') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480" width={width} height={height} className={className} role="img" aria-label="Haier Triple Drum Side Profile">
        <defs>
          <linearGradient id="sideChassis" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="85%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="panelIndent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DDE6EF" />
            <stop offset="100%" stopColor="#BCCCDC" />
          </linearGradient>
        </defs>

        <ellipse cx="180" cy="465" rx="125" ry="12" fill="rgba(0,0,0,0.14)" />

        {/* Main Cabinet Profile */}
        <rect x="55" y="30" width="250" height="425" rx="14" fill="url(#sideChassis)" stroke="#CBD5E1" strokeWidth="1.5" />
        
        {/* Door Convex Bulge on the Front (Left side) */}
        <path d="M 55 140 C 35 180 35 300 55 340 Z" fill="#94A3B8" opacity="0.6" />
        <path d="M 55 150 C 40 185 40 295 55 330 Z" fill="#0077D9" opacity="0.4" />

        {/* Patented Wave Vibration-Absorbing Side Embossing */}
        <g stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none">
          <ellipse cx="180" cy="245" rx="85" ry="125" stroke="url(#panelIndent)" strokeWidth="4" />
          <ellipse cx="180" cy="245" rx="65" ry="95" stroke="url(#panelIndent)" strokeWidth="3" />
          <ellipse cx="180" cy="245" rx="45" ry="65" stroke="url(#panelIndent)" strokeWidth="2" />
        </g>

        {/* Dimensional Annotation Lines */}
        <g stroke="#0077D9" strokeWidth="1" strokeDasharray="3 3">
          <line x1="55" y1="20" x2="305" y2="20" />
          <line x1="55" y1="15" x2="55" y2="25" />
          <line x1="305" y1="15" x2="305" y2="25" />
        </g>
        <text x="180" y="16" textAnchor="middle" fill="#0077D9" fontSize="8" fontFamily="'Outfit', sans-serif" fontWeight="700">DEPTH: ~680 mm</text>

        {/* Feet */}
        <rect x="75" y="455" width="24" height="10" rx="3" fill="#64748B" />
        <rect x="260" y="455" width="24" height="10" rx="3" fill="#64748B" />

        {/* Label */}
        <text x="180" y="245" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="'Outfit', sans-serif" fontWeight="700" letterSpacing="1">ANTI-VIBRATION ARCHITECTURE</text>
        <text x="180" y="260" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="'Inter', sans-serif">ACOUSTIC DAMPENING CHASSIS</text>
      </svg>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // 4. TOP VIEW (Touch Surface / Detergent Access / Profile)
  // ─────────────────────────────────────────────────────────────
  if (variant === 'top') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480" width={width} height={height} className={className} role="img" aria-label="Haier Triple Drum Top View">
        <defs>
          <linearGradient id="topSurface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="doorLip" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0077D9" />
            <stop offset="100%" stopColor="#36D7F2" />
          </linearGradient>
        </defs>

        {/* Base shadow */}
        <rect x="35" y="70" width="290" height="340" rx="20" fill="rgba(0,0,0,0.12)" filter="blur(10px)" />

        {/* Tempered Glass / Brushed Countertop */}
        <rect x="35" y="60" width="290" height="340" rx="16" fill="url(#topSurface)" stroke="#CBD5E1" strokeWidth="2" />
        
        {/* Beveled Edge Highlight */}
        <rect x="42" y="67" width="276" height="326" rx="12" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />

        {/* Front Door Rim Curvature Projection */}
        <path d="M 70 60 Q 180 30 290 60" fill="none" stroke="url(#doorLip)" strokeWidth="4" />
        <text x="180" y="50" textAnchor="middle" fill="#0077D9" fontSize="8" fontFamily="'Outfit', sans-serif" fontWeight="700">FRONT FASCIA CURVATURE</text>

        {/* Smart Touch Top Sensor Strip */}
        <rect x="65" y="85" width="230" height="35" rx="6" fill="#0F172A" />
        <circle cx="90" cy="102" r="6" fill="#0077D9" />
        <circle cx="115" cy="102" r="5" fill="#36D7F2" opacity="0.8" />
        <rect x="135" y="98" width="80" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
        <text x="260" y="105" textAnchor="middle" fill="#38BDF8" fontSize="8" fontFamily="'Outfit', sans-serif" fontWeight="700">NFC TAP</text>

        {/* Flat Appliance Utility Workspace */}
        <rect x="65" y="145" width="230" height="230" rx="8" fill="rgba(0,119,217,0.03)" stroke="rgba(0,119,217,0.12)" strokeWidth="1" strokeDasharray="4 4" />
        <text x="180" y="250" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="'Outfit', sans-serif" fontWeight="700">FLAT UTILITY SURFACE</text>
        <text x="180" y="268" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="'Inter', sans-serif">PREMIUM ANTI-SCRATCH COATING</text>
      </svg>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // 5. DETAIL VIEW (Macro Zoom on Drum Seals, Dial & Door)
  // ─────────────────────────────────────────────────────────────
  if (variant === 'detail') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480" width={width} height={height} className={className} role="img" aria-label="Haier Triple Drum Precision Detail Macro">
        <defs>
          <linearGradient id="macroMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="cyanNeon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#36D7F2" />
            <stop offset="100%" stopColor="#0077D9" />
          </linearGradient>
        </defs>

        {/* Dark Macro Studio Background */}
        <rect x="0" y="0" width="360" height="480" rx="16" fill="#07111F" />
        <circle cx="180" cy="240" r="180" fill="radial-gradient(circle, rgba(0,119,217,0.2) 0%, transparent 70%)" />

        {/* Massive Zoomed-in Gasket & Door Bezel */}
        <circle cx="180" cy="240" r="160" fill="none" stroke="url(#macroMetal)" strokeWidth="18" />
        <circle cx="180" cy="240" r="142" fill="none" stroke="#0077D9" strokeWidth="2" />
        
        {/* Antibacterial Blue Seal Ring (ABT) */}
        <circle cx="180" cy="240" r="136" fill="none" stroke="#36D7F2" strokeWidth="6" strokeDasharray="12 4" opacity="0.8" />
        
        {/* Diamond Drum Stainless Steel Wall Texture */}
        <g opacity="0.6">
          {[-80, -40, 0, 40, 80].map((dx) =>
            [-80, -40, 0, 40, 80].map((dy) => (
              <polygon key={`dia-${dx}-${dy}`} points={`${180+dx},${240+dy-10} ${180+dx+10},${240+dy} ${180+dx},${240+dy+10} ${180+dx-10},${240+dy}`} fill="none" stroke="#94A3B8" strokeWidth="1" />
            ))
          )}
        </g>

        {/* Center Glowing Hub */}
        <circle cx="180" cy="240" r="45" fill="#0F172A" stroke="url(#cyanNeon)" strokeWidth="3" />
        <circle cx="180" cy="240" r="12" fill="#36D7F2" />
        
        {/* Macro Tech Callout */}
        <rect x="40" y="40" width="280" height="46" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="55" y="60" fill="#36D7F2" fontSize="9" fontFamily="'Outfit', sans-serif" fontWeight="800">ABT® ANTIBACTERIAL GASKET</text>
        <text x="55" y="74" fill="#94A3B8" fontSize="7.5" fontFamily="'Inter', sans-serif">Laser-welded seamless drum with 99.9% bacteria elimination seal</text>
      </svg>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // 6. HERO / FRONT VIEW (Flagship Product Showcase)
  // ─────────────────────────────────────────────────────────────
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 480" width={width} height={height} className={className} role="img" aria-label="Haier Triple Drum Washing Machine conceptual illustration">
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#F1F5F9" />
          <stop offset="70%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="panelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B132B" />
          <stop offset="100%" stopColor="#040814" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0077D9" />
          <stop offset="100%" stopColor="#36D7F2" />
        </linearGradient>
        <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="70%" stopColor="rgba(0,119,217,0.1)" />
          <stop offset="100%" stopColor="rgba(54,215,242,0.2)" />
        </linearGradient>
        <linearGradient id="doorBezel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#94A3B8" />
          <stop offset="70%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0077D9" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#36D7F2" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </radialGradient>
        <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0F172A" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Realistic floor shadow */}
      <ellipse cx="180" cy="466" rx="135" ry="14" fill="rgba(15,23,42,0.18)" filter="blur(4px)" />

      {/* Main Cabinet */}
      <rect x="40" y="30" width="280" height="428" rx="18" fill="url(#bodyGrad)" filter="url(#softShadow)" stroke="#E2E8F0" strokeWidth="1" />
      
      {/* Top Edge Metallic Accent */}
      <path d="M 40 46 Q 40 30 56 30 L 304 30 Q 320 30 320 46" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />

      {/* Sleek Side Seams */}
      <line x1="43" y1="35" x2="43" y2="455" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      <line x1="317" y1="35" x2="317" y2="455" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />

      {/* ── CONTROL FASCIA PANEL ── */}
      <rect x="52" y="44" width="256" height="66" rx="10" fill="url(#panelGrad)" stroke="#1E293B" strokeWidth="1.5" />
      
      {/* Dynamic Digital Display Screen */}
      <rect x="66" y="54" width="105" height="46" rx="6" fill="#030712" stroke="#1E293B" strokeWidth="1" />
      <text x="76" y="70" fill="#36D7F2" fontSize="7" fontFamily="'Outfit', monospace" fontWeight="700" letterSpacing="1">CYCLE ACTIVE</text>
      <text x="76" y="86" fill="#FFFFFF" fontSize="14" fontFamily="'Outfit', sans-serif" fontWeight="800" letterSpacing="0.5">00:42</text>
      <text x="126" y="86" fill="#38BDF8" fontSize="8" fontFamily="'Inter', monospace">1400 RPM</text>
      {/* Live cycle progress bar */}
      <rect x="76" y="92" width="85" height="2" rx="1" fill="#1E293B" />
      <rect x="76" y="92" width="55" height="2" rx="1" fill="url(#accentGrad)" />

      {/* Tactile Rotary Jog-Dial */}
      <g>
        <circle cx="212" cy="77" r="22" fill="#0F172A" stroke="#334155" strokeWidth="2" />
        <circle cx="212" cy="77" r="18" fill="url(#panelGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="212" cy="77" r="14" fill="none" stroke="#0077D9" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Indicator Notch */}
        <rect x="210.5" y="58" width="3" height="7" rx="1.5" fill="#36D7F2" />
        <circle cx="212" cy="77" r="4" fill="#0077D9" />
      </g>

      {/* Sensor Touch Action Buttons */}
      <circle cx="260" cy="67" r="6" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <path d="M 258 64 L 263 67 L 258 70 Z" fill="#36D7F2" />
      
      <circle cx="282" cy="67" r="6" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <circle cx="282" cy="67" r="2" fill="#EF4444" />
      
      {/* Program icons row */}
      <circle cx="250" cy="88" r="2" fill="#0077D9" />
      <circle cx="262" cy="88" r="2" fill="#36D7F2" />
      <circle cx="274" cy="88" r="2" fill="#38BDF8" />
      <circle cx="286" cy="88" r="2" fill="#94A3B8" />

      {/* Accent strip separator */}
      <rect x="52" y="112" width="256" height="2" fill="url(#accentGrad)" opacity="0.8" />

      {/* ── THE TRIPLE DRUM MULTI-ZONE PORTAL DOOR ── */}
      {/* Outer Door Chrome Bezel */}
      <circle cx="180" cy="245" r="112" fill="url(#doorBezel)" filter="url(#softShadow)" />
      
      {/* Glossy Black Transition Ring */}
      <circle cx="180" cy="245" r="102" fill="#030712" />

      {/* Antibacterial Blue Gasket Ring (ABT) */}
      <circle cx="180" cy="245" r="98" fill="none" stroke="#0077D9" strokeWidth="3" opacity="0.8" />

      {/* Dark Transparent Smoked Glass Chamber */}
      <circle cx="180" cy="245" r="95" fill="url(#portalGlow)" />

      {/* ── 3 DISTINCT WASHING DRUMS VISIBLE INSIDE ── */}

      {/* DRUM 01: Top Center (Primary Drum) */}
      <g style={{ transition: 'all 0.3s ease' }}>
        <circle cx="180" cy="200" r="38" fill="none" stroke={drumColors[1]} strokeWidth={activeDrum === 1 ? '2.5' : '1.5'} />
        <circle cx="180" cy="200" r="33" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="180" cy="200" r="24" fill="none" stroke={drumColors[1]} strokeWidth="0.8" opacity="0.6" />
        <circle cx="180" cy="200" r="7" fill={drumColors[1]} opacity={activeDrum === 1 ? 0.7 : 0.3} />
        {/* Pulsator Fins */}
        <line x1="180" y1="178" x2="180" y2="222" stroke={drumColors[1]} strokeWidth="1.5" opacity="0.6" />
        <line x1="158" y1="200" x2="202" y2="200" stroke={drumColors[1]} strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* DRUM 02: Bottom-Left (Dedicated Care Drum) */}
      <g style={{ transition: 'all 0.3s ease' }}>
        <circle cx="150" cy="275" r="32" fill="none" stroke={drumColors[2]} strokeWidth={activeDrum === 2 ? '2.5' : '1.5'} />
        <circle cx="150" cy="275" r="27" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="150" cy="275" r="19" fill="none" stroke={drumColors[2]} strokeWidth="0.8" opacity="0.6" />
        <circle cx="150" cy="275" r="6" fill={drumColors[2]} opacity={activeDrum === 2 ? 0.7 : 0.3} />
        <line x1="150" y1="257" x2="150" y2="293" stroke={drumColors[2]} strokeWidth="1.5" opacity="0.6" />
        <line x1="132" y1="275" x2="168" y2="275" stroke={drumColors[2]} strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* DRUM 03: Bottom-Right (Quick Refresh Drum) */}
      <g style={{ transition: 'all 0.3s ease' }}>
        <circle cx="210" cy="275" r="32" fill="none" stroke={drumColors[3]} strokeWidth={activeDrum === 3 ? '2.5' : '1.5'} />
        <circle cx="210" cy="275" r="27" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="210" cy="275" r="19" fill="none" stroke={drumColors[3]} strokeWidth="0.8" opacity="0.6" />
        <circle cx="210" cy="275" r="6" fill={drumColors[3]} opacity={activeDrum === 3 ? 0.7 : 0.3} />
        <line x1="210" y1="257" x2="210" y2="293" stroke={drumColors[3]} strokeWidth="1.5" opacity="0.6" />
        <line x1="192" y1="275" x2="228" y2="275" stroke={drumColors[3]} strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* Glass Diagonal Curved Specular Highlight Reflection */}
      <path d="M 115 170 Q 180 140 245 170 Q 230 290 140 310 Q 110 240 115 170 Z" fill="url(#glassReflection)" pointerEvents="none" />

      {/* Precision Concealed Door Handle */}
      <path d="M 278 226 Q 288 245 278 264" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <path d="M 276 228 Q 285 245 276 262" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

      {/* ── LOWER SECTION: SMART AUTO-DOSING DETERGENT DRAWER ── */}
      <rect x="62" y="380" width="236" height="34" rx="6" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
      <rect x="70" y="387" width="65" height="20" rx="4" fill="#CBD5E1" />
      <line x1="74" y1="397" x2="90" y2="397" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <text x="100" y="399" fill="#64748B" fontSize="6.5" fontFamily="'Outfit', sans-serif" fontWeight="700">PULL</text>
      <text x="210" y="401" textAnchor="middle" fill="#94A3B8" fontSize="7" fontFamily="'Inter', sans-serif" letterSpacing="0.8">AUTO-DOSING COMPARTMENT</text>

      {/* Chrome Haier Wordmark & Sub-Label */}
      <text x="180" y="434" textAnchor="middle" fontSize="13" fill="#0A1F3F" fontFamily="'Outfit', sans-serif" fontWeight="900" letterSpacing="4.5">HAIER</text>
      <text x="180" y="446" textAnchor="middle" fontSize="6" fill="#0077D9" fontFamily="'Outfit', sans-serif" fontWeight="700" letterSpacing="2.5">TRIPLE DRUM INNOVATION</text>

      {/* Premium Metallic Feet */}
      <rect x="65" y="456" width="22" height="8" rx="3" fill="#475569" stroke="#334155" strokeWidth="1" />
      <rect x="273" y="456" width="22" height="8" rx="3" fill="#475569" stroke="#334155" strokeWidth="1" />
    </svg>
  )
}
