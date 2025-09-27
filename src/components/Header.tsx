
import React from 'react';

const TechBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-gray-700/50 text-purple-300 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
    {children}
  </div>
);

const Header: React.FC = () => {
  return (
    <header className="text-center bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/20 p-6 sm:p-8">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
        🎯 Misión 1: Análisis de Texto y Sentimientos
      </h1>
      <p className="mt-2 text-lg text-gray-300 font-semibold">
        Bootcamp IA Intermedio L2-G120-C8-IA-I-P | Jhon Fragozo
      </p>
      <p className="mt-2 text-gray-400 max-w-3xl mx-auto">
        Demostración integrada de 5 ejercicios con tecnologías avanzadas de NLP e IA, ahora impulsada por Gemini.
      </p>
      <div className="mt-6 flex justify-center flex-wrap gap-2 sm:gap-3">
        <TechBadge>🐍 Python</TechBadge>
        <TechBadge>🤖 NLTK</TechBadge>
        <TechBadge>📊 TextBlob</TechBadge>
        <TechBadge>🧠 spaCy</TechBadge>
        <TechBadge>🌐 Flask</TechBadge>
        <TechBadge>⚡ Gradio</TechBadge>
        <TechBadge>⚛️ React</TechBadge>
        <TechBadge>💎 Gemini API</TechBadge>
      </div>
    </header>
  );
};

export default Header;
