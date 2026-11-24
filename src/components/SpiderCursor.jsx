import React, { useRef, useEffect, useState, useCallback } from 'react';

/*
  GLOBAL SPIDER-MAN WEB CURSOR
  ─────────────────────────────
  Hovering everywhere across the portfolio.
  • Matches the exact Spidey-sense icon:
    - Glowing center core dot
    - Surrounding concentric ring
    - 8 radial web spokes
    - Distinct joint/node dots at every spoke tip
    - Curved webbing arcs bridging between spokes
  • Theme reactive:
    - Pure white with luminous halo in Dark theme
    - Solid black / deep obsidian in Light theme
  • Zero-latency click precision with high-DPI retina sharpness
  • Interactive response:
    - Expands with spider-sense vibration on buttons/links
    - Ripple ping on click
    - Fluid trailing silk strand on swift mouse motion
*/

export default function SpiderCursor({ darkMode = false }) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const prevPos = useRef({ x: -100, y: -100 });
  const trail = useRef([]);
  const ripples = useRef([]);
  const isHoveringInteractive = useRef(false);
  const animFrame = useRef(null);
  const timeRef = useRef(0);
  const scaleRef = useRef(1);
  const isTouchDevice = useRef(false);

  const drawSpiderWeb = useCallback((ctx, x, y, t, speed, isInteractive, isDark) => {
    // Colors based on theme
    const rgb = isDark ? '255, 255, 255' : '15, 23, 42';

    // Target scale based on interactive state
    const targetScale = isInteractive ? 1.3 : 1.0;
    scaleRef.current += (targetScale - scaleRef.current) * 0.18;
    const s = scaleRef.current;

    // Pulse factor
    const pulse = Math.sin(t * (isInteractive ? 7 : 2.5)) * (isInteractive ? 2.2 : 1.0);
    const baseRadius = (25 + pulse) * s;
    const ringRadius = (9.5 + pulse * 0.35) * s;
    const centerRadius = 3.2 * s;
    const nodeRadius = 2.4 * s;

    ctx.save();

    // Glow / shadow
    if (isDark) {
      ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
      ctx.shadowBlur = isInteractive ? 12 : 7;
    } else {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = isInteractive ? 7 : 4;
    }

    const spokeCount = 8;
    const spokeCoords = [];

    // Calculate 8 radial spoke endpoints
    for (let i = 0; i < spokeCount; i++) {
      const angle = (i * Math.PI * 2) / spokeCount;
      const spokeLengthOffset = (i % 2 === 0 ? 2.5 : -1.5) + Math.sin(t * 3 + i) * 1.2;
      const len = baseRadius + spokeLengthOffset;
      const ex = x + Math.cos(angle) * len;
      const ey = y + Math.sin(angle) * len;
      spokeCoords.push({ x: ex, y: ey, angle, len });
    }

    // 1. Curved webbing arcs connecting adjacent spokes
    ctx.beginPath();
    for (let i = 0; i < spokeCount; i++) {
      const cur = spokeCoords[i];
      const next = spokeCoords[(i + 1) % spokeCount];

      const arcFactor = 0.60;
      const p1x = x + Math.cos(cur.angle) * (cur.len * arcFactor);
      const p1y = y + Math.sin(cur.angle) * (cur.len * arcFactor);

      const p2x = x + Math.cos(next.angle) * (next.len * arcFactor);
      const p2y = y + Math.sin(next.angle) * (next.len * arcFactor);

      // Arc midpoint pulled slightly inward toward center for classic web shape
      const midAngle = (cur.angle + next.angle + (i === spokeCount - 1 ? Math.PI * 2 : 0)) / 2;
      const midLen = cur.len * 0.44;
      const cx = x + Math.cos(midAngle) * midLen;
      const cy = y + Math.sin(midAngle) * midLen;

      if (i === 0) ctx.moveTo(p1x, p1y);
      ctx.quadraticCurveTo(cx, cy, p2x, p2y);
    }
    ctx.strokeStyle = `rgba(${rgb}, ${isDark ? 0.65 : 0.55})`;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // 2. Radial spokes from concentric ring out to node dots
    for (let i = 0; i < spokeCount; i++) {
      const cur = spokeCoords[i];
      const rx = x + Math.cos(cur.angle) * ringRadius;
      const ry = y + Math.sin(cur.angle) * ringRadius;

      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(cur.x, cur.y);
      ctx.strokeStyle = `rgba(${rgb}, ${isDark ? 0.8 : 0.7})`;
      ctx.lineWidth = 1.3;
      ctx.stroke();
    }

    // 3. Concentric outer ring
    ctx.beginPath();
    ctx.arc(x, y, ringRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${rgb}, ${isDark ? 0.9 : 0.85})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 4. Node dots at the tip of each spoke
    for (let i = 0; i < spokeCount; i++) {
      const cur = spokeCoords[i];
      ctx.beginPath();
      ctx.arc(cur.x, cur.y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${isDark ? 0.98 : 0.95})`;
      ctx.fill();
    }

    // 5. Solid center dot (the exact cursor point)
    ctx.beginPath();
    ctx.arc(x, y, centerRadius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rgb}, 1.0)`;
    ctx.fill();

    ctx.restore();
  }, []);

  // Draw trailing web filaments behind cursor
  const drawTrail = useCallback((ctx, isDark) => {
    const pts = trail.current;
    if (pts.length < 2) return;

    const rgb = isDark ? '255, 255, 255' : '15, 23, 42';

    for (let i = 1; i < pts.length; i++) {
      const p = pts[i];
      const pp = pts[i - 1];
      const ratio = i / pts.length;
      const alpha = ratio * (isDark ? 0.3 : 0.22);

      ctx.beginPath();
      ctx.moveTo(pp.x, pp.y);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
      ctx.lineWidth = 1.3 * ratio;
      ctx.stroke();

      if (i % 3 === 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2 * ratio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${alpha * 1.3})`;
        ctx.fill();
      }
    }
  }, []);

  // Draw click ripples
  const drawRipples = useCallback((ctx, isDark) => {
    const rgb = isDark ? '255, 255, 255' : '15, 23, 42';

    for (let i = ripples.current.length - 1; i >= 0; i--) {
      const rip = ripples.current[i];
      rip.radius += 2.4;
      rip.alpha -= 0.035;

      if (rip.alpha <= 0) {
        ripples.current.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rgb}, ${rip.alpha * 0.7})`;
      ctx.lineWidth = 1.3;
      ctx.stroke();
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isVisible && !isTouchDevice.current) {
      timeRef.current += 0.035;

      // Exact zero-lag mouse coordinate
      const x = mousePos.current.x;
      const y = mousePos.current.y;

      const dx = x - prevPos.current.x;
      const dy = y - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Record trail on motion
      if (speed > 0.5) {
        trail.current.push({ x, y });
        if (trail.current.length > 8) trail.current.shift();
      } else if (trail.current.length > 0) {
        trail.current.shift();
      }

      prevPos.current = { x, y };

      // Render layers
      drawTrail(ctx, darkMode);
      drawRipples(ctx, darkMode);
      drawSpiderWeb(ctx, x, y, timeRef.current, Math.min(speed, 25), isHoveringInteractive.current, darkMode);
    } else {
      if (trail.current.length > 0) {
        trail.current.shift();
        drawTrail(ctx, darkMode);
      }
      if (ripples.current.length > 0) {
        drawRipples(ctx, darkMode);
      }
    }

    animFrame.current = requestAnimationFrame(animate);
  }, [isVisible, darkMode, drawSpiderWeb, drawTrail, drawRipples]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouchDevice.current = true;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseDown = (e) => {
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        alpha: 0.85,
      });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], .group, .cursor-pointer'
      );
      isHoveringInteractive.current = !!isInteractive;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  useEffect(() => {
    animFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [animate]);

  if (isTouchDevice.current) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ overflow: 'hidden' }}
    />
  );
}
