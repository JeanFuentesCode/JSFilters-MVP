import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validación básica antes de enviar
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;
      } else {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (authError) throw authError;
        // Supabase por defecto puede requerir confirmación por email en producción
        setError('¡Registro exitoso! Si se requiere confirmación, revisa tu correo electrónico para validar la cuenta.');
      }
    } catch (err: any) {
      // Traducir algunos errores comunes de Supabase para una mejor experiencia de usuario
      let friendlyMessage = err.message;
      if (err.message === 'Invalid login credentials') {
        friendlyMessage = 'Credenciales de acceso incorrectas. Verifica tu correo y contraseña.';
      } else if (err.message === 'User already registered') {
        friendlyMessage = 'Este correo electrónico ya está registrado.';
      }
      setError(friendlyMessage || 'Ocurrió un error en la autenticación.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setError(null);
    setIsLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (authError) throw authError;
    } catch (err: any) {
      setError(err.message || `Error al conectar con ${provider}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico primero en el campo correspondiente.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) throw resetError;
      setError('Se ha enviado un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.');
    } catch (err: any) {
      setError(err.message || 'Error al enviar correo de restablecimiento.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] font-sans relative flex flex-col justify-center items-center p-6 sm:p-12 overflow-hidden text-zinc-100">
      
      {/* Efecto de luz difuminada en el fondo para un toque moderno */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-violet-600/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Contenedor Principal de la Interfaz */}
      <div className="w-full max-w-sm flex flex-col z-10">
        
        {/* Encabezado */}
        <div className="mb-10 mt-8">
          <h1 className="text-4xl font-bold text-white tracking-tight leading-tight mb-3">
            {isLogin ? (
              <>Bienvenido <br/> de vuelta.</>
            ) : (
              <>Crea tu <br/> cuenta.</>
            )}
          </h1>
          <p className="text-zinc-400 text-base">
            {isLogin 
              ? 'Ingresa tus credenciales para acceder a tu cuenta.' 
              : 'Completa la información para registrarte gratis.'}
          </p>
        </div>

        {/* Notificaciones / Errores */}
        {error && (
          <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 border ${
            error.includes('enviado') || error.includes('exitoso')
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">{error}</p>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleAuth} className="flex flex-col">
          
          {/* Input Correo */}
          <div className="mb-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-white text-base focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-all outline-none placeholder-zinc-600"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>
          </div>

          {/* Input Contraseña */}
          <div className="mb-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-12 py-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-white text-base focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-all outline-none placeholder-zinc-600"
                placeholder={isLogin ? 'Tu contraseña' : 'Elige una de 6+ caracteres'}
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Link Recuperar Contraseña */}
          {isLogin && (
            <div className="flex justify-end mb-8">
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {/* Botón Principal (Estilo Premium High-Contrast) */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-white text-black py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-zinc-200 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed ${!isLogin ? 'mt-4' : ''}`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              isLogin ? 'Iniciar Sesión' : 'Registrarse'
            )}
          </button>

          {/* Separador */}
          <div className="mt-10 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#09090b] text-zinc-500 font-mono text-xs uppercase tracking-wider">O continúa con</span>
              </div>
            </div>
          </div>

          {/* Redes Sociales con Logos Originales */}
          <div className="grid grid-cols-3 gap-4">
            
            {/* Botón Google */}
            <button 
              type="button" 
              onClick={() => handleSocialLogin('google')}
              className="flex justify-center items-center py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            
            {/* Botón Apple */}
            <button 
              type="button" 
              onClick={() => handleSocialLogin('apple')}
              className="flex justify-center items-center py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-colors"
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z"/>
              </svg>
            </button>

            {/* Botón Facebook */}
            <button 
              type="button" 
              onClick={() => handleSocialLogin('facebook')}
              className="flex justify-center items-center py-3.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>
          
          {/* Texto de Registro */}
          <div className="mt-12 text-center pb-8">
            <p className="text-sm text-zinc-400">
              {isLogin ? (
                <>
                  ¿No tienes una cuenta?{' '}
                  <button 
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      setError(null);
                    }}
                    className="font-semibold text-white hover:text-violet-400 transition-colors focus:outline-none"
                  >
                    Regístrate
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes una cuenta?{' '}
                  <button 
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setError(null);
                    }}
                    className="font-semibold text-white hover:text-violet-400 transition-colors focus:outline-none"
                  >
                    Inicia Sesión
                  </button>
                </>
              )}
            </p>
          </div>
          
        </form>
      </div>
    </div>
  );
}
