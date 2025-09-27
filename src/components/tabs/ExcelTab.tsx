
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import DemoCard from '../ui/DemoCard';
import { Button } from '../ui/Button';
import ResultCard from '../ui/ResultCard';
import Loading from '../ui/Loading';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const excelTemplate = `Me encanta este producto, es excelente!
No estoy satisfecho con la calidad del servicio
El bootcamp fue aceptable, pero podría mejorar
¡Increíble experiencia! Definitivamente lo recomendaré
No cumple con mis expectativas, muy decepcionado
Excelente atención al cliente y productos de calidad
El curso de IA es fascinante, aprendo mucho cada día
Muy frustrante la plataforma, muchos errores técnicos`;

const ExcelTab: React.FC = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) {
            setError('Por favor, ingresa textos para procesar (uno por línea).');
            return;
        }
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Analiza el sentimiento de cada una de las siguientes líneas de texto. Para cada línea, clasifica el sentimiento como 'POSITIVO', 'NEGATIVO' o 'NEUTRO' y proporciona una puntuación de sentimiento 'compound' entre -1 y 1.

Textos:
${lines.join('\n')}

Devuelve un objeto JSON con una clave 'results' que contenga un array de objetos. Cada objeto debe tener las claves 'text', 'sentiment' y 'compound'. También, incluye una clave 'summary' con el recuento total de 'positive', 'negative' y 'neutral'.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            results: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        text: { type: Type.STRING },
                                        sentiment: { type: Type.STRING },
                                        compound: { type: Type.NUMBER }
                                    }
                                }
                            },
                            summary: {
                                type: Type.OBJECT,
                                properties: {
                                    positive: { type: Type.NUMBER },
                                    negative: { type: Type.NUMBER },
                                    neutral: { type: Type.NUMBER }
                                }
                            }
                        }
                    }
                }
            });

            const data = JSON.parse(response.text);
            const total = lines.length;
            
            let output = `📊 ANÁLISIS MASIVO DE EXCEL (GEMINI):\n${'='.repeat(60)}\n\n`;
            output += `📈 RESUMEN ESTADÍSTICO (${total} textos analizados):\n`;
            output += `• Positivos: ${data.summary.positive} (${((data.summary.positive/total)*100).toFixed(1)}%)\n`;
            output += `• Neutros:   ${data.summary.neutral} (${((data.summary.neutral/total)*100).toFixed(1)}%)\n`;
            output += `• Negativos: ${data.summary.negative} (${((data.summary.negative/total)*100).toFixed(1)}%)\n\n`;
            
            output += `📋 RESULTADOS DETALLADOS:\n${'-'.repeat(60)}\n`;
            output += `${'Texto'.padEnd(45)}${'Sentimiento'.padEnd(15)}${'Compound'}\n`;
            output += `${'-'.repeat(45)}${'-'.repeat(15)}${'-'.repeat(10)}\n`;
            
            data.results.forEach((res: any) => {
                const shortText = res.text.length > 40 ? res.text.substring(0, 37) + '...' : res.text;
                output += `${shortText.padEnd(45)}${res.sentiment.padEnd(15)}${res.compound.toFixed(4)}\n`;
            });

            setResult(output);
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
    };

    return (
        <DemoCard
            title="📈 Demo: Procesamiento de Excel"
            description={
                <p><strong>Ejercicio 2:</strong> Simulación de procesamiento masivo de archivos Excel. Detección automática de columnas con texto y análisis por lotes, impulsado por Gemini.</p>
            }
        >
            <div className="space-y-4">
                <textarea
                    id="excelInput"
                    className="w-full h-48 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-vertical font-mono text-sm"
                    rows={8}
                    placeholder="Pega aquí tus textos, uno por línea..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex flex-wrap gap-4">
                    <Button onClick={handleAnalyze} disabled={loading}>📊 Procesar Lote</Button>
                    <Button onClick={() => setText(excelTemplate)} variant="secondary" disabled={loading}>📋 Cargar Plantilla</Button>
                    <Button onClick={handleClear} variant="danger" disabled={loading}>🧹 Limpiar</Button>
                </div>
                {loading && <Loading text="Procesando lote de textos..." />}
                <ResultCard content={result} error={error} />
            </div>
        </DemoCard>
    );
};

export default ExcelTab;
