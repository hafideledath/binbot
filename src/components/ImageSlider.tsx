import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 400px;
  margin: 2rem auto;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 300px;
    margin: 1rem auto;
  }
`;

const SlideContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const SlideImage = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 1;
`;

const SlideCaption = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 1rem;
  text-align: center;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

const BaseNavButton = styled.button<{ disabled: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${props => props.disabled ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.5)'};
  color: ${props => props.disabled ? '#666' : 'white'};
  border: none;
  width: 40px;
  height: 40px;
  min-width: 40px;
  padding: 0;
  margin: 0;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  z-index: 3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  font-size: 1.2rem;
  line-height: 1;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  &:hover {
    background: ${props => props.disabled ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.8)'};
  }
`;

const PrevButton = styled(BaseNavButton)`
  left: 20px;
`;

const NextButton = styled(BaseNavButton)`
  right: 20px;
`;

const slides = [
  {
    image: "/food_insecurity.jpg",
    caption: "864 million people face severe food insecurity globally [8]"
  },
  {
    image: "/child_malnutrition.jpg",
    caption: "Malnutrition affects nearly 150 million children worldwide [9]"
  },
  {
    image: "/food_waste.jpg",
    caption: "1/3 of all food produced is wasted while many go hungry [10]"
  },
  {
    image: "/climate_change.jpg",
    caption: "Food waste contributes to greenhouse gas emissions and climate change [11]"
  }
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleAnimationComplete = () => {
    setIsTransitioning(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      zIndex: 1
    }),
    center: {
      x: '0%',
      zIndex: 2
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      zIndex: 1
    })
  };

  return (
    <SliderContainer>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <SlideContainer
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          onAnimationComplete={handleAnimationComplete}
        >
          <SlideImage
            src={slides[currentIndex].image}
          />
          <SlideCaption>
            {slides[currentIndex].caption}
          </SlideCaption>
        </SlideContainer>
      </AnimatePresence>
      <PrevButton 
        onClick={prevSlide} 
        aria-label="Previous slide" 
        disabled={isTransitioning}
      >
        ←
      </PrevButton>
      <NextButton 
        onClick={nextSlide} 
        aria-label="Next slide"
        disabled={isTransitioning}
      >
        →
      </NextButton>
    </SliderContainer>
  );
};

export default ImageSlider;
