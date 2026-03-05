# Guía E2E (Cypress) – Tarea

Esta guía está pensada para TU proyecto actual (`Angular + backend Express/Mongo`) y cumple exactamente con:

- Flujo real de usuario: administrador accede a lista de jugadores.
- Creación de jugador.
- Validación visual de listado actualizado en navegador.
- Un caso exitoso y otro de error controlado.

---

## 0) Qué tienes que tener antes de empezar

1. Tener instalado **Node.js** y **npm**.
2. Tener funcionando MongoDB (local o remoto).
3. Tener creada la variable `MONGO_URI` en el backend (archivo `.env` dentro de `backend`).

Ejemplo de `.env` en `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/proyecto_ut2
PORT=3000
```

---

## 1) Instalar Cypress en el frontend

Abre terminal en la carpeta raíz del frontend (`Proyecto_UT2`) y ejecuta:

```bash
npm install -D cypress
```

> Si te pide instalar dependencias adicionales de navegador, acepta.

---

## 2) Inicializar estructura de Cypress

Desde `Proyecto_UT2`, ejecuta:

```bash
npx cypress open
```

Esto te creará la estructura base (`cypress/`, `cypress.config.*`, etc.).
Cuando termine, puedes cerrar la ventana de Cypress.

---

## 3) Configurar Cypress para tu app (puerto 4200)

En la raíz `Proyecto_UT2`, deja/crea un archivo `cypress.config.js` con este contenido:

```js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false
  }
});
```

---

## 4) Crear el test E2E de la tarea

Crea el archivo:

`cypress/e2e/players-admin-flow.cy.js`

y pega exactamente este contenido:

```js
describe('Flujo E2E admin -> jugadores', () => {
  const apiUrl = 'http://localhost:3000/api';

  const adminUser = `admin_e2e_${Date.now()}`;
  const adminPassword = 'Admin1234!';

  before(() => {
    // 1) Crear admin para que el login del test sea autónomo.
    // Si falla por cualquier motivo, el test seguirá mostrando el error real en login.
    cy.request({
      method: 'POST',
      url: `${apiUrl}/auth/register`,
      failOnStatusCode: false,
      body: {
        usuario: adminUser,
        email: `${adminUser}@mail.com`,
        password: adminPassword,
        rol: 'admin'
      }
    });
  });

  it('Caso exitoso: admin entra en jugadores y crea un jugador que se ve en el listado', () => {
    const uniquePlayer = `jugador_ok_${Date.now()}`;

    // Login como admin (flujo real de UI)
    cy.visit('/login');
    cy.get('#username').type(adminUser);
    cy.get('#password').type(adminPassword);
    cy.contains('button', 'Iniciar Sesión').click();

    // Navegar a listado de jugadores
    cy.visit('/players');
    cy.contains('h2', 'Jugadores').should('be.visible');

    // Crear jugador por API (tu frontend actual no tiene formulario de alta en la vista de jugadores)
    cy.request({
      method: 'POST',
      url: `${apiUrl}/players`,
      body: {
        usuario: uniquePlayer,
        email: `${uniquePlayer}@mail.com`,
        password: 'User1234!',
        equipo: 'Equipo Cypress',
        deporte: 'Futbol'
      }
    }).then((resp) => {
      expect(resp.status).to.eq(201);
      expect(resp.body).to.have.property('mensaje', 'Jugador registrado');
    });

    // Validación visual del listado actualizado en navegador
    cy.reload();
    cy.contains('.card-title', uniquePlayer).should('be.visible');
    cy.contains('.jugador-card', uniquePlayer)
      .should('contain.text', 'Equipo Cypress');
  });

  it('Caso de error controlado: intento crear jugador duplicado devuelve 400 y la UI sigue estable', () => {
    const duplicated = `jugador_dup_${Date.now()}`;

    // Primera creación correcta
    cy.request({
      method: 'POST',
      url: `${apiUrl}/players`,
      body: {
        usuario: duplicated,
        email: `${duplicated}@mail.com`,
        password: 'User1234!',
        equipo: 'Equipo Duplicado',
        deporte: 'Futbol'
      }
    }).its('status').should('eq', 201);

    // Segunda creación con los mismos datos -> error controlado esperado
    cy.request({
      method: 'POST',
      url: `${apiUrl}/players`,
      failOnStatusCode: false,
      body: {
        usuario: duplicated,
        email: `${duplicated}@mail.com`,
        password: 'User1234!',
        equipo: 'Equipo Duplicado',
        deporte: 'Futbol'
      }
    }).then((resp) => {
      expect(resp.status).to.eq(400);
      expect(resp.body).to.have.property('mensaje', 'Usuario o email ya existe');
    });

    // La app sigue mostrando listado sin romperse
    cy.visit('/players');
    cy.contains('h2', 'Jugadores').should('be.visible');
    cy.get('.jugador-card').its('length').should('be.greaterThan', 0);
  });
});
```

---

## 5) Levantar backend y frontend para ejecutar E2E

Necesitas **dos terminales** abiertas.

### Terminal A (backend)

En carpeta `Proyecto_UT2/backend`:

```bash
npm install
node index.js
```

Debes ver algo como: `Servidor escuchando en puerto 3000`.

### Terminal B (frontend)

En carpeta `Proyecto_UT2`:

```bash
npm install
npm start
```

Debes ver Angular en `http://localhost:4200`.

---

## 6) Ejecutar las pruebas

Con backend y frontend ya levantados, abre otra terminal en `Proyecto_UT2`:

### Modo interfaz (recomendado para capturas)

```bash
npx cypress open
```

1. Elige `E2E Testing`.
2. Elige navegador (Chrome, Edge, etc.).
3. Ejecuta `players-admin-flow.cy.js`.

### Modo headless (sin interfaz)

```bash
npx cypress run --e2e
```

---

## 7) Qué evidencias debes entregar (importante para la tarea)

Haz capturas de:

1. Test **caso exitoso** en verde.
2. Test **error controlado** en verde.
3. Pantalla donde se vea el jugador creado en el listado (`/players`).

Además, en memoria/entrega describe brevemente:

- Qué flujo real simula el test.
- Qué valida el caso exitoso.
- Qué valida el caso de error controlado (duplicado con estado 400).

---

## 8) Solución de problemas comunes

1. **No carga jugadores en `/players`**
   - Revisa que backend esté en puerto 3000.
   - Revisa `src/environments/environment.ts` (`apiUrl: 'http://localhost:3000/api'`).

2. **Falla login admin en Cypress**
   - Verifica que MongoDB esté levantado.
   - Verifica que `MONGO_URI` sea válida.

3. **Error de CORS**
   - Tu backend ya usa `app.use(cors())`; reinicia backend si cambiaste algo.

4. **El test de duplicado no da 400**
   - Comprueba que la ruta `POST /api/players` sigue validando duplicados por `usuario/email`.

---

## 9) Checklist final (para saber que ya cumpliste todo)

Marca todo esto antes de entregar:

- [ ] Tengo Cypress instalado y configurado.
- [ ] Tengo un test E2E con flujo real: login admin + acceso a jugadores.
- [ ] Tengo creación de jugador validada.
- [ ] Tengo validación visual del nuevo jugador en el navegador.
- [ ] Tengo un caso de éxito y otro de error controlado (400 por duplicado).
- [ ] Tengo capturas/evidencias de ejecución.

---

Si quieres, después te preparo una versión corta “lista para pegar en la memoria de la tarea” (1 página, formato formal).