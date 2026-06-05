import React from 'react';

export function ContactButton({ className = "" }: { className?: string }) {
  return (
    <a 
      href="mailto:contacto@nexergy.ar" 
      className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors ${className}`}
    >
      Enviar consulta
    </a>
  );
}
