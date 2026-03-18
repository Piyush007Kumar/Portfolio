import { useState, useEffect, useRef } from "react";
import PHOTO_SRC from "./assets/1721958609144.jpg";
import PROJ_IMG_1 from "./assets/1.jpg";
import PROJ_IMG_2 from "./assets/2.jpg";
import PROJ_IMG_3 from "./assets/3.jpg";
import PROJ_IMG_4 from "./assets/4.jpg";
import RESUME_PDF from "./assets/General.pdf";
import CERT_IMG_1 from "./assets/cert1.jpg";
import CERT_IMG_2 from "./assets/cert2.jpg";
import CERT_IMG_3 from "./assets/cert3.jpg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; min-height: 100vh; overflow-x: hidden; }
  #root, [data-reactroot] { width: 100%; min-height: 100vh; }

  :root {
    --bg: #000000;
    --bg2: #0a0a0a;
    --surface: rgba(10, 10, 10, 0.75);
    --neon: #00ffe7;
    --neon2: #ff2d78;
    --neon3: #ffe600;
    --text: #e8e8f0;
    --muted: #6b6b8a;
    --border: rgba(0,255,231,0.12);
    --glow: 0 0 30px rgba(0,255,231,0.25);
    --glow2: 0 0 30px rgba(255,45,120,0.25);
    --font-display: 'Syne', sans-serif;
    --font-mono: 'Space Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: #000000;
    color: var(--text);
    font-family: var(--font-display);
    overflow-x: hidden;
    cursor: default;
  }

  a, button, [role="button"] { cursor: pointer; }

  /* CUSTOM CURSOR (hidden) */
  .cursor-dot, .cursor-ring { display: none; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 90px;
    background: linear-gradient(180deg, rgba(5,5,9,0.95) 0%, transparent 100%);
    backdrop-filter: blur(8px);
  }
  .nav-logo {
    font-family: var(--font-mono); font-size: 1.1rem;
    color: var(--neon); letter-spacing: 0.08em;
    text-shadow: var(--glow);
  }
  .nav-logo span { color: var(--neon2); }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a {
    font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.1em;
    color: var(--muted); text-decoration: none; text-transform: uppercase;
    transition: color 0.3s;
    position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px;
    background: var(--neon); transition: width 0.3s;
  }
  .nav-links a:hover { color: var(--neon); }
  .nav-links a:hover::after { width: 100%; }

  /* COSMIC CANVAS BG */
  #particle-canvas {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    z-index: 0; pointer-events: none;
  }

  /* SECTIONS */
  section { position: relative; z-index: 1; }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    justify-content: space-between;
    padding: 0 90px; padding-top: 100px;
    overflow: hidden;
  }
  .hero-inner { max-width: 560px; text-align: left; }
  .hero-tag {
    font-family: var(--font-mono); font-size: 0.75rem;
    color: #000; letter-spacing: 0.18em; text-transform: uppercase;
    display: inline-flex; align-items: center; gap: 10px; margin-bottom: 32px;
    opacity: 0; animation: fadeUp 0.8s 0.3s forwards;
    background: var(--neon);
    padding: 7px 18px 7px 14px;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .hero-tag::before {
    content: '●'; font-size: 0.55rem; color: #000; opacity: 0.6;
    animation: dotPulse 1.5s ease-in-out infinite;
  }
  .hero-name {
    font-size: clamp(2.8rem, 5.5vw, 5.2rem); font-weight: 800; line-height: 1.0;
    letter-spacing: -0.03em; margin-bottom: 18px;
    opacity: 0; animation: fadeUp 0.9s 0.5s forwards;
    text-align: left; white-space: nowrap;
  }
  .hero-name .line2 {
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(232,232,240,0.6);
  }
  .hero-name .accent {
    color: var(--neon);
    -webkit-text-stroke: 0;
  }
  .hero-subtitle {
    font-family: var(--font-mono); font-size: clamp(0.95rem, 1.8vw, 1.2rem);
    color: var(--muted); margin-bottom: 48px; letter-spacing: 0.04em;
    opacity: 0; animation: fadeUp 0.9s 0.7s forwards;
    border-left: 2px solid var(--neon2);
    padding-left: 16px;
  }
  .hero-subtitle span { color: var(--neon2); }
  .hero-cta {
    display: flex; gap: 20px; flex-wrap: wrap;
    opacity: 0; animation: fadeUp 0.9s 0.9s forwards;
  }
  .btn-primary {
    padding: 15px 40px;
    color: var(--neon);
    font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
    background: rgba(0,255,231,0.07);
    border: 1px solid rgba(0,255,231,0.55);
    transition: background 0.25s, color 0.25s, box-shadow 0.25s;
    text-decoration: none; display: inline-block;
  }
  .btn-primary:hover {
    background: var(--neon);
    color: #000;
    box-shadow: 0 0 28px rgba(0,255,231,0.3);
  }
  .btn-outline {
    padding: 15px 40px;
    color: var(--neon2);
    font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
    background: rgba(255,45,120,0.05);
    border: 1px solid rgba(255,45,120,0.45);
    transition: background 0.25s, color 0.25s, box-shadow 0.25s;
    text-decoration: none; display: inline-block;
  }
  .btn-outline:hover {
    background: var(--neon2);
    color: #000;
    box-shadow: 0 0 28px rgba(255,45,120,0.3);
  }
  .btn-primary, .btn-outline { isolation: isolate; }
  .hero-scroll {
    position: absolute; bottom: 40px; left: 90px;
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted);
    letter-spacing: 0.2em; text-transform: uppercase;
    display: flex; align-items: center; gap: 16px;
    animation: pulse 2s infinite;
  }
  .hero-scroll::before {
    content: ''; display: block; width: 1px; height: 60px;
    background: linear-gradient(180deg, transparent, var(--neon));
    animation: scrollLine 2s infinite;
  }
  .hero-deco {
    flex-shrink: 0;
    opacity: 0; animation: fadeIn 1.2s 1.2s forwards;
  }

  /* HERO PHOTO BOX — enhanced cosmic frame */
  .glitch-box {
    width: 340px; height: 340px; position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .hero-photo-frame {
    width: 260px; height: 260px; position: relative;
    border-radius: 50%; overflow: hidden; z-index: 2;
    border: 2.5px solid rgba(0,255,231,0.55);
    box-shadow:
      0 0 0 6px rgba(0,255,231,0.07),
      0 0 40px rgba(0,255,231,0.35),
      0 0 90px rgba(255,45,120,0.18),
      inset 0 0 30px rgba(0,0,15,0.5);
    transition: box-shadow 0.5s;
  }
  .hero-photo-frame:hover {
    box-shadow:
      0 0 0 8px rgba(0,255,231,0.12),
      0 0 70px rgba(0,255,231,0.6),
      0 0 130px rgba(255,45,120,0.3),
      inset 0 0 30px rgba(0,0,15,0.5);
  }
  .hero-photo-frame img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center 10%;
    filter: contrast(1.08) saturate(1.15) brightness(1.02);
    transition: transform 0.5s, filter 0.5s;
    display: block;
  }
  .hero-photo-frame:hover img { transform: scale(1.06); filter: contrast(1.15) saturate(1.25) brightness(1.05); }
  .hero-photo-frame::after {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    background: linear-gradient(160deg, rgba(0,255,231,0.08) 0%, transparent 35%, rgba(0,0,15,0.3) 100%);
    pointer-events: none; z-index: 3;
  }
  /* Cosmic spinning rings on hero photo */
  .hero-cosmic-ring-outer {
    position: absolute; inset: -38px; border-radius: 50%;
    border: 2px solid transparent;
    background: linear-gradient(var(--bg), var(--bg)) padding-box,
      conic-gradient(from 0deg, var(--neon), transparent 30%, var(--neon2), transparent 65%, var(--neon3), transparent 85%, var(--neon)) border-box;
    animation: cosmicSpin 7s linear infinite;
    pointer-events: none; z-index: 1;
  }
  .hero-cosmic-ring-mid {
    position: absolute; inset: -22px; border-radius: 50%;
    border: 1px solid transparent;
    background: linear-gradient(var(--bg), var(--bg)) padding-box,
      conic-gradient(from 180deg, var(--neon2), transparent 40%, var(--neon), transparent 80%) border-box;
    animation: cosmicSpin 11s linear infinite reverse;
    pointer-events: none; z-index: 1;
  }
  .hero-cosmic-ring-inner {
    position: absolute; inset: -10px; border-radius: 50%;
    border: 1px dashed rgba(0,255,231,0.25);
    animation: cosmicSpin 14s linear infinite;
    pointer-events: none; z-index: 1;
  }
  .hero-cosmic-orbit {
    position: absolute; inset: -44px; border-radius: 50%;
    animation: cosmicSpin 8s linear infinite;
    pointer-events: none; z-index: 3;
  }
  .hero-cosmic-orbit::before, .hero-cosmic-orbit::after {
    content: ''; position: absolute; border-radius: 50%;
  }
  .hero-cosmic-orbit::before {
    width: 10px; height: 10px;
    background: var(--neon);
    box-shadow: 0 0 12px 3px var(--neon), 0 0 24px var(--neon);
    top: 2px; left: 50%; transform: translateX(-50%);
  }
  .hero-cosmic-orbit::after {
    width: 7px; height: 7px;
    bottom: 2px; left: 50%; transform: translateX(-50%);
    background: var(--neon2);
    box-shadow: 0 0 10px 2px var(--neon2), 0 0 22px var(--neon2);
  }
  .hero-cosmic-orbit2 {
    position: absolute; inset: -44px; border-radius: 50%;
    animation: cosmicSpin 13s linear infinite reverse;
    pointer-events: none; z-index: 3;
  }
  .hero-cosmic-orbit2::before {
    content: ''; position: absolute; width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--neon3);
    box-shadow: 0 0 10px 2px var(--neon3), 0 0 20px var(--neon3);
    top: 50%; right: 2px; transform: translateY(-50%);
  }
  .hero-cosmic-glow {
    position: absolute; inset: -20px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,231,0.18) 0%, rgba(255,45,120,0.09) 45%, transparent 68%);
    animation: haloBreath 3.5s ease-in-out infinite alternate;
    pointer-events: none; z-index: 0;
  }
  .hero-cosmic-aurora {
    position: absolute; inset: -55px; border-radius: 50%;
    background: conic-gradient(from 0deg,
      transparent 0%,
      rgba(0,255,231,0.06) 15%,
      transparent 30%,
      rgba(255,45,120,0.05) 50%,
      transparent 65%,
      rgba(255,230,0,0.04) 80%,
      transparent 100%
    );
    animation: cosmicSpin 20s linear infinite;
    pointer-events: none; z-index: 0;
    filter: blur(8px);
  }
  .grid-overlay {
    position: absolute; inset: -10px;
    background-image: linear-gradient(rgba(0,255,231,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,231,0.06) 1px, transparent 1px);
    background-size: 28px 28px;
    animation: gridPulse 4s ease-in-out infinite;
    border-radius: 50%; pointer-events: none; z-index: 1;
    mask-image: radial-gradient(circle, rgba(0,0,0,0.5) 60%, transparent 80%);
    -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,0.5) 60%, transparent 80%);
  }

  /* RESUME DOWNLOAD BUTTON (below hero photo) */
  .hero-resume-btn {
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 65px;
    padding: 10px 28px;
    font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--neon3);
    background: rgba(255,230,0,0.06);
    border: 1px solid rgba(255,230,0,0.45);
    clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px));
    text-decoration: none;
    transition: background 0.25s, color 0.25s, box-shadow 0.25s;
    cursor: pointer;
  }
  .hero-resume-btn:hover {
    background: var(--neon3);
    color: #000;
    box-shadow: 0 0 28px rgba(255,230,0,0.35);
  }
  .hero-resume-btn svg { width: 13px; height: 13px; flex-shrink: 0; }

  /* ABOUT */
  .about {
    padding: 120px 90px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  .section-label {
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--neon);
    letter-spacing: 0.3em; text-transform: uppercase;
    display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
  }
  .section-label::before { content: '//'; color: var(--neon2); }
  .section-title {
    font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 800; line-height: 1.1;
    letter-spacing: -0.02em; margin-bottom: 24px;
  }
  .about-text { color: var(--muted); line-height: 1.9; font-size: 1.05rem; }
  .about-text p + p { margin-top: 16px; }

  .about-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 40px;
  }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    padding: 24px; position: relative; overflow: hidden;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .stat-card:hover { border-color: var(--neon); box-shadow: var(--glow); }
  .stat-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,255,231,0.05), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .stat-card:hover::before { opacity: 1; }
  .stat-num {
    font-size: 2.5rem; font-weight: 800; color: var(--neon);
    font-family: var(--font-mono); line-height: 1;
  }
  .stat-label { font-size: 0.82rem; color: var(--muted); margin-top: 6px; }

  /* SKILLS */
  .skills { padding: 120px 90px; text-align: center; }
  .skills-title-row {
    display: flex; align-items: flex-end; justify-content: center;
    margin-bottom: 60px;
  }
  .skills-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 16px;
  }
  .skill-category-label {
    text-align: left;
  }
  .skill-chip {
    background: var(--surface); border: 1px solid var(--border);
    padding: 16px 20px; text-align: center;
    font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted);
    letter-spacing: 0.05em; position: relative; overflow: hidden;
    transition: all 0.3s;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  .skill-chip:hover {
    background: rgba(0,255,231,0.07); border-color: var(--neon);
    color: var(--neon); box-shadow: var(--glow);
    transform: translateY(-4px);
  }
  .skill-chip .skill-icon { font-size: 1.6rem; display: block; margin-bottom: 8px; }
  .skill-category { margin-bottom: 48px; }
  .skill-category-label {
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--neon2);
    letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 20px;
    display: flex; align-items: center; gap: 12px;
  }
  .skill-category-label::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }

  /* PROJECTS */
  .projects { padding: 120px 90px; }
  .projects-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
    margin-top: 60px;
  }
  .project-card {
    background: rgba(10,10,18,0.85);
    border: 1px solid var(--border);
    border-radius: 4px;
    position: relative; overflow: hidden;
    transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
    display: flex; flex-direction: column;
  }
  .project-card:hover {
    border-color: var(--neon); transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0,255,231,0.14);
  }
  .project-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--neon), var(--neon2));
    transform: scaleX(0); transition: transform 0.4s;
    transform-origin: left; z-index: 2;
  }
  .project-card:hover::before { transform: scaleX(1); }

  /* IMAGE PREVIEW TOP */
  .project-preview {
    width: 100%; height: 160px;
    overflow: hidden; position: relative; flex-shrink: 0;
  }
  .project-preview img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: top;
    display: block;
    transition: transform 0.5s ease;
  }
  .project-card:hover .project-preview img { transform: scale(1.05); }
  .project-preview-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(10,10,18,0.95) 100%);
    pointer-events: none;
  }
  .project-featured-badge {
    position: absolute; top: 14px; right: 14px;
    font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.15em;
    color: #000; background: var(--neon);
    padding: 5px 12px; font-weight: 700; text-transform: uppercase;
    clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
    z-index: 2;
  }

  /* TEXT CONTENT BELOW IMAGE */
  .project-card-content {
    padding: 18px 20px 16px;
    display: flex; flex-direction: column; flex: 1;
  }
  .project-num {
    font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon2);
    margin-bottom: 6px; letter-spacing: 0.15em;
  }
  .project-title {
    font-size: 1.05rem; font-weight: 700; margin-bottom: 8px;
    line-height: 1.3; color: var(--text);
    display: flex; align-items: center; gap: 10px;
  }
  .project-title::before {
    content: '</>'; font-family: var(--font-mono); font-size: 0.75rem;
    color: var(--neon); flex-shrink: 0;
  }
  .project-desc {
    color: var(--muted); font-size: 0.82rem; line-height: 1.65;
    margin-bottom: 14px; flex: 1;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .tag {
    font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon);
    background: rgba(0,255,231,0.07);
    border: 1px solid rgba(0,255,231,0.2); padding: 3px 9px; letter-spacing: 0.08em;
    border-radius: 2px;
  }

  /* BUTTONS */
  .project-links { display: flex; flex-direction: column; gap: 7px; }
  .project-link-btn {
    font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    padding: 9px 16px; border-radius: 3px;
    transition: all 0.3s;
  }
  .project-link-btn.live {
    background: rgba(0,255,231,0.10);
    border: 1px solid rgba(0,255,231,0.40);
    color: var(--neon);
  }
  .project-link-btn.live:hover {
    background: var(--neon); color: #000;
    box-shadow: 0 0 24px rgba(0,255,231,0.3);
  }
  .project-link-btn.github {
    background: transparent; border: none;
    color: var(--muted); font-size: 0.72rem; font-weight: 400;
    padding: 6px; letter-spacing: 0.1em;
  }
  .project-link-btn.github:hover { color: var(--neon); }
  .project-card.featured { grid-column: span 2; }
  .project-card.featured .project-preview { height: 200px; }

  /* CERTIFICATIONS */
  .certifications { padding: 120px 90px; }
  .cert-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
    margin-top: 60px;
  }
  .cert-card {
    background: rgba(10,10,18,0.85);
    border: 1px solid var(--border);
    border-radius: 4px;
    position: relative; overflow: hidden;
    transition: border-color 0.4s, transform 0.4s, box-shadow 0.4s;
    display: flex; flex-direction: column;
  }
  .cert-card:hover {
    border-color: var(--neon2); transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(255,45,120,0.14);
  }
  .cert-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--neon2), var(--neon3));
    transform: scaleX(0); transition: transform 0.4s;
    transform-origin: left; z-index: 2;
  }
  .cert-card:hover::before { transform: scaleX(1); }
  .cert-preview {
    width: 100%; height: 180px;
    overflow: hidden; position: relative; flex-shrink: 0;
  }
  .cert-preview img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: top;
    display: block;
    transition: transform 0.5s ease;
  }
  .cert-card:hover .cert-preview img { transform: scale(1.05); }
  .cert-preview-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(10,10,18,0.95) 100%);
    pointer-events: none;
  }
  .cert-card-content {
    padding: 18px 20px 16px;
    display: flex; flex-direction: column; flex: 1;
  }
  .cert-issuer {
    font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon2);
    margin-bottom: 6px; letter-spacing: 0.15em; text-transform: uppercase;
  }
  .cert-title {
    font-size: 1.0rem; font-weight: 700; margin-bottom: 8px;
    line-height: 1.3; color: var(--text);
    display: flex; align-items: center; gap: 10px;
  }
  .cert-title::before {
    content: '✦'; font-family: var(--font-mono); font-size: 0.75rem;
    color: var(--neon2); flex-shrink: 0;
  }
  .cert-date {
    color: var(--muted); font-family: var(--font-mono); font-size: 0.72rem;
    margin-bottom: 14px; flex: 1;
  }
  .cert-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .cert-tag {
    font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon2);
    background: rgba(255,45,120,0.07);
    border: 1px solid rgba(255,45,120,0.2); padding: 3px 9px; letter-spacing: 0.08em;
    border-radius: 2px;
  }
  .cert-link-btn {
    font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    padding: 9px 16px; border-radius: 3px;
    transition: all 0.3s;
    background: rgba(255,45,120,0.10);
    border: 1px solid rgba(255,45,120,0.40);
    color: var(--neon2);
  }
  .cert-link-btn:hover {
    background: var(--neon2); color: #000;
    box-shadow: 0 0 24px rgba(255,45,120,0.3);
  }

  /* EXPERIENCE */
  .experience { padding: 120px 90px; }
  .timeline { position: relative; margin-top: 60px; padding-left: 40px; }
  .timeline::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 1px;
    background: linear-gradient(180deg, var(--neon), var(--neon2), transparent);
  }
  .timeline-item { position: relative; margin-bottom: 56px; }
  .timeline-dot {
    position: absolute; left: -44px; top: 6px; width: 10px; height: 10px;
    background: var(--neon); border-radius: 50%;
    box-shadow: 0 0 12px var(--neon);
    animation: dotPulse 2s ease-in-out infinite;
  }
  .timeline-item:nth-child(even) .timeline-dot { background: var(--neon2); box-shadow: 0 0 12px var(--neon2); }
  .timeline-date {
    font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon);
    letter-spacing: 0.15em; margin-bottom: 8px;
  }
  .timeline-item:nth-child(even) .timeline-date { color: var(--neon2); }
  .timeline-role { font-size: 1.3rem; font-weight: 700; margin-bottom: 4px; }
  .timeline-company { font-family: var(--font-mono); font-size: 0.85rem; color: var(--muted); margin-bottom: 14px; }
  .timeline-desc { color: var(--muted); line-height: 1.8; font-size: 0.95rem; }

  /* CONTACT + MAIL ROW WRAPPER */
  .contact-mail-row {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    background: linear-gradient(180deg, transparent, rgba(0,255,231,0.03), transparent);
  }
  .contact-mail-row > section,
  .contact-mail-row > .mail-section {
    flex: 1;
  }

  /* CONTACT */
  .contact {
    padding: 120px 90px; text-align: center;
  }
  .contact-title { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 800; line-height: 1; margin-bottom: 24px; }
  .contact-title .outline { color: transparent; -webkit-text-stroke: 1.5px var(--text); }
  .contact-sub { color: var(--muted); font-size: 1.1rem; margin-bottom: 48px; font-family: var(--font-mono); }
  .contact-links { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; }
  .contact-link {
    font-family: var(--font-mono); font-size: 0.8rem; color: var(--text);
    text-decoration: none; border: 1px solid var(--border);
    padding: 16px 32px; letter-spacing: 0.12em; text-transform: uppercase;
    transition: all 0.3s; display: flex; align-items: center; gap: 10px;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }
  .contact-link:hover {
    border-color: var(--neon); color: var(--neon); background: rgba(0,255,231,0.05);
    box-shadow: var(--glow);
  }

  /* MAIL SECTION */
  .mail-section {
    padding: 100px 90px;
    border-left: 1px solid var(--border);
    background: linear-gradient(180deg, transparent, rgba(255,45,120,0.03), transparent);
  }
  .mail-form-wrap {
    max-width: 680px; margin: 60px auto 0;
  }
  .mail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .mail-field { display: flex; flex-direction: column; gap: 8px; }
  .mail-field.full { grid-column: span 2; }
  .mail-label {
    font-family: var(--font-mono); font-size: 0.68rem; color: var(--neon);
    letter-spacing: 0.2em; text-transform: uppercase;
  }
  .mail-input, .mail-textarea {
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text); font-family: var(--font-display); font-size: 0.95rem;
    padding: 14px 18px; outline: none;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    transition: border-color 0.3s, box-shadow 0.3s;
    width: 100%;
  }
  .mail-input::placeholder, .mail-textarea::placeholder { color: var(--muted); opacity: 0.7; }
  .mail-input:focus, .mail-textarea:focus {
    border-color: var(--neon); box-shadow: var(--glow);
  }
  .mail-textarea { resize: vertical; min-height: 140px; }
  .mail-send-btn {
    width: 100%; padding: 16px; background: linear-gradient(135deg, var(--neon), #00b8a8);
    color: #000; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase; border: none;
    clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
    transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
    margin-top: 8px;
  }
  .mail-send-btn:hover {
    background: linear-gradient(135deg, #fff, var(--neon));
    box-shadow: var(--glow); transform: translateY(-2px);
  }
  .mail-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .mail-status {
    font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.1em;
    margin-top: 16px; text-align: center; min-height: 20px;
  }
  .mail-status.success { color: var(--neon); }
  .mail-status.error { color: var(--neon2); }

  @media (max-width: 900px) {
    .mail-section { padding: 80px 28px; }
    .mail-grid { grid-template-columns: 1fr; }
    .mail-field.full { grid-column: span 1; }
  }

  /* FOOTER */
  footer {
    padding: 40px 60px; border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
  }
  footer span { font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); }

  /* SCROLL REVEAL */
  .reveal {
    opacity: 0; transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* TYPING */
  .typing-cursor::after {
    content: '|'; color: var(--neon);
    animation: blink 1s step-end infinite;
  }

  /* NOISE OVERLAY */
  .noise {
    position: fixed; inset: 0; z-index: 200; pointer-events: none;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* KEYFRAMES */
  @keyframes cosmicSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes haloBreath {
    from { opacity: 0.6; transform: scale(0.97); }
    to   { opacity: 1;   transform: scale(1.04); }
  }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes scrollLine { 0% { height: 60px; opacity: 1; } 100% { height: 0; opacity: 0; } }
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 12px var(--neon); }
    50% { transform: scale(1.5); box-shadow: 0 0 24px var(--neon); }
  }
  @keyframes glitch1 {
    0%, 90%, 100% { clip-path: none; transform: none; }
    92% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translate(-4px, 0); }
    94% { clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%); transform: translate(4px, 0); }
    96% { clip-path: none; transform: none; }
  }
  @keyframes glitch2 {
    0%, 90%, 100% { clip-path: none; transform: none; opacity: 0; }
    91% { opacity: 0.8; }
    92% { clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%); transform: translate(6px, 0); }
    94% { clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); transform: translate(-6px, 0); }
    96% { opacity: 0; }
  }
  @keyframes gridPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes scanline {
    0% { top: -100%; } 100% { top: 200%; }
  }

  /* SCANLINE */
  .scanline {
    position: fixed; left: 0; right: 0; height: 2px;
    background: linear-gradient(transparent, rgba(0,255,231,0.1), transparent);
    pointer-events: none; z-index: 201;
    animation: scanline 8s linear infinite;
  }

  @media (max-width: 900px) {
    nav { padding: 20px 28px; }
    .nav-links { display: none; }
    .hero { padding: 0 28px; padding-top: 100px; flex-direction: column; align-items: center; justify-content: center; gap: 60px; }
    .hero-inner { max-width: 100%; text-align: center; }
    .hero-name { white-space: normal; text-align: center; }
    .hero-subtitle { border-left: none; border-top: 2px solid var(--neon2); padding-left: 0; padding-top: 12px; }
    .hero-cta { justify-content: center; }
    .hero-deco { display: flex; justify-content: center; }
    .glitch-box { width: 260px; height: 260px; }
    .hero-photo-frame { width: 200px; height: 200px; }
    .about { grid-template-columns: 1fr; padding: 80px 28px; }
    .skills { padding: 80px 28px; }
    .projects { padding: 80px 28px; }
    .projects-grid { grid-template-columns: 1fr; }
    .project-card.featured { grid-column: span 1; }
    .certifications { padding: 80px 28px; }
    .cert-grid { grid-template-columns: 1fr; }
    .experience { padding: 80px 28px; }
    .contact { padding: 80px 28px; }
    .contact-mail-row { flex-direction: column; }
    .mail-section { border-left: none; border-top: 1px solid var(--border); }
    footer { padding: 28px; flex-direction: column; gap: 12px; text-align: center; }
    .hero-scroll { left: 28px; }
  }
