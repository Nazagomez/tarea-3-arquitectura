# Tarea 3 — Best Books Ever con Comet CMS

**Estudiante:** Nazareth Gómez Gómez  
**Carné:** 504430491  
**Curso:** EIF-511 Arquitectura de Información  
**Tema:** 15. Best Books Ever

Sitio Nuxt adaptado desde el proyecto 1 para leer el contenido publicado en el CMS headless **Comet CMS**, siguiendo el Tutorial 6.

## URL de Netlify

https://best-books-ever-comet.netlify.app/

> Reemplace esta URL por la que Netlify asigne al publicar el repositorio.

## Cómo se conecta con Comet CMS

El contenido no vive en el proyecto (`@nuxt/content` no se usa). Las páginas llaman a `/api/comet/...` y Nitro reenvía la petición a CometCMS con el token, para que `Authorization` nunca aparezca en el navegador.

Las variables van en `.env` (no se sube al repositorio):

```
NUXT_COMET_API_TOKEN=ctcms_su-token
NUXT_COMET_URL=https://cms-una.gt.tc
NUXT_COMET_WORKSPACE=cms-una
```

El espacio asignado en cms-una.gt.tc es **`cms-una`**.

## Modelo de datos en Comet CMS

Las tablas deben marcarse como **Private**. Los campos de tipo `relation` son las llaves foráneas.

| Tabla | Campos principales | Enlaces |
|-------|--------------------|---------|
| `familias` | nombre, descripcion | — |
| `generos` | nombre, descripcion, **familia** | `familia` → `familias` |
| `autores` | nombre, nacionalidad, biografia, imagen | — |
| `editoriales` | nombre, pais | — |
| `libros` | num, titulo, serie, calificacion, descripcion, idioma, isbn, paginas, anio, premios, portada, precio, puntuacion_bbe, votos_bbe, resenas, aprobacion, **autor**, **editorial**, **genero** | `autor` → `autores`, `editorial` → `editoriales`, `genero` → `generos` |

El esquema está en `cms/schema.json`. Los registros de ejemplo (muestra del proyecto 1) están en `cms/seed.json`.

## Cómo crear las tablas y el token

1. Entre a [http://cms-una.gt.tc](http://cms-una.gt.tc).
2. Cree los content types `familias`, `generos`, `autores`, `editoriales` y `libros`.
3. Agregue los campos (texto, número, imagen/URL y `relation`).
4. Márquelos como **Private**.
5. Cree un token en **API Tokens** con permiso `content.read` sobre esas tablas.
6. Cargue algunos registros del proyecto 1 y enlácelos (género → familia; libro → autor, editorial y género).
7. Publique cada registro.

Para cargar la muestra con el script:

```bash
cp .env.example .env
# edite NUXT_COMET_API_TOKEN
npm run seed:cms
```

## Cómo ejecutar

```bash
cp .env.example .env
npm install
npm run dev
```

El sitio queda en `http://localhost:3000`. En la pestaña Red del navegador las peticiones van a `/api/comet/...` y **no** llevan el encabezado `Authorization`.

## Publicación en Netlify

Se usa `npm run build` (SSR) para que el proxy de Nitro siga vivo y los cambios del CMS se vean al recargar, como indica el Tutorial 6.

1. Suba el proyecto a GitHub **sin** `node_modules` ni `.env`.
2. En Netlify use *Import from Git*, comando `npm run build` y directorio `dist`.
3. Use Node 22.
4. En *Environment variables* agregue:
   - `NUXT_COMET_API_TOKEN`
   - `NUXT_COMET_URL` = `https://cms-una.gt.tc`
   - `NUXT_COMET_WORKSPACE` = `cms-una`
5. Copie la URL publicada en este README.

## Términos de prueba para la búsqueda

- `hunger`
- `king`
- `dystopia`
