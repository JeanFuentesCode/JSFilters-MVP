# JSFilters — Documentación Técnica del MVP (v1.0)
*Simulador Profesional de Filtros ATS con Candidatos Sintéticos*

---

## 1. 🎯 Propósito del Producto
**JSFilters** es una aplicación móvil diseñada para ayudar a profesionales en búsqueda de empleo a comprender y superar los filtros automatizados de los **Sistemas de Seguimiento de Candidatos (ATS)**. 

A diferencia de los validadores tradicionales que dan consejos estáticos, JSFilters crea un **entorno competitivo simulado**:
1. El usuario escanea su currículum (CV) usando la cámara.
2. Selecciona una vacante real de la plataforma.
3. El sistema genera **30 candidatos sintéticos** de diversos niveles de competencia.
4. El motor evalúa los 31 perfiles y emite un ranking, puntuación detallada y un diagnóstico accionable de mejora frente a su competencia directa.

---

## 2. 📱 Stack Tecnológico Simplificado
* **Frontend:** React Native + Expo (TypeScript). Compilación mediante **EAS Build** para generar un APK autónomo y nativo.
* **Backend y Base de Datos:** **Supabase** (PostgreSQL para persistencia de datos, Supabase Auth para autenticación, y Bucket de Storage para cargas de imágenes).
* **Procesamiento de IA (OCR y Estructuración):** **OpenRouter** para el consumo de modelos de visión e idioma (LLMs multimodales) centralizados en red segura.

---

## 3. 🔒 Estrategia de Seguridad, Privacidad y Minimización de Datos
Para blindar la plataforma contra posibles filtraciones de información personal (PII) o vulnerabilidades en el procesamiento de documentos:

* **No Carga de Archivos Binarios (Defensa contra Inyecciones):** Se prohíbe la subida directa de archivos PDF de origen desconocido. Esto mitiga cualquier riesgo de exploits integrados en metadatos, macros o vulnerabilidades típicas en librerías de parsing de PDF en servidor.
* **Captura mediante Cámara del Dispositivo:** La aplicación solo permite capturar imágenes del documento en formato JPEG/PNG tomadas directamente por el dispositivo.
* **Auto-Purga del Almacenamiento (Retención de 48 horas):** 
  * Los escaneos originales (`image_url`) alojados en el Bucket de Supabase Storage se eliminan automáticamente mediante una **tarea programada (cron job)** instalada en Supabase que purga todo archivo de escaneo con más de 48 horas de vida.
  * Se elimina el enlace de la imagen en la base de datos conservando únicamente la información técnica y anonimizada de la experiencia y habilidades de forma estructurada para mantener el historial del usuario sin almacenar datos brutos ni datos personales expuestos.

---

## 4. 🗄️ Arquitectura de Datos (Modelado Esencial)

El sistema opera con 5 tablas estructuradas bajo políticas estrictas de aislamiento por usuario (**Row Level Security - RLS**):

| Tabla | Propósito | Llave Primaria / Foránea |
| :--- | :--- | :--- |
| `profiles` | Datos de perfil del usuario (nombre, sector, nivel, plan). | `id` (uuid de Auth) |
| `user_cvs` | Datos estructurados del CV del candidato (sin guardar la imagen permanente). | `id` (uuid) ➔ vincula a `profiles` |
| `vacancies` | Convocatorias de empleo simuladas vigentes. | `id` (uuid) |
| `synthetic_candidates` | Los 30 competidores sintéticos precalculados para cada vacante. | `id` (uuid) ➔ vincula a `vacancies` |
| `simulations` | Historial de resultados, posición (1 al 31) y diagnóstico de mejoras. | `id` (uuid) ➔ vincula a `user_cvs` y `vacancies` |

---

## 5. 🔄 Flujo de Datos Crítico (Simulación)

```
[Usuario toma foto] ➔ [Sube a Bucket Temporal] ➔ [Edge Function procesa OCR/Estructuración]
                                                       │
                                                       ▼
[Muestra Resultado en Pantalla] 🔀 [Cálculo de Score y Ranking con los 30 Candidatos Sintéticos]
        │
        ▼
[A los 2 días: Cron purga imagen física del Bucket y vacía el string de la URL en la DB]
```

---

## 6. 📅 Plan de Desarrollo por Fases
* **Fase 1 (Semana 1-2):** Configuración de Expo + Supabase. Flujo de inicio de sesión y subida de imagen de la cámara.
* **Fase 2 (Semana 3-4):** Integración de Edge Functions para Parseo OCR Multimodal de la foto del CV.
* **Fase 3 (Semana 5-6):** Algoritmo de scoring (evaluación ATS) y ranking frente a candidatos sintéticos.
* **Fase 4 (Semana 7-8):** Pantallas interactivas de resultados. Implementación del Script de Auto-Purga en Supabase y pruebas de seguridad.
