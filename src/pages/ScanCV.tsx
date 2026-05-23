import React from 'react';
import Layout from '../components/Layout';

export default function ScanCV() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold mb-4">Escanear Currículum</h2>
        <div className="w-full max-w-sm aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
          <span className="text-gray-500">Vista de la Cámara</span>
        </div>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
          Capturar
        </button>
      </div>
    </Layout>
  );
}