`;

const SKILLS = {
  "Offensive Security": [
    { icon: "🐉", name: "Kali Linux" }, { icon: "🔍", name: "Nmap" },
    { icon: "💣", name: "Metasploit" }, { icon: "🕷️", name: "Burp Suite" },
    { icon: "🪝", name: "SQLMap" }, { icon: "✈️", name: "Aircrack-ng" },
  ],
  "Defensive Security": [
    { icon: "🛡️", name: "Wireshark" }, { icon: "🔥", name: "Snort IDS" },
    { icon: "📊", name: "Splunk" }, { icon: "🔒", name: "pfSense" },
    { icon: "🧱", name: "Fail2Ban" }, { icon: "👁️", name: "OSSEC" },
  ],
  "Tools & Platforms": [
    { icon: "🐧", name: "Linux" }, { icon: "🐍", name: "Python" },
    { icon: "🌐", name: "Tor / VPN" }, { icon: "🔑", name: "GPG / OpenSSL" },
    { icon: "🐙", name: "GitHub" }, { icon: "🕵️", name: "OSINT Tools" },
  ],
};

const CERTIFICATIONS = [
  {
    num: "C01",
    title: "Geo-data Sharing and Cyber Security",
    issuer: "ISRO / IIRS, Dehradun",
    date: "Issued: Dec 2023  |  Duration: 28 Nov - 11 Dec 2023  |  15 Hours",
    tags: ["Cyber Security", "Geo-data", "ISRO"],
    img: CERT_IMG_1, link: "https://drive.google.com/file/d/107navbiLhJFyzMM3n0jW2d4S3PoTwpM3/view",
  },
  {
    num: "C02",
    title: "C Programming Language",
    issuer: "CSE Pathshala",
    date: "Issued: 11 Aug 2025  |  Cert No: CP-20250607-RCPL-008",
    tags: ["C Programming", "Live Training", "35+ Hours"],
    img: CERT_IMG_2, link: "https://drive.google.com/file/d/1WrTt-hZVu7Br5l0QWsX5ToEJuueVN4VI/view",  
  },
  {
    num: "C03",
    title: "Data Structures and Algorithm",
    issuer: "LPU / iamneo",
    date: "Issued: 05 Dec 2024  |  Duration: Aug - Dec 2024  |  72 Hours",
    tags: ["DSA", "Algorithms", "72 Hours"],
    img: CERT_IMG_3, link: "https://drive.google.com/file/d/1nyT_sJrNlvG3btbmSKeY5zyU7OvoXjTI/view", 
  },
];

const PROJECTS = [
  {
    num: "001", title: "PhantomScan — Automated Recon Tool",
    desc: "Custom-built network reconnaissance tool that automates subdomain enumeration, port scanning, and vulnerability fingerprinting. Designed for bug bounty and CTF workflows.",
    tags: ["Python", "Nmap", "Shodan API", "OSINT", "Linux"],
    featured: true, img: PROJ_IMG_1,
  },
  {
    num: "002", title: "HoneyGrid — Honeypot Network",
    desc: "Deployed a distributed honeypot network to capture and analyze attacker TTPs. Includes real-time alerting dashboard and threat intelligence logging.",
    tags: ["Python", "Docker", "ELK Stack", "Cowrie"],
    img: PROJ_IMG_2,
  },
  {
    num: "003", title: "CipherVault — Password Audit Tool",
    desc: "Password strength auditor and hash cracking framework using wordlists, rules, and GPU acceleration. Built for security assessments and awareness training.",
    tags: ["Python", "Hashcat", "John the Ripper", "Bash"],
    img: PROJ_IMG_3,
  },
  {
    num: "004", title: "NetGuard — IDS Dashboard",
    desc: "Snort-based intrusion detection system with a custom web dashboard for real-time traffic analysis, alert classification, and incident reporting.",
    tags: ["Snort", "Python", "React", "Wireshark"],
    img: PROJ_IMG_4,
  },
];

const EXPERIENCE = [
  {
    date: "2024 — Present",
    role: "B.Tech in Computer Science (Cyber Security)",
    company: "Lovely Professional University · Punjab, India",
    desc: "Pursuing a Bachelor's degree with specialization in Cyber Security. Studying network security, ethical hacking, cryptography, and digital forensics while participating in CTF competitions and building security tools."
  },
  {
    date: "2021 — 2023",
    role: "Higher Secondary Education (Class XII)",
    company: "Shri Rani Saraswati Vidya Mandir · Bihar, India",
    desc: "Completed higher secondary education with focus on Mathematics and logical reasoning, which built a strong analytical foundation for cyber security and systems thinking."
  },
  {
    date: "2019 — 2021",
    role: "Secondary Education (Class X)",
    company: "Shri Rani Saraswati Vidya Mandir · Bihar, India",
    desc: "Completed secondary education while developing early interest in computers, networking, and how digital systems work — sparking curiosity that led to a career in security."
  }
];

const TYPING_STRINGS = [
  "Cyber Security Analyst",
  "Penetration Tester",
  "Ethical Hacker",
  "Network Security Engineer",
  "CTF Player",
];

function useTypingEffect(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setIdx(i => (i + 1) % strings.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, strings, speed, pause]);

  return display;
}

function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;

    // Dynamically load Three.js then boot the scene
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => bootThree(canvas);
    document.head.appendChild(script);

    let animId;
    function bootThree(canvas) {
      const THREE = window.THREE;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
      camera.position.z = 600;

      // ── Star fields (4 layers: cyan, white, purple, gold) ─────────────
      function makeStarField(count, spread, size, color) {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread;
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.85, sizeAttenuation: true });
        return new THREE.Points(geo, mat);
      }
      const stars1 = makeStarField(4000, 3000, 1.2, 0x00d4ff);
      const stars2 = makeStarField(2000, 2500, 0.8, 0xffffff);
      const stars3 = makeStarField(800,  2000, 1.8, 0x7b2fff);
      const stars4 = makeStarField(300,  1500, 2.5, 0xffd700);
      [stars1, stars2, stars3, stars4].forEach(s => scene.add(s));

      // ── Nebula particle clouds ────────────────────────────────────────
      function makeNebula(count, radius, color, opacity) {
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = radius * (0.3 + Math.random() * 0.7);
          pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
          pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3;
          pos[i * 3 + 2] = r * Math.cos(phi);
        }
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const mat = new THREE.PointsMaterial({ color, size: 3, transparent: true, opacity, sizeAttenuation: true });
        return new THREE.Points(geo, mat);
      }
      const neb1 = makeNebula(600, 400, 0x00d4ff, 0.15);
      const neb2 = makeNebula(400, 350, 0x7b2fff, 0.12);
      scene.add(neb1, neb2);

      // ── Floating wireframe geometries ─────────────────────────────────
      function addFloatingGeo(GeoClass, args, color, x, y, z, speed) {
        const geo = new GeoClass(...args);
        const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.12 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        mesh.userData = { speed, rx: Math.random() * 0.005, ry: Math.random() * 0.005 };
        scene.add(mesh);
        return mesh;
      }
      const geos = [
        addFloatingGeo(THREE.OctahedronGeometry,  [60], 0x00d4ff, -200,  100, -200, 0.003),
        addFloatingGeo(THREE.IcosahedronGeometry, [40], 0x7b2fff,  250,  -80, -150, 0.004),
        addFloatingGeo(THREE.TetrahedronGeometry, [50], 0xffd700, -150, -150, -100, 0.005),
        addFloatingGeo(THREE.OctahedronGeometry,  [30], 0xffffff,  180,  160, -180, 0.003),
      ];

      // ── Constellation lines ────────────────────────────────────────────
      const lineMat = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.08 });
      const linePoints = [];
      for (let i = 0; i < 20; i++)
        linePoints.push(new THREE.Vector3(
          (Math.random() - 0.5) * 800,
          (Math.random() - 0.5) * 600,
          (Math.random() - 0.5) * 200
        ));
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      scene.add(new THREE.Line(lineGeo, lineMat));

      // ── Mouse + scroll parallax ────────────────────────────────────────
      let scrollY = 0, mouseX = 0, mouseY = 0;
      const onScroll = () => { scrollY = window.scrollY; };
      const onMouse  = (e) => {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("scroll", onScroll);
      window.addEventListener("mousemove", onMouse);

      // ── Resize ────────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      // ── Render loop ───────────────────────────────────────────────────
      const clock = new THREE.Clock();
      function animate() {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        stars1.rotation.y =  t * 0.015; stars1.rotation.x = t * 0.005;
        stars2.rotation.y = -t * 0.01;
        stars3.rotation.z =  t * 0.008;
        stars4.rotation.x =  t * 0.012;

        neb1.rotation.y =  t * 0.02;
        neb2.rotation.y = -t * 0.018;

        geos.forEach(g => {
          g.rotation.x += g.userData.rx;
          g.rotation.y += g.userData.ry;
          g.position.y += Math.sin(t * g.userData.speed + g.position.x) * 0.05;
        });

        camera.position.x += (mouseX * 60 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 40 - camera.position.y) * 0.03;
        camera.position.z  = 600 - scrollY * 0.15;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }
      animate();

      // cleanup stored so outer cleanup can call it
      canvas._threeCleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    }

    return () => {
      if (ref.current && ref.current._threeCleanup) ref.current._threeCleanup();
    };
  }, []);

  return (
    <canvas
      id="particle-canvas"
      ref={ref}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
      if (ring.current) {
        setTimeout(() => {
          if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; }
        }, 60);
      }
    };
    const over = () => { dot.current?.classList.add("hover"); ring.current?.classList.add("hover"); };
    const out = () => { dot.current?.classList.remove("hover"); ring.current?.classList.remove("hover"); };
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, .skill-chip, .project-card, .stat-card").forEach(el => {
      el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out);
    });
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return { dot, ring };
}

function MailSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("error:Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error:Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setStatus("");
    // Simulate sending (replace with real API call e.g. EmailJS, Resend, etc.)
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setStatus("success:Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const [statusType, statusMsg] = status.includes(":") ? status.split(":") : ["", status];

  return (
    <section className="mail-section reveal" id="mail">
      <div style={{ textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center" }}>Get In Touch</div>
        <h2 className="section-title">
          Send Me a<br /><span style={{ color: "var(--neon2)" }}>Message.</span>
        </h2>
        <p style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", marginTop: "12px" }}>
          Have a project in mind? Let's talk.
        </p>
      </div>
      <div className="mail-form-wrap">
        <div className="mail-grid">
          <div className="mail-field">
            <label className="mail-label">Name *</label>
            <input
              className="mail-input" name="name" placeholder="Harsh Kumar"
              value={form.name} onChange={handleChange}
            />
          </div>
          <div className="mail-field">
            <label className="mail-label">Email *</label>
            <input
              className="mail-input" name="email" type="email" placeholder="you@example.com"
              value={form.email} onChange={handleChange}
            />
          </div>
          <div className="mail-field full">
            <label className="mail-label">Subject</label>
            <input
              className="mail-input" name="subject" placeholder="Project Inquiry"
              value={form.subject} onChange={handleChange}
            />
          </div>
          <div className="mail-field full">
            <label className="mail-label">Message *</label>
            <textarea
              className="mail-textarea" name="message" placeholder="Tell me about your project..."
              value={form.message} onChange={handleChange}
            />
          </div>
        </div>
        <button className="mail-send-btn" onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "→ Send Message"}
        </button>
        {statusMsg && (
          <div className={`mail-status ${statusType}`}>{statusMsg}</div>
        )}
      </div>
    </section>
  );
}


function CosmicStarRing() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 340, H = 340;
    canvas.width = W; canvas.height = H;
    const cx = W / 2, cy = H / 2;

    const stars = Array.from({ length: 60 }, (_, i) => ({
      angle: (i / 60) * Math.PI * 2 + Math.random() * 0.3,
      r: 148 + (Math.random() - 0.5) * 28,
      size: Math.random() * 2.2 + 0.5,
      speed: (Math.random() * 0.3 + 0.15) * (Math.random() > 0.5 ? 1 : -1) * 0.008,
      color: ['#00ffe7','#ff2d78','#ffe600','#ffffff','#7b2fff'][Math.floor(Math.random() * 5)],
      alpha: Math.random() * 0.6 + 0.4,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.05 + 0.02,
    }));

    let animId;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.angle += s.speed;
        s.twinkle += s.twinkleSpeed;
        const x = cx + Math.cos(s.angle) * s.r;
        const y = cy + Math.sin(s.angle) * s.r;
        const alpha = s.alpha * (0.55 + 0.45 * Math.sin(s.twinkle));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.size * 5;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0, width: '340px', height: '340px',
        pointerEvents: 'none', zIndex: 4, borderRadius: '50%',
      }}
    />
  );
}

export default function Portfolio() {
  const typing = useTypingEffect(TYPING_STRINGS);
  useReveal();
  const { dot, ring } = useCursor();
  const [previewImg, setPreviewImg] = useState(null);

  return (
    <>
      <style>{styles}</style>

      {/* CERTIFICATE IMAGE PREVIEW MODAL */}
      {previewImg && (
        <div
          onClick={() => setPreviewImg(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "zoom-out",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{ position: "relative", display: "inline-block" }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={previewImg}
              alt="Certificate Preview"
              style={{
                maxWidth: "90vw", maxHeight: "88vh",
                borderRadius: "6px",
                border: "2px solid rgba(255,45,120,0.55)",
                boxShadow: "0 0 80px rgba(255,45,120,0.3), 0 0 160px rgba(0,255,231,0.15)",
                display: "block",
              }}
            />
            <button
              onClick={() => setPreviewImg(null)}
              style={{
                position: "absolute", top: -18, right: -18,
                width: 36, height: 36,
                background: "var(--neon2)", border: "none", borderRadius: "50%",
                color: "#000", fontSize: "1.1rem", fontWeight: 700,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(255,45,120,0.5)",
                lineHeight: 1,
              }}
            >✕</button>
          </div>
        </div>
      )}
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
      <div className="noise" />
      <div className="scanline" />
      <ParticleCanvas />

      {/* NAV */}
      <nav>
        <div className="nav-logo">PK<span>.</span>Kumar</div>
        <ul className="nav-links">
          {["About", "Skills", "Projects", "Certifications", "Experience", "Contact", "Mail"].map(n => (
            <li key={n}><a href={`#${n.toLowerCase()}`}>{n}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-tag">Available for Security Roles · India</div>
          <h1 className="hero-name">
            <div>Piyush</div>
            <div className="line2">Kumar <span className="accent">.</span></div>
          </h1>
          <p className="hero-subtitle">
            <span className="typing-cursor">{typing}</span>
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-outline">Let's Connect</a>
          </div>
        </div>
        <div className="hero-deco">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="glitch-box">
              <div className="hero-cosmic-aurora" />
              <div className="hero-cosmic-glow" />
              <div className="hero-cosmic-ring-outer" />
              <div className="hero-cosmic-ring-mid" />
              <div className="hero-cosmic-ring-inner" />
              <div className="hero-cosmic-orbit" />
              <div className="hero-cosmic-orbit2" />
              <div className="grid-overlay" />
              <CosmicStarRing />
              <div className="hero-photo-frame">
                <img src={PHOTO_SRC} alt="Piyush Kumar" />
              </div>
            </div>
            <a
              href={RESUME_PDF}
              download="Piyush_Kumar_Resume.pdf"
              className="hero-resume-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </div>
        </div>
        <div className="hero-scroll">Scroll</div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="reveal">
          <div className="section-label">About Me</div>
          <h2 className="section-title">I secure things<br />that <span style={{ color: "var(--neon)" }}>matter.</span></h2>
          <div className="about-text">
  <p>
    I'm Piyush Kumar, a Computer Science student from India specializing in Cyber Security, with a strong interest in ethical hacking, network defense, and uncovering vulnerabilities before the bad actors do.
  </p>
  
  <p>
    I enjoy understanding how systems break — from web application exploits and network intrusions to malware analysis and social engineering. My primary focus is on penetration testing, CTF challenges, and building security tooling while continuously sharpening my offensive and defensive skills.
  </p>
  
  <p>
    Currently, I am working on security research projects, participating in CTF competitions, and exploring real-world vulnerability assessment to strengthen my understanding of modern threat landscapes and security engineering.
  </p>
