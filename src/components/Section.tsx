import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import styled, { createGlobalStyle } from 'styled-components';

const PrototypeContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;

  @media (max-width: 768px) {
    margin: 1rem auto;
  }

  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;

const InfoBox = styled(motion.div)`
  position: absolute;
  background: #232323bb;
  border: 2px solid #ccccccbb;
  border-radius: 8px;
  padding: 0.75rem;
  width: 120px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  line-height: 1.4;

  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background: #cccccc;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -12px;
    left: -12px;
    font-weight: bold;
    color: #232323bb;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.5rem;
  }
`;

const Box1 = styled(InfoBox)`
  top: 0;
  left: 10px;
  &::before { content: '1'; }
`;

const Box2 = styled(InfoBox)`
  top: 0;
  right: 10px;
  &::before { content: '2'; }
`;

const Box3 = styled(InfoBox)`
  bottom: 0;
  left: 10px;
  &::before { content: '3'; }
`;

const Box4 = styled(InfoBox)`
  bottom: 0;
  right: 10px;
  &::before { content: '4'; }
`;

const SectionContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StoryContent = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const StoryTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.5em;
    margin-bottom: 0.8em;
  }
`;

const GlobalStyle = createGlobalStyle`
  .story-text {
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 1.5em;
    text-align: left;

    @media (max-width: 768px) {
      font-size: 1em;
      line-height: 1.5;
      margin-bottom: 1.2em;
    }
  }
`;

interface SectionProps {
  id: string;
  title: string;
  content: string;
}

const Section: React.FC<SectionProps> = ({ id, title, content }) => {
  const [timeOnSite, setTimeOnSite] = useState(0);

  useEffect(() => {
    const startTime = sessionStorage.getItem('siteStartTime');
    if (!startTime) {
      sessionStorage.setItem('siteStartTime', Date.now().toString());
    }

    const interval = setInterval(() => {
      const start = parseInt(sessionStorage.getItem('siteStartTime') || Date.now().toString());
      const secondsElapsed = Math.floor((Date.now() - start) / 1000);
      setTimeOnSite(secondsElapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatContent = (content: string, elapsedTime: number) => {
    if (content.includes('{number}')) {
      const tonnesPerYear = 2700000;
      const tonnesPerSecond = tonnesPerYear / (365 * 24 * 60 * 60);
      const wasteProduced = (tonnesPerSecond * elapsedTime).toFixed(2);
      return content.replace('{number}', wasteProduced);
    }
    if (id === 'problem') {
      const wastedTonnes = (timeOnSite * 0.1036910198).toFixed(2);
      return content.replace('{number}', `${wastedTonnes} tonnes`);
    }
    return content;
  };

  const boxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <GlobalStyle />
      <SectionContainer className="story-section" id={id}>
        <StoryContent 
          className="story-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <StoryTitle className="story-title">{title}</StoryTitle>
          {id === 'sources' ? (
            <p className="story-text" style={{ 
              whiteSpace: 'pre-line',
              margin: 0
            }}>
              {formatContent(content, timeOnSite)}
            </p>
          ) : (
            <p className="story-text">{formatContent(content, timeOnSite)}</p>
          )}
          {id === 'impact' && <ImageSlider />}
          {id === 'solution' && (
            <PrototypeContainer>
              <motion.img
                src="/Prototype.svg"
                alt="Smart Bin Prototype Design"
                style={{ 
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto'
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
              <Box1
                initial="hidden"
                whileInView="visible"
                variants={boxVariants}
                transition={{ delay: 0.3 }}
              >
                Interface and screen
              </Box1>
              <Box2
                initial="hidden"
                whileInView="visible"
                variants={boxVariants}
                transition={{ delay: 0.4 }}
              >
                Camera / scanner
              </Box2>
              <Box3
                initial="hidden"
                whileInView="visible"
                variants={boxVariants}
                transition={{ delay: 0.5 }}
              >
                House team selection
              </Box3>
              <Box4
                initial="hidden"
                whileInView="visible"
                variants={boxVariants}
                transition={{ delay: 0.6 }}
              >
                Trash categories
              </Box4>
            </PrototypeContainer>
          )}
        </StoryContent>
      </SectionContainer>
    </>
  );
};

export default Section;
