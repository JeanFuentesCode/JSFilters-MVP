import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<null | any>(null);

  useEffect(() => {
    // Lógica de Supabase auth listener
  }, []);

  return { user };
}
