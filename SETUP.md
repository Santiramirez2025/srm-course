# Configuración del Proyecto SRM Course

## Requisitos Previos

- Node.js 18+ instalado
- Cuenta de Firebase configurada
- Cuenta de Stripe (opcional para pagos)

## 1. Configuración de Variables de Entorno

### Paso 1: Crear archivo .env

Copia el archivo de ejemplo y renómbralo:

```bash
cp .env.example .env
```

### Paso 2: Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto o crea uno nuevo
3. Ve a **Configuración del proyecto** (ícono de engranaje)
4. En la sección **Tus apps**, selecciona tu app web
5. Copia las credenciales de configuración
6. Pega los valores en tu archivo `.env`:

```env
VITE_FIREBASE_API_KEY=tu_api_key_real
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
```

### Paso 3: Configurar Stripe (Opcional)

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com/)
2. Crea una cuenta o inicia sesión
3. Ve a **Developers** → **API Keys**
4. Copia tu **Publishable key** (comienza con `pk_test_` o `pk_live_`)
5. Ve a **Products** → **Pricing** y crea 3 planes:
   - Plan Mensual
   - Plan Anual
   - Plan de por Vida
6. Copia los IDs de precio de cada plan (comienzan con `price_`)
7. Pega los valores en tu archivo `.env`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_tu_key_real
VITE_STRIPE_PRICE_MONTHLY=price_id_mensual
VITE_STRIPE_PRICE_YEARLY=price_id_anual
VITE_STRIPE_PRICE_LIFETIME=price_id_lifetime
```

## 2. Habilitar Autenticación en Firebase

1. En Firebase Console, ve a **Authentication**
2. Haz clic en **Get Started**
3. Habilita los proveedores que necesites:
   - **Email/Password**: Habilítalo para registro con correo
   - **Google**: Habilítalo para login con Google

## 3. Instalar Dependencias

```bash
npm install
```

## 4. Ejecutar el Proyecto

### Modo Desarrollo

```bash
npm run dev
```

El proyecto estará disponible en: http://localhost:5173

### Build para Producción

```bash
npm run build
```

### Vista Previa del Build

```bash
npm run preview
```

## 5. Verificar la Configuración

Si todo está configurado correctamente:

- ✅ La app debería iniciar sin errores de consola
- ✅ Podrás registrarte e iniciar sesión
- ✅ Los módulos del curso serán visibles
- ⚠️ Los pagos de Stripe solo funcionarán si configuraste las variables

Si ves errores:

- ❌ **Firebase error**: Revisa que las variables `VITE_FIREBASE_*` sean correctas
- ❌ **Stripe warning**: Es normal si no configuraste Stripe aún (no es obligatorio para desarrollo)

## 6. Seguridad Importante

### ⚠️ NUNCA subas el archivo .env a Git

El archivo `.env` contiene tus credenciales privadas y **NUNCA** debe subirse a GitHub o repositorios públicos.

Ya está configurado en `.gitignore`, pero verifica:

```bash
# Esto NO debería mostrar .env
git status
```

Si ves `.env` en los cambios, NO lo agregues:

```bash
# ❌ NUNCA hagas esto:
git add .env

# ✅ Si accidentalmente lo agregaste:
git reset .env
```

## 7. Deployment

### Variables de Entorno en Producción

Cuando despliegues en plataformas como Vercel, Netlify, o Railway:

1. Ve a la configuración de tu proyecto
2. Añade todas las variables de entorno (las mismas del archivo `.env`)
3. **IMPORTANTE**: Usa las credenciales de **producción** de Firebase y Stripe (`pk_live_`)

Ejemplo en Vercel:

```
Settings → Environment Variables → Add
```

## Problemas Comunes

### Error: "Firebase no está configurado correctamente"

**Causa**: Las variables de entorno no están cargadas

**Solución**:
1. Verifica que el archivo `.env` existe en la raíz del proyecto
2. Reinicia el servidor de desarrollo (`npm run dev`)
3. Verifica que las variables empiecen con `VITE_`

### Warning: "Stripe no está configurado correctamente"

**Causa**: No configuraste las variables de Stripe

**Solución**:
- Si solo quieres desarrollar sin pagos, ignora este warning
- Si necesitas probar pagos, configura las variables de Stripe en `.env`

### Error: "Module not found" después de clonar el repo

**Causa**: Dependencias no instaladas

**Solución**:
```bash
npm install
```

## Recursos Adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Documentación de Stripe](https://stripe.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## Soporte

Si tienes problemas con la configuración:

1. Revisa que todas las variables de `.env` estén completas
2. Verifica que Firebase Authentication esté habilitado
3. Comprueba la consola del navegador para errores específicos
