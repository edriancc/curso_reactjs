Instalación del Proyecto React

Sigue estos pasos para instalar y ejecutar el proyecto después de clonarlo.

1. Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>

2. Ingresar a la carpeta del proyecto

cd nombre-del-proyecto

3. Instalar dependencias

npm install

4. Copiar el archivo de configuración de entorno

Copia el archivo .env.example y renómbralo a .env:

cp .env.example .env

5. Configurar credenciales de Firebase

Edita el archivo .env y agrega las credenciales de Firebase en las siguientes variables:

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

6. Ejecutar el proyecto en modo desarrollo

npm run dev

Ahora puedes acceder a la aplicación en http://localhost:5173 (o el puerto que indique Vite).