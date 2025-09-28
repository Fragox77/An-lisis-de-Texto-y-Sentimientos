
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import DemoCard from '../ui/DemoCard';
import { Button, ExampleButton } from '../ui/Button';
import ResultCard from '../ui/ResultCard';
import Loading from '../ui/Loading';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const TextBlobTab: React.FC = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const examples = {
        positive: "¡Me encanta este bootcamp de IA! Los ejercicios son fascinantes y estoy aprendiendo muchísimo. Excelente calidad educativa.",
        neutral: "El bootcamp de IA ha completado la primera misión. Los ejercicios cubren diferentes tecnologías y librerías.",
        negative: "No entiendo nada de este curso. Los ejercicios son demasiado complicados y confusos. Muy frustrante."
    };

    const handleAnalyze = async () => {
        if (!text) {
            setError('Por favor, ingresa un texto para analizar.');
            return;
        }
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Realiza un análisis de sentimiento híbrido del siguiente texto en español, al estilo de TextBlob. Primero, analiza el sentimiento directamente en español. Segundo, traduce el texto a inglés y analiza su sentimiento. Finalmente, combina los resultados (30% español, 70% inglés) para obtener una polaridad y subjetividad finales. Clasifica el sentimiento final en 'POSITIVO', 'NEGATIVO', o 'NEUTRO'.

Texto: "${text}"

Devuelve el resultado en formato JSON.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            original_text: { type: Type.STRING },
                            translated_text: { type: Type.STRING },
                            spanish_polarity: { type: Type.NUMBER },
                            english_polarity: { type: Type.NUMBER },
                            final_polarity: { type: Type.NUMBER },
                            final_subjectivity: { type: Type.NUMBER },
                            final_sentiment: { type: Type.STRING },
                        }
                    }
                }
            });

            const data = JSON.parse(response.text);
            const polarityPercent = ((data.final_polarity + 1) / 2 * 100).toFixed(1);
            
            const formattedResult = `
📊 RESULTADO DEL ANÁLISIS HÍBRIDO (GEMINI):
===========================================

🎯 SENTIMIENTO: ${data.final_sentiment}
📝 Texto: "${data.original_text}"

📈 MÉTRICAS FINALES:
• Polaridad: ${data.final_polarity.toFixed(4)} (${polarityPercent}%)
• Subjetividad: ${data.final_subjectivity.toFixed(4)}

🔍 ANÁLISIS HÍBRIDO:
• Polaridad (ES): ${data.spanish_polarity.toFixed(4)}
• Polaridad (EN): ${data.english_polarity.toFixed(4)}
• Texto traducido: "${data.translated_text}"

✅ Estrategia: 30% Español + 70% Inglés = Resultado optimizado
            `;
            setResult(formattedResult);
        } catch (e) {
            console.error(e);
            setError('No se pudo completar el análisis. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleClear = () => {
        setText('');
        setResult(null);
        setError(null);
    }

    return (
        <DemoCard
            title="🔬 Demo: Análisis con TextBlob"
            description={
                <p><strong>Ejercicio 1:</strong> Análisis de sentimientos optimizado para español usando una estrategia híbrida simulada por Gemini. Combina resultados con pesos 30% español + 70% inglés.</p>
            }
        >
            <div className="space-y-4">
                <textarea
                    id="textblobInput"
                    className="w-full h-32 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-vertical"
                    rows={4}
                    placeholder="Ejemplo: ¡Me encanta este curso de IA! Estoy aprendiendo muchísimo y los proyectos son fascinantes."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                    <ExampleButton onClick={() => setText(examples.positive)}>😊 Muy Positivo</ExampleButton>
                    <ExampleButton onClick={() => setText(examples.neutral)}>😐 Neutro</ExampleButton>
                    <ExampleButton onClick={() => setText(examples.negative)}>😞 Negativo</ExampleButton>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={handleAnalyze} disabled={loading}>🔍 Analizar Sentimiento</Button>
                    <Button onClick={handleClear} variant="secondary" disabled={loading}>🧹 Limpiar</Button>
                </div>
                {loading && <Loading text="Procesando análisis híbrido..." />}
                <ResultCard content={result} error={error} />
            </div>
        </DemoCard>
    );
};

export default TextBlobTab;