</div>
        </div>

        <div className="reveal" style={{ transitionDelay: "0.2s" }}>
          <div className="about-stats">
            {[
              ["2+", "Years in Cyber Security"], ["10+", "Security Projects"],
              ["30+", "CTF Challenges Solved"], ["∞", "Always Hunting"],
            ].map(([n, l]) => (
              <div className="stat-card" key={l}>
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills" id="skills">
        <div className="reveal" style={{ marginBottom: 60 }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Tech Stack</div>
          <h2 className="section-title">Tools of the<br /><span style={{ color: "var(--neon2)" }}>Trade.</span></h2>
        </div>
        {Object.entries(SKILLS).map(([cat, items], ci) => (
          <div className="skill-category reveal" key={cat} style={{ transitionDelay: `${ci * 0.15}s` }}>
            <div className="skill-category-label">{cat}</div>
            <div className="skills-grid">
              {items.map(s => (
                <div className="skill-chip" key={s.name}>
                  <span className="skill-icon">{s.icon}</span>
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* PROJECTS */}
      <section className="projects" id="projects">
        <div className="reveal">
          <div className="section-label">Selected Work</div>
          <h2 className="section-title">Projects that<br /><span style={{ color: "var(--neon)" }}>Matter.</span></h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div className={`project-card reveal ${p.featured ? "featured" : ""}`} key={p.num} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="project-preview">
                <img src={p.img} alt={p.title} />
                <div className="project-preview-overlay" />
                {p.featured && <div className="project-featured-badge">★ Featured</div>}
              </div>
              <div className="project-card-content">
                <div className="project-num">{p.num}</div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">{p.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                <div className="project-links">
                  <a href="#" className="project-link-btn live">▶ Go Live</a>
                  <a href="#" className="project-link-btn github">⌥ View on GitHub →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="certifications" id="certifications">
        <div className="reveal">
          <div className="section-label">Credentials</div>
          <h2 className="section-title">Certifications &<br /><span style={{ color: "var(--neon2)" }}>Achievements.</span></h2>
        </div>
        <div className="cert-grid">
          {CERTIFICATIONS.map((c, i) => (
            <div className="cert-card reveal" key={c.num} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div
                className="cert-preview"
                onClick={() => setPreviewImg(c.img)}
                style={{ cursor: "zoom-in" }}
              >
                <img src={c.img} alt={c.title} />
                <div className="cert-preview-overlay" />

              </div>
              <div className="cert-card-content">
                <div className="cert-issuer">{c.issuer}</div>
                <h3 className="cert-title">{c.title}</h3>
                <div className="cert-date">{c.date}</div>
                <div className="cert-tags">{c.tags.map(t => <span className="cert-tag" key={t}>{t}</span>)}</div>
                <a href={c.link} className="cert-link-btn" target="_blank" rel="noopener noreferrer">⌥ View Certificate →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience" id="experience">
        <div className="reveal">
          <div className="section-label">Career Path</div>
          <h2 className="section-title">Experience &<br /><span style={{ color: "var(--neon2)" }}>Growth.</span></h2>
        </div>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <div className="timeline-item reveal" key={e.role} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="timeline-dot" />
              <div className="timeline-date">{e.date}</div>
              <div className="timeline-role">{e.role}</div>
              <div className="timeline-company">{e.company}</div>
              <div className="timeline-desc">{e.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT + MAIL SIDE BY SIDE */}
      <div className="contact-mail-row">
        <section className="contact" id="contact">
          <div className="reveal">
            <h2 className="contact-title">
              <span className="outline">Let's</span><br />
              <span>Work Together.</span>
            </h2>
            <p className="contact-sub">Currently open to security roles, bug bounty &amp; freelance assessments.</p>
            <div className="contact-links">
              <a href="mailto:piyushkumar@example.com" className="contact-link">✉ piyushkumar@example.com</a>
              <a href="https://www.linkedin.com/in/piyushkumar/" className="contact-link">⌥ LinkedIn</a>
              <a href="https://github.com/piyushkumar" className="contact-link">◎ GitHub</a>
              <a href={RESUME_PDF} download="Piyush_Kumar_Resume.pdf" className="contact-link">↓ Download Resume</a>
            </div>
          </div>
        </section>

        {/* SEND MAIL */}
        <MailSection />
      </div>

      {/* FOOTER */}
      <footer>
        <span>© 2025 Piyush Kumar</span>
        <span style={{ color: "var(--neon)", fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}>
          DESIGNED BY PIYUSH KUMAR | CYBER SECURITY
        </span>
        <span>Cyber Security Analyst</span>
      </footer>
    </>
  );
}