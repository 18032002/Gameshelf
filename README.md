# 🎮 GameShelf – Colección de estrategias por videojuego

**GameShelf** es una aplicación que permite guardar y votar apuntes tácticos para videojuegos.  
Fue desarrollada como proyecto integrador para demostrar la implementación de **Docker, GraphQL, Axios y MongoDB**.

## ✨ Características

- ✅ Listado de videojuegos disponibles.
- ✅ Creación de notas tácticas (públicas o privadas).
- ✅ Sistema de votos (útil / inútil) para las notas.
- ✅ Comunicación frontend-backend mediante **GraphQL** y **Axios**.
- ✅ Entorno completamente **dockerizado** con `docker-compose`.

## 🛠️ Tecnologías utilizadas

| Tecnología       | Propósito |
|-----------------|-----------|
| **Docker**       | Contenerización y orquestación de servicios (backend, frontend, MongoDB) |
| **GraphQL**      | API flexible en el backend (Apollo Server) |
| **Axios**        | Cliente HTTP en el frontend para consumir GraphQL |
| **MongoDB**      | Base de datos NoSQL para almacenar juegos y notas |
| **Node.js**      | Entorno de ejecución del backend |
| **HTML/CSS/JS**  | Frontend sencillo y funcional |

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos

- Tener instalado **Docker Desktop** (incluye Docker Compose).
- (Opcional) Git para clonar el repositorio.

### Pasos para levantar la aplicación

1. **Clonar el repositorio** (si no lo tienes local):
   ```bash
   git clone https://github.com/18032002/Gameshelf.git
   cd gameshelf
