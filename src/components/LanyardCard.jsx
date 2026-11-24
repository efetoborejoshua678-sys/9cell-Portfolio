import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { QrCode, ShieldCheck, Sparkles, Cpu, RotateCw, CheckCircle2, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

/*
  REALISTIC PHYSICAL LANYARD ROPE & CARD
  ───────────────────────────────────────
  • Realistic braided nylon/paracord rope with cylindrical shading & weave texture
  • Dynamic catenary curve physics (slacks when loose, stretches and thins when taut)
  • Executive brushed chrome swivel clasp & lobster hook hardware
  • Punched slot cutout on the badge face
  • Dynamic 3D tilt & rotational torque matching tension direction
  • Spring-driven bounce-back on drag release
  • 3D flip front/back credentials
*/

function RealisticRopeSVG({ anchorY, cardY, offsetX = 0, width }) {
  const anchorX = width / 2;
  const targetX = anchorX + offsetX;
  const dy = cardY - anchorY;
  const dx = offsetX;

  // Real physical distance & stretch ratio
  const dist = Math.sqrt(dx * dx + dy * dy);
  const restLength = 100;
  
  // When distance is shorter than rest length, rope sags more; when pulled taut, sag approaches zero
  const slack = Math.max(0, (restLength - dist * 0.75));

  // Dynamic rope thickness: thicker when relaxed (~5.5px), thins down under tension (~3.2px)
  const thickness = Math.max(3.2, Math.min(5.5, 5.5 - (dist / 240)));

  // Control points for cubic bezier to give natural gravity drop
  const cp1X = anchorX + dx * 0.15;
  const cp1Y = anchorY + dy * 0.35 + slack * 0.5;
  const cp2X = anchorX + dx * 0.85;
  const cp2Y = anchorY + dy * 0.75 + slack * 0.3;

  const ropePath = `M ${anchorX} ${anchorY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${cardY}`;
  const svgHeight = Math.max(cardY + 80, 260);

  return (
    <svg
      className="absolute top-0 left-0 w-full pointer-events-none z-30"
      style={{ height: `${svgHeight}px`, overflow: 'visible' }}
      viewBox={`0 0 ${width} ${svgHeight}`}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Drop shadow for rope */}
        <filter id="ropeShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="rgba(0,0,0,0.45)" />
        </filter>

        {/* 3D Cylindrical gradient for braided cord */}
        <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(45)">
          <stop offset="0%" stopColor="#2c3b4d" />
          <stop offset="35%" stopColor="#8fa5b8" />
          <stop offset="65%" stopColor="#4d6070" />
          <stop offset="100%" stopColor="#1e2834" />
        </linearGradient>

        {/* Rope highlight thread */}
        <linearGradient id="stitchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6e1d6" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#b4aea4" stopOpacity="0.4" />
        </linearGradient>

        {/* Metallic chrome gradient for clasps */}
        <linearGradient id="metalChrome" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="25%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="75%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* Top anchor ring radial highlight */}
        <radialGradient id="anchorRing" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
      </defs>

      {/* 1. Deep ambient shadow */}
      <path
        d={ropePath}
        fill="none"
        stroke="rgba(0, 0, 0, 0.4)"
        strokeWidth={thickness + 4}
        strokeLinecap="round"
        filter="url(#ropeShadow)"
      />

      {/* 2. Outer dark border cord strand */}
      <path
        d={ropePath}
        fill="none"
        stroke="#161f28"
        strokeWidth={thickness + 1.2}
        strokeLinecap="round"
      />

      {/* 3. Main braided rope body */}
      <path
        d={ropePath}
        fill="none"
        stroke="url(#ropeGrad)"
        strokeWidth={thickness}
        strokeLinecap="round"
      />

      {/* 4. Realistic diagonal braided stitch markings */}
      <path
        d={ropePath}
        fill="none"
        stroke="url(#stitchGrad)"
        strokeWidth={1.2}
        strokeDasharray="4 7"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d={ropePath}
        fill="none"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth={0.8}
        strokeDasharray="2 9"
        strokeDashoffset="3"
        strokeLinecap="round"
      />

      {/* 5. Bottom Hardware: Crimp collar + swivel lobster hook */}
      <g transform={`translate(${targetX}, ${cardY})`}>
        {/* Metal Crimp Collar / Ferrule */}
        <rect
          x="-5"
          y="-14"
          width="10"
          height="8"
          rx="2"
          fill="url(#metalChrome)"
          stroke="#334155"
          strokeWidth="0.8"
          filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.4))"
        />
        {/* Collar decorative grooves */}
        <line x1="-4" y1="-11" x2="4" y2="-11" stroke="#475569" strokeWidth="0.7" />
        <line x1="-4" y1="-9" x2="4" y2="-9" stroke="#475569" strokeWidth="0.7" />

        {/* Swivel Ring Eyelet */}
        <circle
          cx="0"
          cy="-5"
          r="4.5"
          fill="none"
          stroke="url(#metalChrome)"
          strokeWidth="2"
        />

        {/* Lobster clasp body */}
        <path
          d="M -3 -2 C -4 3, -4 7, 0 10 C 4 7, 4 3, 3 -2 Z"
          fill="url(#metalChrome)"
          stroke="#334155"
          strokeWidth="0.8"
          filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.35))"
        />

        {/* Hook clip clamping through badge hole */}
        <path
          d="M -1.8 5 C -2.2 13, 2.2 13, 1.8 5"
          fill="none"
          stroke="url(#metalChrome)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line x1="-1.5" y1="6" x2="1.5" y2="9" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function LanyardCard() {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(340);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Spring physics for authentic physical lanyard reaction
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 280, damping: 20, mass: 0.85 });
  const springY = useSpring(dragY, { stiffness: 280, damping: 20, mass: 0.85 });

  // Top anchor coordinates
  const anchorY = 12;
  const restY = 110;

  const [ropeEnd, setRopeEnd] = useState({ x: 0, y: restY });

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  // Update SVG rope connection points as the card moves
  useEffect(() => {
    const unsubX = springX.on('change', (v) => {
      setRopeEnd((prev) => ({ ...prev, x: v }));
    });
    const unsubY = springY.on('change', (v) => {
      setRopeEnd((prev) => ({ ...prev, y: restY + v }));
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [springX, springY, restY]);

  // Dynamic 3D mouse tilt
  const handleMouseMove = useCallback((e) => {
    if (isDragging) return;
    const card = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - (card.left + card.width / 2);
    const my = e.clientY - (card.top + card.height / 2);
    setTilt({
      x: (-my / (card.height / 2)) * 14,
      y: (mx / (card.width / 2)) * 14,
    });
  }, [isDragging]);

  const handleMouseLeave = () => {
    if (!isDragging) setTilt({ x: 0, y: 0 });
  };

  const toggleFlip = () => {
    if (!isDragging) {
      sound.playPop();
      setIsFlipped(!isFlipped);
    }
  };

  // Card rotational torque: as user pulls card horizontally, card tilts toward direction of rope tension
  const dynamicTensionAngle = Math.max(-18, Math.min(18, (ropeEnd.x / 140) * 16));

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none"
      style={{ minHeight: '580px', width: '340px' }}
    >
      {/* Realistic Braided Rope with SVG Physics */}
      <RealisticRopeSVG
        anchorY={anchorY}
        cardY={ropeEnd.y}
        offsetX={ropeEnd.x}
        width={containerWidth}
      />

      {/* Top Anchor Mount: Heavy Chrome Peg with Ring */}
      <div
        className="absolute z-20 w-6 h-6 rounded-full shadow-2xl flex items-center justify-center pointer-events-none"
        style={{
          top: `${anchorY - 8}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #94a3b8 50%, #1e293b 100%)',
          border: '1.5px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #0f172a 0%, #000000 100%)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
          }}
        />
      </div>

      {/* Draggable Card Component */}
      <motion.div
        drag
        dragElastic={0.2}
        dragConstraints={{ top: -70, bottom: 180, left: -120, right: 120 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(_, info) => {
          dragX.set(info.offset.x);
          dragY.set(info.offset.y);
        }}
        onDragEnd={() => {
          setIsDragging(false);
          dragX.set(0);
          dragY.set(0);
        }}
        style={{
          x: springX,
          y: springY,
          rotate: dynamicTensionAngle,
          transformOrigin: '50% 0px',
          position: 'absolute',
          top: `${restY}px`,
          left: '50%',
          marginLeft: '-155px',
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: 25,
        }}
        className="touch-none"
      >
        {/* Badge Hole Slot Cutout & Clip Attachment */}
        <div className="flex justify-center -mb-2 relative z-30 pointer-events-none">
          <div
            className="w-12 h-3.5 rounded-full flex items-center justify-center shadow-inner"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border)',
            }}
          >
            <div
              className="w-7 h-1.5 rounded-full"
              style={{
                background: 'rgba(0,0,0,0.6)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9)',
              }}
            />
          </div>
        </div>

        {/* 3D Card Face */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={toggleFlip}
          style={{ perspective: '1200px' }}
        >
          <motion.div
            animate={{
              rotateX: isDragging ? 0 : tilt.x,
              rotateY: isFlipped ? (isDragging ? 180 : tilt.y + 180) : (isDragging ? 0 : tilt.y),
            }}
            transition={{
              rotateX: { type: 'spring', stiffness: 320, damping: 25 },
              rotateY: { type: 'spring', stiffness: 300, damping: 22 },
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-[310px] h-[420px] rounded-3xl p-px shadow-2xl transition-shadow duration-300"
          >
            {/* Border Sheen */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(145deg, color-mix(in srgb, var(--steel-light) 50%, transparent) 0%, color-mix(in srgb, var(--steel) 20%, transparent) 50%, color-mix(in srgb, var(--accent) 15%, transparent) 100%)',
              }}
            />

            {/* Card Inner Panel */}
            <div
              className="relative w-full h-full rounded-[22px] p-5 flex flex-col justify-between overflow-hidden shadow-2xl"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(16px)',
              }}
            >
              {/* Subtle glass reflection */}
              <div
                className="absolute inset-0 pointer-events-none rounded-[22px]"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 55%)' }}
              />

              {!isFlipped ? (
                /* ── FRONT ── */
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full animate-ping" style={{ background: '#6fcf97' }} />
                      <span className="text-[10px] font-mono font-semibold tracking-wider" style={{ color: '#6fcf97' }}>
                        ACTIVE PASS
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono"
                      style={{
                        background: 'var(--bg-raised)',
                        border: '1px solid var(--border)',
                        color: 'var(--steel-light)',
                      }}
                    >
                      <Cpu className="w-3 h-3" />
                      <span>ID: 9C-2026</span>
                    </div>
                  </div>

                  {/* Photo & Identity */}
                  <div className="flex flex-col items-center my-auto py-2">
                    <div className="relative group">
                      <div
                        className="absolute -inset-1.5 rounded-2xl opacity-40 blur-sm transition-opacity group-hover:opacity-75"
                        style={{ background: 'linear-gradient(135deg, var(--steel) 0%, var(--accent) 100%)' }}
                      />
                      <div
                        className="relative rounded-2xl overflow-hidden border-2 shadow-xl"
                        style={{ background: 'var(--bg-raised)', borderColor: 'var(--border-hover)', width: '104px', height: '120px' }}
                      >
                        <img
                          src={personalInfo.images.headshot}
                          alt={personalInfo.name}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                          draggable={false}
                        />
                      </div>
                      <div
                        className="absolute -bottom-2 -right-2 p-1 rounded-full shadow-lg"
                        style={{ background: 'var(--accent)' }}
                      >
                        <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--on-accent)' }} />
                      </div>
                    </div>

                    <div className="text-center mt-4">
                      <h3 className="font-display font-extrabold text-lg tracking-tight" style={{ color: 'var(--accent)' }}>
                        {personalInfo.name}
                      </h3>
                      <div
                        className="inline-flex items-center gap-1 mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-mono"
                        style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', color: 'var(--steel-light)' }}
                      >
                        <span>@{personalInfo.alias}</span>
                        <span>•</span>
                        <span>Full-Stack</span>
                      </div>
                      <p className="text-xs mt-1 max-w-[210px] font-medium" style={{ color: 'var(--text-muted)' }}>
                        Software Engineering Student & Dev
                      </p>
                    </div>
                  </div>

                  {/* Footer barcode & location */}
                  <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                        <MapPin className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                        <span>Warri / Port Harcourt</span>
                      </div>
                      <div className="flex items-center gap-0.5 mt-1.5 opacity-40">
                        {[12, 18, 8, 22, 14, 6, 20, 16, 10, 24, 12, 8, 16, 22, 14].map((h, i) => (
                          <div key={i} className="w-1 rounded-sm" style={{ height: `${h}px`, background: 'var(--accent)' }} />
                        ))}
                      </div>
                    </div>
                    <div
                      className="w-11 h-11 p-1.5 rounded-xl flex items-center justify-center shadow-md"
                      style={{ background: 'var(--accent)' }}
                    >
                      <QrCode className="w-full h-full" style={{ color: 'var(--on-accent)' }} />
                    </div>
                  </div>
                </div>
              ) : (
                /* ── BACK ── */
                <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: 'rotateY(180deg)' }}>
                  <div>
                    <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>CREDENTIALS</span>
                      <ShieldCheck className="w-4 h-4" style={{ color: '#6fcf97' }} />
                    </div>
                    <div className="mt-4 space-y-3 text-xs font-mono">
                      {[
                        { label: 'ORGANIZATION', value: 'Warri Tech Hub (SIWES)' },
                        { label: 'CORE STACK', value: 'Java • React • MySQL • REST', isAccent: true },
                        { label: 'ACADEMIC FOCUS', value: 'Software Engineering (SEN 301)' },
                      ].map(({ label, value, isAccent }) => (
                        <div key={label} className="p-2.5 rounded-xl" style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)' }}>
                          <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{label}</div>
                          <div className="font-semibold mt-0.5" style={{ color: isAccent ? 'var(--accent)' : 'var(--text-primary)' }}>{value}</div>
                        </div>
                      ))}
                      <div
                        className="p-2.5 rounded-xl text-center font-semibold text-[11px]"
                        style={{ background: 'rgba(107,207,151,0.08)', border: '1px solid rgba(107,207,151,0.25)', color: '#6fcf97' }}
                      >
                        ● READY FOR FREELANCE & ROLES
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-[10px] font-mono pt-2" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
                    Click to flip back to photo pass
                  </div>
                </div>
              )}

              <div className="absolute top-2 right-2 opacity-30 hover:opacity-80 transition-opacity">
                <RotateCw className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Helper Hint */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 text-xs font-mono"
        style={{ color: 'var(--text-muted)' }}
      >
        <Sparkles className="w-3.5 h-3.5 animate-pulse" style={{ color: 'var(--accent)' }} />
        <span>Drag rope to stretch • Tilt to angle • Click to flip</span>
      </div>
    </div>
  );
}
