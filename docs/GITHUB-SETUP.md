# Despliegue en GitHub Pages

## 1. Secrets del repositorio

En **Settings → Secrets and variables → Actions → New repository secret**, crea estos 14 (mismos nombres que en `.env.sample`):

| Secret | Origen |
|--------|--------|
| `PROD_API_KEY` | Firebase Console → proyecto **prd** → Config del SDK web |
| `PROD_AUTH_DOMAIN` | idem |
| `PROD_PROJECT_ID` | idem |
| `PROD_STORAGE_BUCKET` | idem |
| `PROD_MESSAGING_SENDER_ID` | idem |
| `PROD_APP_ID` | idem |
| `QAS_API_KEY` | Firebase Console → proyecto **qas** |
| `QAS_AUTH_DOMAIN` | idem |
| `QAS_PROJECT_ID` | idem |
| `QAS_STORAGE_BUCKET` | idem |
| `QAS_MESSAGING_SENDER_ID` | idem |
| `QAS_APP_ID` | idem |

El workflow inyecta esos valores en `index.html` antes de publicar (no hace falta subir `.env`).

## 2. Entorno `github-pages`

**Settings → Environments → github-pages → Deployment branches**

Permite **`main`** y **`qas`** (si no, falla el deploy al pushear `qas`).

## 3. GitHub Pages

**Settings → Pages → Build and deployment → Source:** **GitHub Actions**.

## 4. URLs

| Entorno | Ruta |
|---------|------|
| Producción | `https://<usuario>.github.io/<repo>/` |
| QAS | `https://<usuario>.github.io/<repo>/qas/` |

## 5. Desarrollo local

```bash
cp .env.sample .env
# Completa .env con los mismos valores que pondrás en Secrets
npm run build:firebase
```

Eso rellena el bloque `ENV_FIREBASE_*` en `index.html`. **No hagas commit** de `index.html` con las claves ya rellenadas; en git debe ir el bloque vacío y el CI lo inyecta.

## 6. Ramas

Asegúrate de que la rama **`qas`** tenga también `scripts/generate-firebase-config.mjs` y los marcadores en `index.html` (merge desde `main` si hace falta).
