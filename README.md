# ALTARA — Luxury, Recrafted in Colombia

> *"No fabricamos en masa. Creamos en silencio, con manos que conocen el tiempo."*

Landing page editorial para **ALTARA**, marca colombiana de bolsos de lujo artesanal. Sitio estático de una sola página, listo para GitHub Pages.

---

## Estructura de archivos

```
altara/
├── index.html    — Estructura semántica HTML5 completa
├── style.css     — Sistema de diseño con variables CSS y todos los estilos
├── script.js     — Animaciones, cursor, formulario y microinteracciones
└── README.md     — Este archivo
```

---

## Secciones de la landing

| # | Sección | Propósito |
|---|---------|-----------|
| 01 | **Hero** | Primera impresión editorial con headline y CTA |
| 02 | **Manifiesto** | Texto emocional que posiciona la marca |
| 03 | **Colección** | 3 piezas curadas con historias y precio bajo solicitud |
| 04 | **Origen** | Artesanía colombiana, proceso y valores |
| 05 | **Exclusividad** | Modelo de negocio — sin descuentos, ediciones limitadas |
| 06 | **Testimonios** | Social proof elegante + "Visto en" aspiracional |
| 07 | **Captura** | Formulario lista de espera (email + WhatsApp) |

---

## Sistema de diseño

### Paleta
| Variable CSS | Color | Uso |
|---|---|---|
| `--color-negro` | `#0A0A0A` | Fondo oscuro, texto principal |
| `--color-marfil` | `#F5F2ED` | Fondo claro, texto sobre oscuro |
| `--color-dorado` | `#C6A96B` | Acentos, detalles editoriales |
| `--color-verde` | `#1C2B26` | Secciones de acento (exclusividad, footer) |

### Tipografía
- **Títulos:** Playfair Display (serif elegante) — Google Fonts
- **Texto editorial:** Cormorant Garamond (serif itálica) — Google Fonts
- **Cuerpo / UI:** Jost (sans-serif refinada) — Google Fonts

---

## Características técnicas

- **Sin frameworks** — Vanilla HTML, CSS y JavaScript
- **CSS Custom Properties** para todo el sistema de diseño
- **IntersectionObserver** para animaciones de entrada suaves al scroll
- **Cursor personalizado** con seguimiento suave y efectos en hover
- **Parallax sutil** en la imagen del hero
- **Formulario de captura** con validación en tiempo real y confirmación elegante (sin backend)
- **Prefers-reduced-motion** respetado globalmente
- **Mobile-first** — completamente responsive desde 320px
- **Semantic HTML5** con roles ARIA y `aria-label`

---

## Despliegue en GitHub Pages

### Pasos

1. **Crea un repositorio en GitHub** (puede ser público o privado con GitHub Pro)

2. **Sube los 4 archivos** al repositorio:
   ```bash
   git init
   git add index.html style.css script.js README.md
   git commit -m "feat: ALTARA landing page inicial"
   git remote add origin https://github.com/TU_USUARIO/altara.git
   git push -u origin main
   ```

3. **Activa GitHub Pages:**
   - Ve a tu repositorio → **Settings** → **Pages**
   - En *Source*, selecciona: `Deploy from a branch`
   - Branch: `main` / Folder: `/ (root)`
   - Clic en **Save**

4. **Tu sitio estará disponible en:**
   ```
   https://TU_USUARIO.github.io/altara/
   ```
   *(GitHub tarda 1–3 minutos en hacer el primer deploy)*

### Dominio personalizado (opcional)

Para usar `altara.co` o similar:
1. Settings → Pages → Custom domain → ingresa tu dominio
2. En tu proveedor DNS, agrega un registro `CNAME` apuntando a `TU_USUARIO.github.io`

---

## Personalización

### Cambiar imágenes placeholder

Las imágenes usan `https://picsum.photos` como placeholder. Para reemplazarlas con fotos reales, busca en `index.html` los atributos `style="background-image: url('...')"` y reemplaza las URLs.

### Cambiar precios

Las piezas muestran *"Precio bajo solicitud"* por defecto. Modifica el texto dentro de `.pieza__price` en `index.html`.

### Conectar el formulario a un backend

El formulario es frontend-only por defecto. Para conectarlo:
- **Opción A:** [Formspree](https://formspree.io) — cambia el `div#capturaForm` por un `form` con `action="https://formspree.io/f/TU_ID"`
- **Opción B:** [Netlify Forms](https://www.netlify.com/products/forms/) — agrega `netlify` al `<form>` (requiere migrar a Netlify)
- **Opción C:** API propia con `fetch` en `script.js`

---

## Créditos tipográficos

| Fuente | Familia | Proveedor | Licencia |
|---|---|---|---|
| Playfair Display | Serif | Google Fonts | SIL Open Font License |
| Cormorant Garamond | Serif Itálica | Google Fonts | SIL Open Font License |
| Jost | Sans-serif | Google Fonts | SIL Open Font License |

---

## Licencia

Proyecto propietario de **ALTARA**. Todos los derechos reservados.  
El código puede adaptarse bajo acuerdo con la marca.

---

*ALTARA — Bogotá, Colombia — Para el mundo.*
