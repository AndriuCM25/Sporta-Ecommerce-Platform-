# SPORTA E-Commerce Platform

Plataforma de e-commerce para venta de zapatillas deportivas.

## Instalación

### Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:
```env
PORT=3001
JWT_SECRET=tu_secreto_jwt
SUPABASE_URL=tu_supabase_url
SUPABASE_ANON_KEY=tu_supabase_anon_key
```

Iniciar:
```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
```

Crear archivo `.env`:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

Iniciar:
```bash
npm run dev
```

## Configurar Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ejecutar `supabase-setup.sql` en SQL Editor
3. Copiar URL y Anon Key a los archivos `.env`

## Credenciales Admin

```
Email: adminSporta@depor.pe
Password: admin123
```
