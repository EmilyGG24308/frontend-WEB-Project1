FRONTEND
<img width="1276" height="1351" alt="image" src="https://github.com/user-attachments/assets/59bbcd42-bf33-4712-b6f4-a3456e4042fe" />

Cómo correr el proyecto localmente (Frontend + Backend)

1. Clonar ambos repositorios
git clone
git clone

3. Backend
cd backend-WEB-Project1
npm install
Configurar PostgreSQL local:
Crear base de datos llamada series
Asegurarse de que esté corriendo
Ejecutar servidor:
node index.js
   Corre en: http://localhost:3000
4. Frontend
Abrir otra terminal:
cd frontend-WEB-Project1
Ejecutar con Live Server (VSCode)
o: python -m http.server
   Abrir: http://localhost:5500
   
5. IMPORTANTE
En app.js del frontend usar:
const API = "http://localhost:3000";

Challenges implementados 

Subjetivos
- Calidad visual (layout tipo app con cards, colores consistentes) — 0–30 pts
- Historial de Git organizado — 0–20 pts
- Código organizado (separación de responsabilidades) — 0–20 pts

Funcionalidad
- CRUD completo (crear, editar, eliminar, listar)
- Búsqueda (?q=) — 15 pts
- Ordenamiento (?sort= y ?order=) — 15 pts
- Paginación (?page= y ?limit=) — 30 pts
- Exportar a CSV — 20 pts
- Soporte de imágenes (URL + visualización) — 20 pts aprox

Reflexion
Trabajar con JavaScript vanilla fue útil porque obliga a entender cómo funciona el DOM, fetch y la comunicación con el backend sin depender de frameworks.

Lo más difícil fue conectar el frontend con el backend deployado, porque pequeños errores en las rutas rompían todo y no siempre era fácil identificar qué estaba fallando. También el tema de manejar datos y renderizar correctamente en diferentes funciones (load, search, sort) fue un reto.

Sí usaría este enfoque otra vez para proyectos pequeños, pero para algo más grande usaría un framework como React para manejar mejor el estado y la estructura.
