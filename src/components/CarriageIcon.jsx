const CarriageIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 340 180"
    className={className}
    aria-label="Carruaje dorado con caballo"
  >
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#F5D87A" />
        <stop offset="35%"  stopColor="#D4A017" />
        <stop offset="70%"  stopColor="#A67C00" />
        <stop offset="100%" stopColor="#7B5800" />
      </linearGradient>
      <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stopColor="#F5D87A" />
        <stop offset="60%"  stopColor="#C8960C" />
        <stop offset="100%" stopColor="#8B6000" />
      </linearGradient>
    </defs>

    {/* ── HORSE (realistic silhouette) ── */}
    {/* Full horse body path */}
    <path d="
      M 240 110
      Q 235 95 238 82
      Q 242 70 250 60
      Q 256 52 265 48
      Q 272 44 278 42
      Q 286 39 292 43
      Q 298 47 295 56
      Q 292 63 285 68
      Q 280 72 280 78
      Q 280 85 283 90
      Q 290 100 295 108
      Q 298 114 295 118
      Q 290 122 285 118
      Q 280 112 276 108
      Q 270 102 262 100
      Q 252 98 240 110 Z
    " fill="url(#goldGrad)" />

    {/* Horse Neck */}
    <path d="
      M 250 60
      Q 252 48 258 42
      Q 264 36 272 34
      Q 280 32 285 38
      Q 290 44 285 52
      Q 280 58 272 62
      Q 262 66 250 60 Z
    " fill="url(#goldGrad)" />

    {/* Horse Head */}
    <path d="
      M 270 34
      Q 274 28 280 24
      Q 286 20 292 22
      Q 300 24 302 32
      Q 304 40 296 43
      Q 290 45 284 42
      Q 278 38 270 34 Z
    " fill="url(#goldGrad)" />

    {/* Nose / muzzle */}
    <path d="
      M 296 32
      Q 306 28 310 34
      Q 312 40 306 44
      Q 300 47 296 43 Z
    " fill="url(#goldGrad)" />

    {/* Ear */}
    <path d="M 282 22 L 284 12 L 290 18 Z" fill="url(#goldGrad)" />

    {/* Eye */}
    <circle cx="298" cy="30" r="2" fill="#7B5800" />

    {/* Mane */}
    <path d="M 274 30 Q 268 25 264 30 Q 268 36 272 34 M 270 38 Q 264 34 260 40 Q 265 45 268 42"
          stroke="#A67C00" strokeWidth="2" fill="none" strokeLinecap="round"/>

    {/* Horse Back / Rump (extended body) */}
    <path d="
      M 240 110
      Q 232 108 224 100
      Q 218 92 220 84
      Q 224 76 232 75
      Q 242 74 250 80
      Q 256 86 252 96
      Q 248 104 240 110 Z
    " fill="url(#goldGrad)" />

    {/* Back rump bump */}
    <path d="
      M 220 84
      Q 216 78 218 70
      Q 222 65 228 68
      Q 234 72 232 80
      Q 228 84 220 84 Z
    " fill="url(#goldGrad)" />

    {/* Tail */}
    <path d="M 220 78 Q 208 72 204 82 Q 202 90 208 96 Q 215 100 220 94"
          stroke="url(#goldGrad)" strokeWidth="5" fill="none" strokeLinecap="round"/>
    <path d="M 208 82 Q 198 88 200 100 Q 204 108 212 106"
          stroke="url(#goldGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    <path d="M 204 88 Q 194 96 197 108"
          stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

    {/* ── HORSE LEGS (4 legs) ── */}
    {/* Front right leg (raised, prancing) */}
    <path d="M 283 102 Q 286 115 282 126 Q 280 132 282 138"
          stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" fill="none"/>
    <path d="M 282 126 Q 278 130 276 138"
          stroke="url(#goldGrad)" strokeWidth="5" strokeLinecap="round" fill="none"/>
    {/* Front left leg (forward) */}
    <path d="M 274 106 Q 272 120 270 130 Q 270 136 268 140"
          stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" fill="none"/>
    {/* Hoof front */}
    <ellipse cx="268" cy="141" rx="5" ry="2.5" fill="url(#goldGrad)"/>

    {/* Back right leg */}
    <path d="M 235 112 Q 232 124 230 134 Q 229 140 228 144"
          stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" fill="none"/>
    <ellipse cx="228" cy="145" rx="5" ry="2.5" fill="url(#goldGrad)"/>
    {/* Back left leg */}
    <path d="M 243 112 Q 241 125 239 136 Q 238 141 237 144"
          stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round" fill="none"/>
    <ellipse cx="237" cy="145" rx="5" ry="2.5" fill="url(#goldGrad)"/>

    {/* ── HARNESS / SHAFT ── */}
    <line x1="160" y1="125" x2="250" y2="105" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>
    <line x1="160" y1="130" x2="250" y2="112" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round"/>
    {/* Collar around horse neck */}
    <ellipse cx="265" cy="75" rx="8" ry="5" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" transform="rotate(-10,265,75)"/>

    {/* ── CARRIAGE BODY ── */}
    {/* Main cabin shape — rounded baroque style */}
    <path d="
      M 55 70
      Q 50 52 62 42
      L 148 42
      Q 160 42 155 70
      L 155 118
      Q 155 130 142 134
      L 68 134
      Q 55 134 55 118 Z
    " fill="url(#goldGrad)" />

    {/* Cabin top ornamental canopy */}
    <path d="M 62 42 Q 75 30 105 26 Q 135 30 148 42" fill="url(#goldGrad2)" />
    {/* Crown finial */}
    <path d="M 98 26 Q 100 16 102 10 Q 104 4 105 1 Q 106 4 108 10 Q 110 16 112 26"
          stroke="url(#goldGrad)" strokeWidth="2" fill="url(#goldGrad)" />
    <circle cx="105" cy="1" r="4" fill="url(#goldGrad2)" />
    {/* Canopy drape detail */}
    <path d="M 68 46 Q 78 38 92 36 Q 106 34 118 36 Q 132 38 142 46"
          stroke="url(#goldGrad2)" strokeWidth="1.5" fill="none"/>

    {/* Windows (2 arched) */}
    <path d="M 68 60 Q 68 50 76 50 L 96 50 Q 104 50 104 60 L 104 90 Q 104 96 96 96 L 76 96 Q 68 96 68 90 Z"
          fill="#d5eaf8" opacity="0.85" />
    <path d="M 108 60 Q 108 50 116 50 L 136 50 Q 144 50 144 60 L 144 90 Q 144 96 136 96 L 116 96 Q 108 96 108 90 Z"
          fill="#d5eaf8" opacity="0.85" />
    {/* Window border */}
    <path d="M 68 60 Q 68 50 76 50 L 96 50 Q 104 50 104 60 L 104 90 Q 104 96 96 96 L 76 96 Q 68 96 68 90 Z"
          stroke="url(#goldGrad2)" strokeWidth="2" fill="none" />
    <path d="M 108 60 Q 108 50 116 50 L 136 50 Q 144 50 144 60 L 144 90 Q 144 96 136 96 L 116 96 Q 108 96 108 90 Z"
          stroke="url(#goldGrad2)" strokeWidth="2" fill="none" />

    {/* Door handle */}
    <rect x="97" y="88" width="16" height="6" rx="3" fill="url(#goldGrad2)" />

    {/* Running board / step */}
    <rect x="62" y="131" width="86" height="8" rx="4" fill="url(#goldGrad2)" />

    {/* Ornamental scrollwork on sides */}
    {/* Left scroll */}
    <path d="M 55 80 Q 40 74 36 86 Q 38 98 52 94 Q 60 90 55 80"
          stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M 40 86 Q 32 88 30 96 Q 33 104 40 102"
          stroke="url(#goldGrad)" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* Right scroll */}
    <path d="M 155 80 Q 170 74 174 86 Q 172 98 158 94 Q 150 90 155 80"
          stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M 170 86 Q 178 88 180 96 Q 177 104 170 102"
          stroke="url(#goldGrad)" strokeWidth="2" fill="none" strokeLinecap="round"/>

    {/* Bottom carriage frame */}
    <path d="M 55 118 Q 55 138 72 140 L 138 140 Q 155 138 155 118"
          stroke="url(#goldGrad)" strokeWidth="2" fill="none"/>

    {/* ── WHEELS ── */}
    {/* Large back wheel */}
    <circle cx="78" cy="148" r="30" stroke="url(#goldGrad)" strokeWidth="4" fill="none"/>
    <circle cx="78" cy="148" r="5.5" fill="url(#goldGrad)"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a, i) => (
      <line key={`bw${i}`}
        x1={78 + 5.5 * Math.cos(a * Math.PI/180)}
        y1={148 + 5.5 * Math.sin(a * Math.PI/180)}
        x2={78 + 29 * Math.cos(a * Math.PI/180)}
        y2={148 + 29 * Math.sin(a * Math.PI/180)}
        stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
    ))}
    {/* Wheel trim ring */}
    <circle cx="78" cy="148" r="26" stroke="url(#goldGrad2)" strokeWidth="1.5" fill="none" opacity="0.6"/>

    {/* Smaller front wheel */}
    <circle cx="145" cy="152" r="22" stroke="url(#goldGrad)" strokeWidth="4" fill="none"/>
    <circle cx="145" cy="152" r="4.5" fill="url(#goldGrad)"/>
    {[0,40,80,120,160,200,240,280,320].map((a, i) => (
      <line key={`fw${i}`}
        x1={145 + 4.5 * Math.cos(a * Math.PI/180)}
        y1={152 + 4.5 * Math.sin(a * Math.PI/180)}
        x2={145 + 21 * Math.cos(a * Math.PI/180)}
        y2={152 + 21 * Math.sin(a * Math.PI/180)}
        stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>
    ))}
    <circle cx="145" cy="152" r="19" stroke="url(#goldGrad2)" strokeWidth="1.5" fill="none" opacity="0.6"/>

    {/* ── AXLE / UNDERCARRIAGE FRAME ── */}
    <line x1="78" y1="148" x2="145" y2="152" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round"/>
    {/* Axle supports */}
    <line x1="90" y1="138" x2="88" y2="148" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round"/>
    <line x1="130" y1="140" x2="133" y2="152" stroke="url(#goldGrad)" strokeWidth="4" strokeLinecap="round"/>

    {/* Coach lanterns */}
    <rect x="50" y="62" width="7" height="12" rx="2" fill="url(#goldGrad2)"/>
    <rect x="153" y="62" width="7" height="12" rx="2" fill="url(#goldGrad2)"/>
    <line x1="53" y1="55" x2="53" y2="62" stroke="url(#goldGrad)" strokeWidth="1.5"/>
    <line x1="157" y1="55" x2="157" y2="62" stroke="url(#goldGrad)" strokeWidth="1.5"/>
  </svg>
);

export default CarriageIcon;
