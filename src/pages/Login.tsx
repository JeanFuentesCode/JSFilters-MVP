import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Eye, EyeOff, Shield, Cpu, Activity, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validación básica antes de enviar
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      // Traducir algunos errores comunes de Supabase para una mejor experiencia de usuario
      let friendlyMessage = err.message;
      if (err.message === 'Invalid login credentials') {
        friendlyMessage = 'Credenciales de acceso incorrectas. Verifica tu correo u contraseña.';
      } else if (err.message === 'User already registered') {
        friendlyMessage = 'Este correo electrónico ya está registrado.';
      }
      setError(friendlyMessage || 'Ocurrió un error en la autenticación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-950 font-sans text-gray-100 antialiased overflow-hidden selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Columna Izquierda: Información / Presentación de la Plataforma (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden border-r border-gray-900 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        
        {/* Efecto de Luces de Fondo (Glows) */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
        
        {/* Header / Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 p-[1.5px]">
            <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 font-extrabold text-lg tracking-wider font-mono">JS</span>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white bg-clip-text">
            JSFilters <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">v1.0 MVP</span>
          </span>
        </div>

        {/* Mensaje de Valor */}
        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
              Pon a competir tu currículum en un entorno de simulación real.
            </h2>
            <p className="text-gray-400 leading-relaxed text-base">
              No dejes tu próxima postulación al azar. Escanea tu CV, enfréntalo a un grupo de control de 30 perfiles sintéticos calibrados y descubre con precisión quirúrgica tu ranking antes de enviar tu postulación real.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-5 pt-4 border-t border-gray-900"
          >
            {/* Beneficio 1 */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 mt-0.5 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-200">Procesamiento OCR por Visión</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Tu CV se extrae con algoritmos de visión artificial para estructurar datos limpios de experiencia, habilidades y educación sin fallos de parsing.
                </p>
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 mt-0.5 shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-200">Algoritmo de Scoring y Ranking Realista</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Evaluamos los 31 perfiles según concordancia léxica, contextual y logros cuantitativos para simular un proceso de selección ATS exacto.
                </p>
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 mt-0.5 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-200">Defensa Activa y Privacidad</h4>
                <p className="text-sm text-gray-400 mt-1">
                  No guardamos metadatos. Las imágenes cargadas se purgan de nuestros servidores de forma automática después de 48 horas de efectuada la prueba.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-gray-500 flex justify-between">
          <span>&copy; {new Date().getFullYear()} JSFilters App. Todos los derechos reservados.</span>
          <span className="font-mono text-gray-600">Secure Sandboxed MVP</span>
        </div>
      </div>

      {/* Columna Derecha: Formulario de Autenticación */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative bg-gray-950">
        
        {/* Luces de Fondo para Mobile/all */}
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none lg:hidden animate-pulse" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-teal-500/5 blur-[80px] pointer-events-none lg:hidden animate-pulse" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-gray-900/40 backdrop-blur-xl border border-gray-800/80 p-8 md:p-10 rounded-2xl relative z-10 shadow-2xl shadow-black/45"
        >
          {/* Logo visible solo en móviles */}
          <div className="flex lg:hidden justify-center items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500 p-[1.5px]">
              <div className="w-full h-full bg-gray-950 rounded-[6px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 font-extrabold text-sm tracking-wider font-mono">JS</span>
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">JSFilters</span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h3 className="text-2xl font-bold tracking-tight text-white">
              {isLogin ? 'Bienvenido de vuelta' : 'Comienza tu viaje'}
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              {isLogin ? 'Ingresa tus credenciales para acceder al simulador ATS.' : 'Crea una cuenta gratuita y pon a prueba tu currículum.'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-500/10 text-red-400 text-sm rounded-xl border border-red-500/20 flex gap-2 overflow-hidden items-start"
              >
                <div className="mt-0.5 text-red-400 font-bold shrink-0 font-mono">!</div>
                <p className="flex-1 leading-relaxed text-xs">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAuth} className="space-y-5">
            {/* Campo: Correo Electrónico */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 font-mono">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-950/80 border border-gray-800 rounded-xl focus:ring-1 focus:ring-teal-500/50 focus:border-teal-400 outline-none text-gray-100 placeholder:text-gray-600 transition-all text-sm"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            {/* Campo: Contraseña */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">
                  Contraseña
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-950/80 border border-gray-800 rounded-xl focus:ring-1 focus:ring-teal-500/50 focus:border-teal-400 outline-none text-gray-100 placeholder:text-gray-600 transition-all text-smSB"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botón de Autenticación */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-400 hover:to-blue-400 text-white py-3 rounded-xl transition-all font-semibold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 font-sans disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{isLogin ? 'Acceder al Simulador' : 'Crear Cuenta'}</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Selector de modo Login / Registro */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setPassword('');
              }}
              className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors focus:outline-none cursor-pointer"
            >
              {isLogin
                ? '¿No tienes cuenta? Regístrate gratis'
                : '¿Ya eres miembro? Inicia sesión aquí'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
