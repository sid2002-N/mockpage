'use client';

import React, { useRef, useState } from 'react';
import styles from '../page.module.css';

type GlareVars = React.CSSProperties & {
  '--glare-x': string;
  '--glare-y': string;
};

export default function QualityBadge() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [showVideo, setShowVideo] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;

    const rect = badgeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;
    setRotation({ x: rotateX, y: rotateY });

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlare({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  const handleBadgeClick = () => setShowVideo(true);
  const handleClose = () => setShowVideo(false);

  const badgeStyle: GlareVars = {
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    '--glare-x': `${glare.x}%`,
    '--glare-y': `${glare.y}%`,
  };

  const wakeStyle: React.CSSProperties = {
    left: `${glare.x}%`,
    top: `${glare.y}%`,
  };

  return (
    <>
      <div
        ref={badgeRef}
        className={styles.qualityBadge}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={badgeStyle}
      >
        <div className={styles.liquidWake} style={wakeStyle} />

        <div className={styles.badgeContent}>
          <span className={styles.badgeIcon}>✓</span>
          <span className={styles.badgeText}>Quality Authenticated</span>
          <span className={styles.badgeDivider}>|</span>
          <button
            className={styles.badgeLink}
            onClick={handleBadgeClick}
            type="button"
          >
            Watch Manufacturing Process →
          </button>
        </div>
      </div>

      {showVideo && (
        <div className={styles.videoModal} onClick={handleClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={handleClose}>
              ×
            </button>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/5Ou8olYntuc"
                title="Manufacturing Process"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
