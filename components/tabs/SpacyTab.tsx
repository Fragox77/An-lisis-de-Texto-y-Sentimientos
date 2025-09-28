
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import DemoCard from '../ui/DemoCard';
import { Button, ExampleButton } from '../ui/Button';
import ResultCard from '../ui/ResultCard';
import Loading from '../ui/Loading';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

type AnalysisType = 'tokens' | 'entidades';

const SpacyTab: React.FC = () => {
    const [text, setText] = useState('');
    const [analysisTypes, setAnalysisTypes] = useState<Set<AnalysisType>>(new Set(['tokens', 'entidades']));
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const examples = {
        person: "Jhon Fragozo desarrolló un proyecto de análisis de sentimientos para Talento Tech en Bucaramanga.",
        company: "Microsoft, Google y OpenAI son líderes en inteligencia artificial y machine learning.",
        location: "El bootcamp se desarrolla en Colombia, específicamente en Bucaramanga, Santander."
    };
    
    const handleCheckboxChange = (type: AnalysisType) => {
        setAnalysisTypes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(type)) {
                newSet.delete(type);
            } else {
                newSet.add(type);
            }
            return newSet;
        });
    };

    const handleAnalyze = async () => {
        if (!text) {
            setError('Por favor, ingresa un texto para analizar.');
            return;
        }
        if (analysisTypes.size === 0) {
            setError('Por favor, selecciona al menos un tipo de análisis.');
            return;
        }
        setLoading(true);
        setResult(null);
        setError(null);
        
        const requestedAnalyses = Array.from(analysisTypes).join(', ');

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Realiza un análisis lingüístico avanzado al estilo de spaCy sobre el siguiente texto. Realiza los siguientes análisis: ${requestedAnalyses}.

Texto: "${text}"

Devuelve un objeto JSON con claves para cada tipo de análisis solicitado ('tokens', 'entidades').
Para 'tokens', devuelve un array de objetos con 'text', 'pos' (Part-of-Speech tag), y 'explanation'.
Para 'entidades', devuelve un array de objetos con 'text', 'label' (tipo de entidad), y 'explanation'.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            tokens: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: { text: { type: Type.STRING }, pos: { type: Type.STRING }, explanation: { type: Type.STRING } }
                                }
                            },
                            entidades: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: { text: { type: Type.STRING }, label: { type: Type.STRING }, explanation: { type: Type.STRING } }
                                }
                            }
                        }
                    }
                }
            });

            const data = JSON.parse(response.text);
            let formattedResult = `🧠 ANÁLISIS SPACY COMPLETO (GEMINI):\n${'='.repeat(50)}\n\n`;

            if (data.tokens) {
                formattedResult += `🔤 TOKENS Y GRAMÁTICA:\n${'-'.repeat(30)}\n`;
                data.tokens.forEach((token: any) => {
                    formattedResult += `${token.text.padEnd(15)} ${token.pos.padEnd(10)} ${token.explanation}\n`;
                });
                formattedResult += '\n';
            }

            if (data.entidades && data.entidades.length > 0) {
                formattedResult += `🏷️ ENTIDADES RECONOCIDAS:\n${'-'.repeat(30)}\n`;
                data.entidades.forEach((ent: any) => {
                    formattedResult += `${ent.text.padEnd(20)} ${ent.label.padEnd(15)} ${ent.explanation}\n`;
                });
            } else if (analysisTypes.has('entidades')) {
                formattedResult += "🏷️ ENTIDADES RECONOCIDAS:\nNo se encontraron entidades nombradas.\n";
            }
            
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
    };

    return (
        <DemoCard
            title="🧠 Demo: Análisis spaCy Avanzado"
            description={
                <p><strong>Ejercicio 3:</strong> Análisis lingüístico profundo con spaCy, simulado por Gemini. Incluye reconocimiento de entidades y análisis gramatical.</p>
            }
        >
            <div className="space-y-4">
                <textarea
                    className="w-full h-32 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-vertical"
                    rows={4}
                    placeholder="Ejemplo: Jhon Fragozo estudió inteligencia artificial en Talento Tech Colombia durante 2025."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-800">
                        <input type="checkbox" checked={analysisTypes.has('tokens')} onChange={() => handleCheckboxChange('tokens')} className="form-checkbox h-5 w-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500" />
                        <span>🔤 Tokens y POS Tagging</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-800">
                        <input type="checkbox" checked={analysisTypes.has('entidades')} onChange={() => handleCheckboxChange('entidades')} className="form-checkbox h-5 w-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500" />
                        <span>🏷️ Entidades Nombradas</span>
                    </label>
                </div>
                <div className="flex flex-wrap gap-2">
                    <ExampleButton onClick={() => setText(examples.person)}>👤 Personas</ExampleButton>
                    <ExampleButton onClick={() => setText(examples.company)}>🏢 Empresas</ExampleButton>
                    <ExampleButton onClick={() => setText(examples.location)}>📍 Lugares</ExampleButton>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Button onClick={handleAnalyze} disabled={loading}>🧠 Análisis Completo</Button>
                    <Button onClick={handleClear} variant="secondary" disabled={loading}>🧹 Limpiar</Button>
                </div>
                {loading && <Loading text="Ejecutando análisis lingüístico con spaCy..." />}
                <ResultCard content={result} error={error} />
            </div>
        </DemoCard>
    );
};

export default SpacyTab;
