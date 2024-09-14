
# Investigacion-Aplicada2

## Instalación

### GitHub
Para descargar el repositorio, ejecute el siguiente comando:
```
git clone <https://github.com/AlexHernandez2698632494/Investigacion-Aplicada2.git>
```

### Instalación Docker

1. Instalar la imagen de MySQL de Docker con el siguiente comando:
```
docker pull mysql
```

2. Ejecutar el siguiente comando para crear y ejecutar un contenedor de MySQL:
```
docker run -d --name aguilasdoradas -e MYSQL_ROOT_PASSWORD=aguilasdoradas24 -e MYSQL_DATABASE=iad -p 3306:3306 mysql
```

3. Verificar los contenedores en ejecución con el comando:
```
docker ps
```

4. Ingresar al contenedor MySQL:
```
docker exec -it aguilasdoradas bash
```

5. Escribir la contraseña `aguilasdoradas24` y presionar Enter.

6. Como ya se creó una base de datos, puede verificar las bases de datos con:
```
show databases;
```

7. Ingresar a la base de datos llamada `iad`:
```
use iad;
```

8. Ver las tablas de la base de datos `iad`:
```
show tables;
```

9. Describir los atributos de una tabla específica:
```
describe <nombre-de-la-tabla>;
```

### Abrir el archivo clonado

1. Después de clonar el repositorio, ejecute el comando:
```
npm install
```

2. Navegar a la carpeta `iad` e instalar dependencias:
```
cd iad
npm install
```

## Base de Datos

La base de datos se encuentra en la carpeta `database/iad.sql`.

## Ejecutar la API

1. Iniciar la imagen de MySQL en Docker (si no está en ejecución).

2. En la carpeta raíz, ejecutar el siguiente comando para iniciar la API:
```
npm run dev
```

3. Navegar a la carpeta `iad` y ejecutar Expo para iniciar la aplicación:
```
cd iad
npx expo start
```

