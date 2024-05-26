# Webpack React con TypeScript

Esta configuracion de Webpack está creada para facilitar el desarrollo y la construcción de aplicaciones React utilizando TypeScript. Incluye configuraciones para ESLint, Prettier, y MSW (Mock Service Worker).

## Estructura del Proyecto

La estructura básica del proyecto incluye:

- `src/`: código fuente de la aplicación.
  - `adaters/`: Aquí se ubican los adaptadores que actúan como una capa intermedia entre la lógica de negocio y las interfaces externas, tales como API, bases de datos o servicios externos. Estos adaptadores son responsables de transformar los datos entrantes y salientes para que sean compatibles con el dominio de la aplicación.
  - `application/`: Contiene hooks y otros componentes que actúan como puertos, facilitando la comunicación entre la presentación y la lógica de negocio.
  - `domain/`: Contiene la lógica de negocio central de la aplicación, incluyendo modelos y servicios de dominio.
  - `presentation/`: Contiene los componentes de la interfaz de usuario (UI), responsables de la representación visual y la interacción del usuario.
- `public/`: archivos estáticos e `index.html`.
- `webpack/`: configuraciones de Webpack para desarrollo y producción.

## Configuración de Webpack

Incluye configuraciones para desarrollo y producción, gestionando transpilación de TypeScript, resolución de módulos y más.

### Aliases

Los paths están configurados en `tsconfig.json` y sincronizados con Webpack para facilitar los imports, utilizando alias como `@src`, `@componentes`, entre otros.

## ESLint y Prettier

Configurados para garantizar un código limpio y consistente. Incluye reglas específicas para trabajar con React y TypeScript.

## Mock Service Worker

Preparado para integrar MSW para simular la API durante el desarrollo y testing, mejorando la fiabilidad de los tests.

## Uso

- Para iniciar el servidor de desarrollo: `yarn start`
- Para construir la versión de producción: `yarn run build`

## Tests

Configurado con Jest y MSW para realizar pruebas unitarias y de integración.

### Configuración

Se incluyen ejemplos de configuración de ESLint en `.eslintrc.json` y de MSW para ser utilizados tanto en desarrollo como en pruebas.


