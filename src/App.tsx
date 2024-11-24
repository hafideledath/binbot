import React from 'react';
import RecycleIcon from './components/RecycleIcon';
import Section from './components/Section';
import { sections } from './data/sections';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <RecycleIcon />
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.content}
        />
      ))}
    </div>
  );
};

export default App;
