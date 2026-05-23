/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <Login />;
}
