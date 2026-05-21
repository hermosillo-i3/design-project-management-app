# Design Project Management App

Aplicación de gestión de proyectos de diseño (HTML estático + Firebase).

## Despliegue en GitHub Pages

### 1. Secrets del repositorio

En **Settings → Secrets and variables → Actions → New repository secret**, crea los que aparecen en `.env.sample`):

El workflow inyecta esos valores en `index.html` antes de publicar (no hace falta subir `.env`).

### 2. Entorno `github-pages`

**Settings → Environments → github-pages → Deployment branches**

Permite **`main`** y **`qas`** (si no, falla el deploy al pushear `qas`).

### 3. GitHub Pages

**Settings → Pages → Build and deployment → Source:** **GitHub Actions**.

### 4. URLs

| Entorno | Ruta |
|---------|------|
| Producción | `https://<usuario>.github.io/<repo>/` |
| QAS | `https://<usuario>.github.io/<repo>/qas/` |
