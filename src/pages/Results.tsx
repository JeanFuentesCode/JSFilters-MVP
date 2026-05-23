import React from 'react';
import Layout from '../components/Layout';

export default function Results() {
  return (
    <Layout>
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Resultados de Simulación</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
          <span className="text-sm text-gray-500 uppercase tracking-wider">Tu Score</span>
          <span className="text-5xl font-black text-blue-600 my-2">78.50</span>
          <span className="font-medium text-gray-700">Posición: 7 de 31</span>
        </div>
      </div>
    </Layout>
  );
}
