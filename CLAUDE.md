# Proyecto personal

Este proyecto es utilizado por una persona no desarrolladora.

El usuario describirá solicitudes usando lenguaje natural.

Ejemplos:

"Agrega un botón para descargar PDF"
"Cambia el color del encabezado"
"Haz más grande el logo"
"Agrega una nueva sección"
"Cambia el texto del botón"

Nunca solicitar ni explicar conceptos técnicos:

- Git
- commit
- push
- pull
- ramas
- checkout
- merge
- rebase
- PR
- repositorio
- terminal

El usuario no necesita conocimientos técnicos.

Interpretar automáticamente las solicitudes y traducirlas a acciones de desarrollo.

---

# Flujo automático para cambios

Cuando el usuario solicite un cambio:

1. Analizar la solicitud.
2. Revisar que te encuentras en la rama qas, sino cambiar a rama qas
3. Realizar únicamente los cambios necesarios.
4. Mantener intacta toda funcionalidad protegida.
5. Guardar cambios automáticamente.
6. Crear un commit automáticamente con un mensaje descriptivo.
7. Hacer push automáticamente a la rama qas.
8. Mostrar el enlace publicado de QAS.
9. Explicar brevemente qué cambió.

Ejemplo de respuesta:

"Se realizaron los cambios solicitados.

Cambios realizados:
- Se agregó botón de descarga
- Se ajustó el estilo visual

Puedes probarlo aquí:

https://hermosillo-i3.github.io/design-project-management-app/qas/

Nota: Puede tardar unos segundos en que se vea reflejado los cambios ya que se están subiendo

Si deseas publicar estos cambios a producción escribe exactamente:

Sube estos cambios"

---

# Publicación a producción

Nunca actualizar main automáticamente.

Aunque el usuario diga frases como:

- "ya quedó"
- "está bien"
- "me gusta"
- "perfecto"
- "listo"
- "se ve bien"

NO publicar todavía.

Mantener los cambios únicamente en QAS.

Solo publicar cuando el usuario escriba explícitamente:

"Sube estos cambios"

También aceptar:

"Publica estos cambios"

o:

"Mándalos a producción"

Cuando el usuario lo solicite:

1. Tomar la versión aprobada desde qas.
2. Actualizar main.
3. Hacer push a main.
4. Mostrar enlace de producción.

Ejemplo:

"Los cambios fueron publicados correctamente.

Puedes verlo aquí:

https://hermosillo-i3.github.io/design-project-management-app/ "

Nota: Puede tardar unos segundos en que se vea reflejado los cambios ya que se están subiendo

---

# Protección obligatoria de Firebase y autenticación

Este proyecto contiene una sección crítica dentro de index.html relacionada con Firebase.

Nunca modificar, eliminar, mover, renombrar o refactorizar:

- firebaseConfig
- FIREBASE_QAS
- FIREBASE_PROD
- initializeApp
- getAuth
- getFirestore
- signInWithPopup
- onAuthStateChanged
- setDoc
- getDoc
- loadFromFirestore
- scheduleFirestoreSave
- ghSignIn
- ghSignOut
- forceSignOut
- AUTH_MARKER_KEY
- ALLOWED_EMAILS
- __ghCache

Nunca modificar:

- autenticación
- login
- persistencia de datos
- configuración Firebase
- API keys
- Firestore
- reglas de acceso
- credenciales
- sesiones
- permisos

Nunca eliminar código aunque parezca no utilizado si pertenece a Firebase o autenticación.

Nunca optimizar, reorganizar o limpiar código relacionado con Firebase.