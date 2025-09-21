# Meme Miner - Transpilación a JavaScript

## Comandos Disponibles

### Desarrollo
```bash
bun run dev
```
Ejecuta el código TypeScript directamente con Bun en modo watch.

### Construcción (Transpilación)
```bash
bun run build
```
Transpila el código TypeScript a JavaScript puro en el directorio `dist/`. Este comando:
1. Ejecuta `tsc` para compilar TypeScript a JavaScript
2. Ejecuta `fix-imports.js` para corregir los imports relativos agregando extensiones `.js`

### Ejecución del JavaScript
```bash
bun run start
```
o
```bash
node dist/index.js
```
Ejecuta el código JavaScript transpilado usando Node.js.

### Limpieza
```bash
bun run clean
```
Elimina el directorio `dist/` con todos los archivos JavaScript generados.

## Flujo Completo

1. **Compilar**: `bun run build`
2. **Ejecutar**: `bun run start`

## Archivos Generados

- `dist/index.js` - Archivo principal
- `dist/finder.js` - Utilidades para buscar media
- `dist/storage.js` - Funciones de almacenamiento
- `dist/helper.js` - Funciones auxiliares
- `dist/uploader.js` - Funciones de subida

## Notas

- El código JavaScript generado es compatible con módulos ES
- Se mantiene la funcionalidad completa del código TypeScript original
- Los imports relativos se corrigen automáticamente para incluir extensiones `.js`
- Compatible con Node.js v16+ y Bun
