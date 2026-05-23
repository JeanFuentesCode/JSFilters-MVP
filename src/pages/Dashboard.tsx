import React from 'react';
import Layout from '../components/Layout';

export default function Dashboard() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Tus Simulaciones</h2>
        <p className="text-gray-600">Selecciona una vacante o escanea tu CV para comenzar.</p>
        {/* Lista de vacantes y botón de escaneo */}
      </div>
    </Layout>
  );
}
