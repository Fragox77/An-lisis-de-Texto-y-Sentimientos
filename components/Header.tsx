import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

// Consistent with other components, initialize the AI client at the module level.
// This assumes `process.env.API_KEY` is available in the browser environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


const TechBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-gray-700/50 text-purple-300 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
    {children}
  </div>
);

const Header: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoLoading, setLogoLoading] = useState<boolean>(true);
  const [logoError, setLogoError] = useState<string | null>(null);

  useEffect(() => {
    // A flag to prevent state updates if the component unmounts
    let isMounted = true; 

    const generateLogo = async () => {
      if (!process.env.API_KEY) {
          console.error("Gemini API key not configured.");
          if (isMounted) {
            setLogoError("API Key missing");
            setLogoLoading(false);
          }
          return;
      }

      try {
        const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: 'A minimalist, modern vector logo for an AI analysis application. It should combine an abstract representation of a brain or neural network with data visualization elements. Use a professional and sleek color palette with glowing purples, indigos, and cyans on a dark background. Flat design, no text.',
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: '1:1',
          },
        });
        
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
        if (isMounted) {
          setLogoUrl(imageUrl);
        }
      } catch (error) {
        console.error("Error generating logo:", error);
        if (isMounted) {
          setLogoError("Failed to generate");
        }
      } finally {
        if (isMounted) {
          setLogoLoading(false);
        }
      }
    };

    generateLogo();

    // Cleanup function to set the flag when component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <header className="text-center bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/20 p-6 sm:p-8">
      <div className="flex justify-center items-center h-20 mb-4">
        {logoLoading && (
          <div className="w-8 h-8 border-4 border-purple-300 border-t-transparent rounded-full animate-spin" aria-label="Generando logo..."></div>
        )}
        {logoError && (
          <div className="text-red-400 text-xs text-center" role="alert">
            <p>Logo Error:</p>
            <p>{logoError}</p>
          </div>
        )}
        {logoUrl && (
          <img src={logoUrl} alt="Logo de Asistente de Misión IA" className="h-20 w-20 object-contain animate-fadeIn" />
        )}
      </div>
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