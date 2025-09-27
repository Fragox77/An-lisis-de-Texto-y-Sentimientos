
import React from 'react';
import { WaitingIcon } from './icons/WaitingIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const InstructionStep: React.FC<{ number: number; text: string }> = ({ number, text }) => (
  <li className="flex items-start">
    <div className="flex-shrink-0">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-purple-300 font-bold">
        {number}
      </span>
    </div>
    <p className="ml-4 text-gray-300">{text}</p>
  </li>
);

const StatusDisplay: React.FC = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/20 p-8">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 text-purple-400">
          <WaitingIcon className="w-24 h-24 animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Esperando la información de los ejercicios...</h2>
          <p className="text-gray-400 mb-6">
            Para poder generar tus documentos, presentación y demos, por favor sigue estos pasos:
          </p>
          <ul className="space-y-4">
            <InstructionStep 
              number={1} 
              text="Comparte cada uno de tus 6 ejercicios en el chat. Proporciona el código y los pantallazos correspondientes." 
            />
            <InstructionStep 
              number={2} 
              text="Cuando hayas terminado de compartir toda la información, escribe la palabra clave:" 
            />
             <li className="flex justify-center items-center py-2">
                <code className="bg-purple-900/50 text-purple-300 font-mono text-lg px-4 py-2 rounded-lg border border-purple-700">info-completa</code>
             </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-700/50 flex items-center justify-center gap-3 text-green-400">
        <CheckCircleIcon className="w-6 h-6" />
        <p className="font-semibold">¡Entendido! Estoy listo para empezar cuando me lo indiques.</p>
      </div>
    </div>
  );
};

export default StatusDisplay;
