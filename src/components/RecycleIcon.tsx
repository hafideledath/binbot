import React, { useEffect, useRef } from 'react';

const RecycleIcon: React.FC = () => {
  const iconRef = useRef<HTMLDivElement>(null);
  let currentRotation = 0;
  let targetRotation = 0;
  let velocity = 0;
  const friction = 0.4;
  const sensitivity = 0.1;

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let animationFrameId: number;

    const updateRotation = () => {
      const rotationDiff = targetRotation - currentRotation;
      velocity += rotationDiff * 0.1;
      velocity *= friction;
      currentRotation += velocity;

      if (iconRef.current) {
        iconRef.current.style.transform = `rotate(${currentRotation}deg)`;
      }

      if (Math.abs(velocity) > 0.01 || Math.abs(rotationDiff) > 0.01) {
        animationFrameId = requestAnimationFrame(updateRotation);
      }
    };

    const handleScroll = () => {
      const scrollDelta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      targetRotation += scrollDelta * sensitivity;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateRotation);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={iconRef} className="recycle-icon">
      <img src="/recycle.svg" alt="Recycle Icon" />
    </div>
  );
};

export default RecycleIcon;
