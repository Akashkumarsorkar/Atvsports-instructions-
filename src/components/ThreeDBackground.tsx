import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ThreeDBackgroundProps {
  theme?: 'dark' | 'light';
  opacity?: number;
}

// 3D vector rotation helper
function rotate3D(
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number
): [number, number, number] {
  const cosX = Math.cos(rx), sinX = Math.sin(rx);
  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  const cosZ = Math.cos(rz), sinZ = Math.sin(rz);

  // X-axis rotation
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;

  // Y-axis rotation
  const x2 = x * cosY + z1 * sinY;
  const z2 = -x * sinY + z1 * cosY;

  // Z-axis rotation
  const x3 = x2 * cosZ - y1 * sinZ;
  const y3 = x2 * sinZ + y1 * cosZ;

  return [x3, y3, z2];
}

interface SportsBall {
  type: 'soccer' | 'basketball' | 'cricket' | 'tennis';
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  rx: number;
  ry: number;
  rz: number;
  vrx: number;
  vry: number;
  vrz: number;
  trail: { x: number; y: number; z: number; alpha: number }[];
}

export function ThreeDBackground({ theme = 'dark', opacity = 0.9 }: ThreeDBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSportMode, setActiveSportMode] = useState<'all' | 'soccer' | 'basketball'>('all');
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHoveringBall: false });
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - halfW) / halfW;
      mouseRef.current.targetY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Camera Focal length and horizon
    const FOV = 700;

    const project = (x: number, y: number, z: number, camX: number, camY: number) => {
      const relX = x - camX;
      const relY = y - camY;
      const relZ = Math.max(z, 40);
      const scale = FOV / relZ;
      return {
        screenX: width / 2 + relX * scale,
        screenY: height / 2 + relY * scale,
        scale,
        depth: relZ,
      };
    };

    // =========================================================================
    // 1. MATHEMATICALLY GENERATE 3D SOCCER BALL (Truncated Icosahedron Patches)
    // =========================================================================
    // The 12 pentagon centers of an icosahedron
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawPentagonCenters: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ];

    // Normalize pentagon centers to unit sphere
    const pentagonCenters = rawPentagonCenters.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [x / len, y / len, z / len] as [number, number, number];
    });

    // Build 5 vertices for each pentagon
    const pentagonPatches = pentagonCenters.map((center) => {
      const [cx, cy, cz] = center;
      // An arbitrary perpendicular vector
      let px = -cy, py = cx, pz = 0;
      if (Math.abs(cx) < 0.1 && Math.abs(cy) < 0.1) {
        px = 1; py = 0; pz = 0;
      }
      const pLen = Math.sqrt(px * px + py * py + pz * pz);
      px /= pLen; py /= pLen; pz /= pLen;

      // Cross product to get second perpendicular
      const qx = cy * pz - cz * py;
      const qy = cz * px - cx * pz;
      const qz = cx * py - cy * px;

      const pentRadius = 0.36; // Angular radius of pentagon on sphere
      const vertices: [number, number, number][] = [];
      for (let k = 0; k < 5; k++) {
        const angle = (k * 2 * Math.PI) / 5;
        const cosA = Math.cos(angle) * pentRadius;
        const sinA = Math.sin(angle) * pentRadius;
        const vx = cx + cosA * px + sinA * qx;
        const vy = cy + cosA * py + sinA * qy;
        const vz = cz + cosA * pz + sinA * qz;
        const vLen = Math.sqrt(vx * vx + vy * vy + vz * vz);
        vertices.push([vx / vLen, vy / vLen, vz / vLen]);
      }
      return { center, vertices };
    });

    // =========================================================================
    // 2. MATHEMATICALLY GENERATE 3D BASKETBALL SEAMS
    // =========================================================================
    const basketballSeamPoints: [number, number, number][][] = [];
    const SEAM_STEPS = 48;

    // Seam A: Equator circle (XY plane)
    const seamA: [number, number, number][] = [];
    for (let i = 0; i < SEAM_STEPS; i++) {
      const th = (i * 2 * Math.PI) / SEAM_STEPS;
      seamA.push([Math.cos(th), Math.sin(th), 0]);
    }
    basketballSeamPoints.push(seamA);

    // Seam B: Meridian circle (YZ plane)
    const seamB: [number, number, number][] = [];
    for (let i = 0; i < SEAM_STEPS; i++) {
      const th = (i * 2 * Math.PI) / SEAM_STEPS;
      seamB.push([0, Math.cos(th), Math.sin(th)]);
    }
    basketballSeamPoints.push(seamB);

    // Seams C & D: Signature dual hyperbolic side channels
    const seamC: [number, number, number][] = [];
    const seamD: [number, number, number][] = [];
    for (let i = 0; i < SEAM_STEPS; i++) {
      const th = (i * 2 * Math.PI) / SEAM_STEPS;
      const x = Math.cos(th);
      const z = Math.sin(th) * 0.7;
      const yVal = Math.sqrt(Math.max(0, 1 - x * x - z * z));
      const sgn = Math.sin(th) >= 0 ? 1 : -1;
      seamC.push([x, yVal * sgn, z]);
      seamD.push([x, -yVal * sgn, z]);
    }
    basketballSeamPoints.push(seamC, seamD);

    // =========================================================================
    // 3. MATHEMATICALLY GENERATE 3D TENNIS BALL CURVED SEAM
    // =========================================================================
    const tennisSeamPoints: [number, number, number][] = [];
    const T_STEPS = 64;
    const a = 0.28;
    for (let i = 0; i < T_STEPS; i++) {
      const t = (i * 2 * Math.PI) / T_STEPS;
      let tx = Math.cos(t) - a * Math.cos(3 * t);
      let ty = Math.sin(t) + a * Math.sin(3 * t);
      let tz = 2 * Math.sqrt(a) * Math.sin(2 * t);
      const len = Math.sqrt(tx * tx + ty * ty + tz * tz);
      tennisSeamPoints.push([tx / len, ty / len, tz / len]);
    }

    // =========================================================================
    // 4. INITIALIZE 3D SPORTS BALLS (Positions, Orbit, Velocity)
    // =========================================================================
    const balls: SportsBall[] = [
      {
        type: 'soccer',
        x: -320,
        y: -40,
        z: 620,
        vx: 0.4,
        vy: 0.25,
        vz: -0.15,
        radius: 68,
        rx: 0.3,
        ry: 0.6,
        rz: 0.2,
        vrx: 0.012,
        vry: 0.018,
        vrz: 0.008,
        trail: [],
      },
      {
        type: 'basketball',
        x: 360,
        y: -90,
        z: 750,
        vx: -0.35,
        vy: 0.3,
        vz: 0.2,
        radius: 74,
        rx: 0.8,
        ry: 0.4,
        rz: 0.5,
        vrx: 0.015,
        vry: -0.012,
        vrz: 0.01,
        trail: [],
      },
      {
        type: 'cricket',
        x: 140,
        y: 110,
        z: 880,
        vx: 0.28,
        vy: -0.32,
        vz: -0.1,
        radius: 46,
        rx: 0.5,
        ry: 1.1,
        rz: 0.7,
        vrx: 0.022,
        vry: 0.028,
        vrz: 0.014,
        trail: [],
      },
      {
        type: 'tennis',
        x: -160,
        y: 120,
        z: 960,
        vx: -0.3,
        vy: -0.22,
        vz: 0.25,
        radius: 38,
        rx: 1.2,
        ry: 0.8,
        rz: 0.4,
        vrx: -0.024,
        vry: 0.02,
        vrz: 0.018,
        trail: [],
      },
    ];

    // Ambient floating stadium energy particles
    const STADIUM_PARTICLES = 50;
    const particles = Array.from({ length: STADIUM_PARTICLES }, () => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 1200,
      z: Math.random() * 1400 + 300,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? '#ef4444' : '#ffffff',
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let time = 0;

    // =========================================================================
    // 5. RENDER 3D SPORTS BALLS FUNCTIONS
    // =========================================================================

    // A. Render 3D Soccer Ball
    const drawSoccerBall = (
      ball: SportsBall,
      screenX: number,
      screenY: number,
      renderRadius: number,
      camX: number,
      camY: number
    ) => {
      // 1. Base sphere volume with gradient shading
      const lightOffsetX = -renderRadius * 0.35;
      const lightOffsetY = -renderRadius * 0.38;

      const sphereGrad = ctx.createRadialGradient(
        screenX + lightOffsetX,
        screenY + lightOffsetY,
        renderRadius * 0.08,
        screenX,
        screenY,
        renderRadius
      );
      sphereGrad.addColorStop(0, '#ffffff');
      sphereGrad.addColorStop(0.45, '#f1f5f9');
      sphereGrad.addColorStop(0.85, '#cbd5e1');
      sphereGrad.addColorStop(1, '#64748b');

      ctx.save();
      ctx.beginPath();
      ctx.arc(screenX, screenY, renderRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = 'rgba(239, 68, 68, 0.4)';
      ctx.shadowBlur = renderRadius * 0.4;
      ctx.fill();

      // Clip to sphere surface for seamless pattern mapping
      ctx.clip();

      // 2. Render 3D Rotating Pentagon & Hexagon Seams
      pentagonPatches.forEach((patch) => {
        // Rotate pentagon center
        const [rcx, rcy, rcz] = rotate3D(
          patch.center[0],
          patch.center[1],
          patch.center[2],
          ball.rx,
          ball.ry,
          ball.rz
        );

        // If pentagon is on the visible front hemisphere (rcz > -0.15)
        if (rcz > -0.15) {
          ctx.beginPath();
          let first = true;

          // Connect rotated vertices
          patch.vertices.forEach((v) => {
            const [rx, ry, rz] = rotate3D(v[0], v[1], v[2], ball.rx, ball.ry, ball.rz);
            // Orthographic spherical projection on circle
            const px = screenX + rx * renderRadius;
            const py = screenY + ry * renderRadius;
            if (first) {
              ctx.moveTo(px, py);
              first = false;
            } else {
              ctx.lineTo(px, py);
            }
          });
          ctx.closePath();

          // Black pentagon with subtle specular lighting
          const depthShade = Math.max(0.2, (rcz + 0.5) / 1.5);
          ctx.fillStyle = `rgb(${Math.floor(25 * depthShade)}, ${Math.floor(28 * depthShade)}, ${Math.floor(35 * depthShade)})`;
          ctx.fill();
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = Math.max(1, renderRadius * 0.025);
          ctx.stroke();

          // Draw stitching lines extending from vertices to adjacent hexagon centers
          patch.vertices.forEach((v) => {
            const [rx, ry] = rotate3D(v[0], v[1], v[2], ball.rx, ball.ry, ball.rz);
            const [cx2, cy2] = rotate3D(v[0] * 1.35, v[1] * 1.35, v[2] * 1.35, ball.rx, ball.ry, ball.rz);
            ctx.beginPath();
            ctx.moveTo(screenX + rx * renderRadius, screenY + ry * renderRadius);
            ctx.lineTo(screenX + cx2 * renderRadius, screenY + cy2 * renderRadius);
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = Math.max(0.8, renderRadius * 0.02);
            ctx.stroke();
          });
        }
      });

      // 3. Spherical 3D shading overlay (ambient shadow + specular highlight)
      const shadowGrad = ctx.createRadialGradient(
        screenX,
        screenY,
        renderRadius * 0.6,
        screenX,
        screenY,
        renderRadius
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.25)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.65)');

      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(screenX, screenY, renderRadius, 0, Math.PI * 2);
      ctx.fill();

      // Specular shine
      const specGrad = ctx.createRadialGradient(
        screenX + lightOffsetX,
        screenY + lightOffsetY,
        2,
        screenX + lightOffsetX,
        screenY + lightOffsetY,
        renderRadius * 0.45
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
      specGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(screenX + lightOffsetX, screenY + lightOffsetY, renderRadius * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // B. Render 3D Basketball
    const drawBasketball = (
      ball: SportsBall,
      screenX: number,
      screenY: number,
      renderRadius: number
    ) => {
      const lightOffsetX = -renderRadius * 0.35;
      const lightOffsetY = -renderRadius * 0.38;

      // Deep vibrant burnt orange gradient
      const sphereGrad = ctx.createRadialGradient(
        screenX + lightOffsetX,
        screenY + lightOffsetY,
        renderRadius * 0.1,
        screenX,
        screenY,
        renderRadius
      );
      sphereGrad.addColorStop(0, '#fb923c');
      sphereGrad.addColorStop(0.4, '#ea580c');
      sphereGrad.addColorStop(0.85, '#c2410c');
      sphereGrad.addColorStop(1, '#7c2d12');

      ctx.save();
      ctx.beginPath();
      ctx.arc(screenX, screenY, renderRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = 'rgba(234, 88, 12, 0.45)';
      ctx.shadowBlur = renderRadius * 0.35;
      ctx.fill();
      ctx.clip();

      // Draw 3D Basketball Ribbed Seams
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = Math.max(1.8, renderRadius * 0.038);
      ctx.lineCap = 'round';

      basketballSeamPoints.forEach((seam) => {
        ctx.beginPath();
        let isDrawing = false;

        seam.forEach((pt) => {
          const [rx, ry, rz] = rotate3D(pt[0], pt[1], pt[2], ball.rx, ball.ry, ball.rz);
          if (rz > -0.15) {
            const px = screenX + rx * renderRadius;
            const py = screenY + ry * renderRadius;
            if (!isDrawing) {
              ctx.moveTo(px, py);
              isDrawing = true;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            isDrawing = false;
          }
        });
        ctx.stroke();
      });

      // Shading overlay
      const shadowGrad = ctx.createRadialGradient(
        screenX,
        screenY,
        renderRadius * 0.5,
        screenX,
        screenY,
        renderRadius
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      shadowGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.3)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.7)');

      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(screenX, screenY, renderRadius, 0, Math.PI * 2);
      ctx.fill();

      // Highlight
      const specGrad = ctx.createRadialGradient(
        screenX + lightOffsetX,
        screenY + lightOffsetY,
        1,
        screenX + lightOffsetX,
        screenY + lightOffsetY,
        renderRadius * 0.4
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(screenX + lightOffsetX, screenY + lightOffsetY, renderRadius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // C. Render 3D Cricket Ball
    const drawCricketBall = (
      ball: SportsBall,
      screenX: number,
      screenY: number,
      renderRadius: number
    ) => {
      const lightOffsetX = -renderRadius * 0.35;
      const lightOffsetY = -renderRadius * 0.35;

      // Glossy cherry-red leather gradient
      const sphereGrad = ctx.createRadialGradient(
        screenX + lightOffsetX,
        screenY + lightOffsetY,
        renderRadius * 0.1,
        screenX,
        screenY,
        renderRadius
      );
      sphereGrad.addColorStop(0, '#f87171');
      sphereGrad.addColorStop(0.3, '#dc2626');
      sphereGrad.addColorStop(0.75, '#991b1b');
      sphereGrad.addColorStop(1, '#450a0a');

      ctx.save();
      ctx.beginPath();
      ctx.arc(screenX, screenY, renderRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
      ctx.shadowBlur = renderRadius * 0.35;
      ctx.fill();
      ctx.clip();

      // Raised white stitched equator seam
      const seamSteps = 40;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = Math.max(1.5, renderRadius * 0.04);

      ctx.beginPath();
      let isDrawing = false;
      for (let i = 0; i < seamSteps; i++) {
        const th = (i * 2 * Math.PI) / seamSteps;
        const [rx, ry, rz] = rotate3D(Math.cos(th), 0, Math.sin(th), ball.rx, ball.ry, ball.rz);
        if (rz > -0.15) {
          const px = screenX + rx * renderRadius;
          const py = screenY + ry * renderRadius;
          if (!isDrawing) {
            ctx.moveTo(px, py);
            isDrawing = true;
          } else {
            ctx.lineTo(px, py);
          }
        } else {
          isDrawing = false;
        }
      }
      ctx.stroke();

      // Stitch ticks across seam
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      for (let i = 0; i < seamSteps; i++) {
        const th = (i * 2 * Math.PI) / seamSteps;
        const [rx, ry, rz] = rotate3D(Math.cos(th), 0, Math.sin(th), ball.rx, ball.ry, ball.rz);
        if (rz > 0) {
          const [tx, ty] = rotate3D(Math.cos(th), 0.08, Math.sin(th), ball.rx, ball.ry, ball.rz);
          const [bx, by] = rotate3D(Math.cos(th), -0.08, Math.sin(th), ball.rx, ball.ry, ball.rz);
          ctx.beginPath();
          ctx.moveTo(screenX + tx * renderRadius, screenY + ty * renderRadius);
          ctx.lineTo(screenX + bx * renderRadius, screenY + by * renderRadius);
          ctx.stroke();
        }
      }

      // High-gloss specular highlight (shiny polished leather ball)
      const specGrad = ctx.createRadialGradient(
        screenX + lightOffsetX,
        screenY + lightOffsetY,
        1,
        screenX + lightOffsetX,
        screenY + lightOffsetY,
        renderRadius * 0.45
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      specGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.2)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = specGrad;
      ctx.beginPath();
      ctx.arc(screenX + lightOffsetX, screenY + lightOffsetY, renderRadius * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // D. Render 3D Tennis Ball
    const drawTennisBall = (
      ball: SportsBall,
      screenX: number,
      screenY: number,
      renderRadius: number
    ) => {
      const lightOffsetX = -renderRadius * 0.3;
      const lightOffsetY = -renderRadius * 0.35;

      // Vivid optic yellow/lime felt gradient
      const sphereGrad = ctx.createRadialGradient(
        screenX + lightOffsetX,
        screenY + lightOffsetY,
        renderRadius * 0.1,
        screenX,
        screenY,
        renderRadius
      );
      sphereGrad.addColorStop(0, '#fef08a');
      sphereGrad.addColorStop(0.4, '#ccff00');
      sphereGrad.addColorStop(0.85, '#84cc16');
      sphereGrad.addColorStop(1, '#4d7c0f');

      ctx.save();
      ctx.beginPath();
      ctx.arc(screenX, screenY, renderRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = 'rgba(204, 255, 0, 0.4)';
      ctx.shadowBlur = renderRadius * 0.35;
      ctx.fill();
      ctx.clip();

      // Signature curved white tennis seam
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = Math.max(1.6, renderRadius * 0.045);
      ctx.lineCap = 'round';

      ctx.beginPath();
      let isDrawing = false;
      tennisSeamPoints.forEach((pt) => {
        const [rx, ry, rz] = rotate3D(pt[0], pt[1], pt[2], ball.rx, ball.ry, ball.rz);
        if (rz > -0.15) {
          const px = screenX + rx * renderRadius;
          const py = screenY + ry * renderRadius;
          if (!isDrawing) {
            ctx.moveTo(px, py);
            isDrawing = true;
          } else {
            ctx.lineTo(px, py);
          }
        } else {
          isDrawing = false;
        }
      });
      ctx.stroke();

      // Soft felt glow
      const feltGrad = ctx.createRadialGradient(
        screenX,
        screenY,
        renderRadius * 0.65,
        screenX,
        screenY,
        renderRadius
      );
      feltGrad.addColorStop(0, 'transparent');
      feltGrad.addColorStop(1, 'rgba(0, 0, 0, 0.4)');

      ctx.fillStyle = feltGrad;
      ctx.beginPath();
      ctx.arc(screenX, screenY, renderRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // =========================================================================
    // 6. 3D SPORTS ARENA STADIUM FIELD (PITCH FLOOR)
    // =========================================================================
    const drawSportsField = (camX: number, camY: number) => {
      const pitchY = 320;
      const minZ = 160;
      const maxZ = 1800;
      const pitchWidth = 1400;

      // Subtle alternating turf grass stripes (3D perspective)
      const stripeZ = 90;
      for (let z = maxZ; z >= minZ; z -= stripeZ) {
        const p1 = project(-pitchWidth / 2, pitchY, z, camX, camY);
        const p2 = project(pitchWidth / 2, pitchY, z, camX, camY);
        const p3 = project(pitchWidth / 2, pitchY, z - stripeZ, camX, camY);
        const p4 = project(-pitchWidth / 2, pitchY, z - stripeZ, camX, camY);

        const isOdd = Math.floor(z / stripeZ) % 2 === 0;
        const depthFade = Math.pow(1 - (z - minZ) / (maxZ - minZ), 1.6);
        const alpha = isOdd ? depthFade * 0.08 : depthFade * 0.03;

        ctx.fillStyle = theme === 'dark' ? `rgba(239, 68, 68, ${alpha})` : `rgba(220, 38, 38, ${alpha * 0.7})`;
        ctx.beginPath();
        ctx.moveTo(p1.screenX, p1.screenY);
        ctx.lineTo(p2.screenX, p2.screenY);
        ctx.lineTo(p3.screenX, p3.screenY);
        ctx.lineTo(p4.screenX, p4.screenY);
        ctx.closePath();
        ctx.fill();
      }

      // Center Line
      const centerZ = 850;
      const cLeft = project(-pitchWidth / 2, pitchY, centerZ, camX, camY);
      const cRight = project(pitchWidth / 2, pitchY, centerZ, camX, camY);
      ctx.beginPath();
      ctx.moveTo(cLeft.screenX, cLeft.screenY);
      ctx.lineTo(cRight.screenX, cRight.screenY);
      ctx.strokeStyle = theme === 'dark' ? 'rgba(239, 68, 68, 0.35)' : 'rgba(220, 38, 38, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3D Center Circle
      const circleSteps = 36;
      const circleRadius = 140;
      ctx.beginPath();
      for (let i = 0; i <= circleSteps; i++) {
        const ang = (i * 2 * Math.PI) / circleSteps;
        const cx = Math.cos(ang) * circleRadius;
        const cz = centerZ + Math.sin(ang) * circleRadius;
        const cp = project(cx, pitchY, cz, camX, camY);
        if (i === 0) ctx.moveTo(cp.screenX, cp.screenY);
        else ctx.lineTo(cp.screenX, cp.screenY);
      }
      ctx.strokeStyle = theme === 'dark' ? 'rgba(239, 68, 68, 0.38)' : 'rgba(220, 38, 38, 0.25)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Touchlines (Left and Right pitch boundaries)
      const touchLeftStart = project(-pitchWidth / 2, pitchY, minZ, camX, camY);
      const touchLeftEnd = project(-pitchWidth / 2, pitchY, maxZ, camX, camY);
      const touchRightStart = project(pitchWidth / 2, pitchY, minZ, camX, camY);
      const touchRightEnd = project(pitchWidth / 2, pitchY, maxZ, camX, camY);

      ctx.beginPath();
      ctx.moveTo(touchLeftStart.screenX, touchLeftStart.screenY);
      ctx.lineTo(touchLeftEnd.screenX, touchLeftEnd.screenY);
      ctx.moveTo(touchRightStart.screenX, touchRightStart.screenY);
      ctx.lineTo(touchRightEnd.screenX, touchRightEnd.screenY);
      ctx.strokeStyle = theme === 'dark' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(220, 38, 38, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Stadium Corner Floodlight Beams
      const beamL = ctx.createRadialGradient(0, 0, 10, width * 0.25, height * 0.4, width * 0.5);
      beamL.addColorStop(0, theme === 'dark' ? 'rgba(239, 68, 68, 0.16)' : 'rgba(220, 38, 38, 0.08)');
      beamL.addColorStop(1, 'transparent');
      ctx.fillStyle = beamL;
      ctx.fillRect(0, 0, width * 0.6, height * 0.7);

      const beamR = ctx.createRadialGradient(width, 0, 10, width * 0.75, height * 0.4, width * 0.5);
      beamR.addColorStop(0, theme === 'dark' ? 'rgba(239, 68, 68, 0.14)' : 'rgba(220, 38, 38, 0.07)');
      beamR.addColorStop(1, 'transparent');
      ctx.fillStyle = beamR;
      ctx.fillRect(width * 0.4, 0, width * 0.6, height * 0.7);
    };

    // =========================================================================
    // 7. MAIN ANIMATION LOOP
    // =========================================================================
    const render = () => {
      time += 0.016;

      // Mouse Parallax with smooth easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const camX = mouseRef.current.x * 160;
      const camY = mouseRef.current.y * 90 - 20;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw 3D Stadium Field & Floodlights
      drawSportsField(camX, camY);

      // 2. Draw Floating Stadium Spark Particles
      particles.forEach((p) => {
        p.y -= 0.3;
        if (p.y < -600) p.y = 600;
        const proj = project(p.x, p.y, p.z, camX, camY);
        if (proj.screenX > 0 && proj.screenX < width && proj.screenY > 0 && proj.screenY < height) {
          ctx.beginPath();
          ctx.arc(proj.screenX, proj.screenY, p.size * proj.scale * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * (1 - p.z / 1800);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // 3. Update & Sort 3D Sports Balls by Z-Depth (Painters algorithm: farthest first)
      const activeBalls = balls.filter((b) => {
        if (activeSportMode === 'soccer') return b.type === 'soccer';
        if (activeSportMode === 'basketball') return b.type === 'basketball';
        return true;
      });

      // Update positions and 3D rotations
      activeBalls.forEach((b) => {
        // Floating motion with gentle sinusoidal physics
        b.x += b.vx;
        b.y += b.vy;
        b.z += b.vz;

        b.rx += b.vrx;
        b.ry += b.vry;
        b.rz += b.vrz;

        // Bouncing box boundaries in 3D arena
        if (b.x > 500) { b.x = 500; b.vx *= -1; }
        if (b.x < -500) { b.x = -500; b.vx *= -1; }
        if (b.y > 220) { b.y = 220; b.vy *= -1; }
        if (b.y < -260) { b.y = -260; b.vy *= -1; }
        if (b.z > 1150) { b.z = 1150; b.vz *= -1; }
        if (b.z < 450) { b.z = 450; b.vz *= -1; }

        // Motion trail
        b.trail.push({ x: b.x, y: b.y, z: b.z, alpha: 0.45 });
        if (b.trail.length > 8) b.trail.shift();
      });

      // Sort by depth
      const sortedBalls = [...activeBalls].sort((a, b) => b.z - a.z);

      // Render Trails & Balls
      sortedBalls.forEach((b) => {
        // Draw sports energy trails
        b.trail.forEach((t, idx) => {
          const tProj = project(t.x, t.y, t.z, camX, camY);
          const tRadius = b.radius * tProj.scale * 0.75;
          const trailAlpha = (idx / b.trail.length) * 0.15;

          ctx.beginPath();
          ctx.arc(tProj.screenX, tProj.screenY, tRadius, 0, Math.PI * 2);
          ctx.fillStyle = b.type === 'soccer' ? '#ffffff' : b.type === 'basketball' ? '#ea580c' : '#ef4444';
          ctx.globalAlpha = trailAlpha;
          ctx.fill();
        });
        ctx.globalAlpha = 1;

        // Project main ball
        const proj = project(b.x, b.y, b.z, camX, camY);
        const renderRadius = b.radius * proj.scale;

        // Render Drop Shadow on the stadium ground
        const groundShadow = project(b.x, 320, b.z, camX, camY);
        const shadowScaleX = renderRadius * 1.3;
        const shadowScaleY = renderRadius * 0.35;
        const heightFromFloor = Math.max(10, 320 - b.y);
        const shadowAlpha = Math.max(0.05, 0.4 - heightFromFloor / 900);

        ctx.beginPath();
        ctx.ellipse(
          groundShadow.screenX,
          groundShadow.screenY,
          shadowScaleX,
          shadowScaleY,
          0,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
        ctx.fill();

        // Render the actual 3D Sports Ball by type
        if (b.type === 'soccer') {
          drawSoccerBall(b, proj.screenX, proj.screenY, renderRadius, camX, camY);
        } else if (b.type === 'basketball') {
          drawBasketball(b, proj.screenX, proj.screenY, renderRadius);
        } else if (b.type === 'cricket') {
          drawCricketBall(b, proj.screenX, proj.screenY, renderRadius);
        } else if (b.type === 'tennis') {
          drawTennisBall(b, proj.screenX, proj.screenY, renderRadius);
        }
      });

      if (isPlaying) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying, activeSportMode, theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block transition-opacity duration-700"
        style={{ opacity }}
      />

      {/* Atmospheric Vignette ensuring readability of headers & cards */}
      <div
        className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-neutral-950/85 via-neutral-950/40 to-neutral-950/90'
            : 'bg-gradient-to-b from-neutral-50/85 via-neutral-50/40 to-neutral-50/85'
        }`}
      />

      {/* 3D Sports Background Interactive Controls */}
      <div className="absolute bottom-4 right-4 pointer-events-auto flex items-center gap-1.5 p-1 rounded-xl bg-neutral-900/85 backdrop-blur-md border border-neutral-800 text-[11px] shadow-2xl opacity-80 hover:opacity-100 transition-all">
        <span className="px-2 text-neutral-400 font-semibold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>{t.bg3dLabel}</span>
        </span>

        <button
          onClick={() => setActiveSportMode('all')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
            activeSportMode === 'all'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
          title="All 3D Sports (Soccer, Basketball, Cricket, Tennis)"
        >
          {t.bgAllArena}
        </button>

        <button
          onClick={() => setActiveSportMode('soccer')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
            activeSportMode === 'soccer'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
          title="3D Football / Soccer Focus"
        >
          {t.bgFootball}
        </button>

        <button
          onClick={() => setActiveSportMode('basketball')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
            activeSportMode === 'basketball'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
          title="3D Basketball Focus"
        >
          {t.bgBasketball}
        </button>

        <span className="text-neutral-700">|</span>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-2 py-1 rounded-lg font-medium transition-colors ${
            isPlaying ? 'text-red-400 hover:text-red-300' : 'text-neutral-500 hover:text-neutral-300'
          }`}
          title={isPlaying ? 'Pause 3D Sports Physics' : 'Resume 3D Sports Physics'}
        >
          {isPlaying ? `● ${t.bgActive}` : `○ ${t.bgPaused}`}
        </button>
      </div>
    </div>
  );
}
