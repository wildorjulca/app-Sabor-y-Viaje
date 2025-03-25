-- Crear la base de datos
CREATE DATABASE TravelAppDB;
GO

-- Usar la base de datos
USE TravelAppDB;
GO

-- Tabla de Usuarios
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único del usuario
    name NVARCHAR(100) NOT NULL,      -- Nombre del usuario
    email NVARCHAR(100) NOT NULL UNIQUE, -- Correo electrónico (único)
    password NVARCHAR(255) NOT NULL,  -- Contraseña (encriptada)
    profile_picture NVARCHAR(255),    -- URL de la foto de perfil
    bio NVARCHAR(MAX),                -- Biografía del usuario
    created_at DATETIME DEFAULT GETDATE(), -- Fecha de registro
    updated_at DATETIME DEFAULT GETDATE()  -- Fecha de última actualización
);
GO

-- Tabla de Lugares
CREATE TABLE places (
    id INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único del lugar
    name NVARCHAR(100) NOT NULL,      -- Nombre del lugar
    description NVARCHAR(MAX),        -- Descripción del lugar
    location NVARCHAR(255),           -- Ubicación (dirección o coordenadas)
    latitude DECIMAL(10, 8),          -- Latitud para mapas
    longitude DECIMAL(11, 8),         -- Longitud para mapas
    created_by INT NOT NULL,          -- ID del usuario que creó el lugar
    created_at DATETIME DEFAULT GETDATE(), -- Fecha de creación
    updated_at DATETIME DEFAULT GETDATE(), -- Fecha de última actualización
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE -- Relación con usuarios
);
GO

-- Tabla de Publicaciones
CREATE TABLE posts (
    id INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único de la publicación
    user_id INT NOT NULL,             -- ID del usuario que publicó
    place_id INT NOT NULL,            -- ID del lugar asociado
    photo_url NVARCHAR(255) NOT NULL, -- URL de la foto publicada
    description NVARCHAR(MAX),        -- Descripción de la publicación
    created_at DATETIME DEFAULT GETDATE(), -- Fecha de creación
    updated_at DATETIME DEFAULT GETDATE(), -- Fecha de última actualización
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- Relación con usuarios
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE -- Relación con lugares
);
GO

-- Tabla de Calificaciones
CREATE TABLE ratings (
    id INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único de la calificación
    user_id INT NOT NULL,             -- ID del usuario que calificó
    place_id INT NOT NULL,            -- ID del lugar calificado
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5), -- Calificación (1 a 5)
    created_at DATETIME DEFAULT GETDATE(), -- Fecha de creación
    updated_at DATETIME DEFAULT GETDATE(), -- Fecha de última actualización
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- Relación con usuarios
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE -- Relación con lugares
);
GO

-- Tabla de Comentarios
CREATE TABLE comments (
    id INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único del comentario
    user_id INT NOT NULL,             -- ID del usuario que comentó
    place_id INT NOT NULL,            -- ID del lugar comentado
    comment NVARCHAR(MAX) NOT NULL,   -- Contenido del comentario
    created_at DATETIME DEFAULT GETDATE(), -- Fecha de creación
    updated_at DATETIME DEFAULT GETDATE(), -- Fecha de última actualización
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- Relación con usuarios
    FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE -- Relación con lugares
);
GO

-- Tabla de Likes
CREATE TABLE likes (
    id INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único del like
    user_id INT NOT NULL,             -- ID del usuario que dio like
    post_id INT NOT NULL,             -- ID de la publicación
    created_at DATETIME DEFAULT GETDATE(), -- Fecha de creación
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- Relación con usuarios
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE -- Relación con publicaciones
);
GO

-- Tabla de Seguidores
CREATE TABLE followers (
    id INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único de la relación
    follower_id INT NOT NULL,         -- ID del usuario que sigue
    followed_id INT NOT NULL,         -- ID del usuario seguido
    created_at DATETIME DEFAULT GETDATE(), -- Fecha de creación
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE, -- Relación con usuarios
    FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE -- Relación con usuarios
);
GO

-- Tabla de Notificaciones
CREATE TABLE notifications (
    id INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único de la notificación
    user_id INT NOT NULL,             -- ID del usuario que recibe la notificación
    message NVARCHAR(MAX) NOT NULL,   -- Contenido de la notificación
    is_read BIT DEFAULT 0,            -- Indica si la notificación fue leída (0 = no, 1 = sí)
    created_at DATETIME DEFAULT GETDATE(), -- Fecha de creación
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Relación con usuarios
);
GO





-- PROCEDIMIENTOS ALMACENADOS
-- CREAR USUARIO
CREATE PROCEDURE POST_PESONA_SAVE_PA
  @name NVARCHAR(100),
  @email NVARCHAR(100),
  @password NVARCHAR(255),
  @profile_picture NVARCHAR(255),
  @bio NVARCHAR(MAX)              
AS
BEGIN
  INSERT INTO Users (name, email, password, profile_picture, bio)
  VALUES (@name, @email, @password, @profile_picture, @bio);
END;
GO