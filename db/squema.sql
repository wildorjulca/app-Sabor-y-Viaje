

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


---- YA ESTA CREDA
CREATE TABLE  Regiones (
    id INT PRIMARY KEY IDENTITY(1,1),
	Nombre NVARCHAR(100) NOT NULL,
	Decripcion NVARCHAR(200),
	ImagenPortada NVARCHAR(255),
	Clima NVARCHAR(50),
    MejorEpocaVisita NVARCHAR(100),
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    FechaActualizacion DATETIME NULL, 
    Activo CHAR(1) DEFAULT 'A'
)


SELECT * FROM CategoriasLugares
-- ya esta creada
CREATE TABLE CategoriasLugares (
    id INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(50) NOT NULL, -- "Caminata", "Playa", "Río", "Arqueológico"
    Icono NVARCHAR(50), -- Nombre del icono o URL
    Descripcion NVARCHAR(200),
    Activo CHAR(1) DEFAULT 'A'
);
SELECT * FROM LugaresTuristicos
--- ya esta creada
CREATE TABLE LugaresTuristicos(
    id INT PRIMARY KEY IDENTITY(1,1),
	Nombre NVARCHAR(150) NOT NULL,
	Descripcion NVARCHAR(MAX),
	Longitud DECIMAL(11, 8),
	PrecioEntrada DECIMAL(10, 2),
    HorarioApertura NVARCHAR(100),
	Destacado BIT DEFAULT 0,
    FechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
	FechaActualizacion DATETIME NULL,
    Activo CHAR(1) DEFAULT 'A',
	-- RELACIONES
	Cod_region INT NOT NULL,
	Cod_categoria INT NOT NULL,
    CONSTRAINT FK_Lugar_Region FOREIGN KEY(Cod_region) REFERENCES Regiones(id),
	CONSTRAINT FK_Lugar_Categoria FOREIGN KEY (Cod_categoria) REFERENCES LugaresTuristicos(id)
)

SELECT * FROM ImagenesLugares
--- Y esta creada
CREATE TABLE ImagenesLugares  (
    id INT PRIMARY KEY IDENTITY(1,1),
	iamgen NVARCHAR(255) NOT NULL,
	Orden INT DEFAULT 0,
    EsPrincipal BIT DEFAULT 0,
    Cod_lugarTuristico INT NOT NULL,
	 EsAprobada BIT DEFAULT 1, -- Para moderar fotos subidas por usuarios

	CONSTRAINT FK_Imagen_Lugar  FOREIGN KEY (Cod_lugarTuristico) REFERENCES LugaresTuristicos(id)
) 
ALTER TABLE ImagenesLugares 
ADD EsAprobada BIT DEFAULT 1

SELECT * FROM Usuarios
--- Y esta creado
CREATE TABLE Usuarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Contrasena NVARCHAR(255) NOT NULL,
    FotoPerfil NVARCHAR(255),
    FechaRegistro DATETIME DEFAULT GETDATE(),
    Activo CHAR(1) DEFAULT 'A'
);

SELECT * FROM Valoraciones
-- Ya esta creado
CREATE TABLE Valoraciones (
    id INT PRIMARY KEY IDENTITY(1,1),
    Cod_usuario INT NOT NULL,
    Cod_lugarTuristico INT NOT NULL,
    Puntuacion TINYINT CHECK (Puntuacion BETWEEN 1 AND 5),
    Fecha DATETIME DEFAULT GETDATE(),
    
    CONSTRAINT FK_Valoracion_Usuario FOREIGN KEY (Cod_usuario) REFERENCES Usuarios(id),
    CONSTRAINT FK_Valoracion_Lugar FOREIGN KEY (Cod_lugarTuristico) REFERENCES LugaresTuristicos(id),
    CONSTRAINT UQ_Valoracion UNIQUE (Cod_usuario, Cod_lugarTuristico) -- Un usuario solo puede valorar una vez
);

SELECT * FROM Favoritos
-- Ya esta creada
CREATE TABLE Favoritos (
    Cod_usuario INT NOT NULL,
    Cod_lugarTuristico INT NOT NULL,
    FechaAgregado DATETIME DEFAULT GETDATE(),
    
    PRIMARY KEY (Cod_usuario, Cod_lugarTuristico),
    CONSTRAINT FK_Favorito_Usuario FOREIGN KEY (Cod_usuario) REFERENCES Usuarios(id),
    CONSTRAINT FK_Favorito_Lugar FOREIGN KEY (Cod_lugarTuristico) REFERENCES LugaresTuristicos(id)
);

SELECT * FROM COMENTARIOS
-- Y esta creada
CREATE TABLE Comentarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    Cod_usuario INT NOT NULL,
    Cod_lugarTuristico INT NOT NULL,
    Contenido NVARCHAR(MAX) NOT NULL,
    Fecha DATETIME DEFAULT GETDATE(),
    FechaActualizacion DATETIME NULL,
    EsAprobado BIT DEFAULT 1, -- Para moderación
    
    CONSTRAINT FK_Comentario_Usuario FOREIGN KEY (Cod_usuario) REFERENCES Usuarios(id),
    CONSTRAINT FK_Comentario_Lugar FOREIGN KEY (Cod_lugarTuristico) REFERENCES LugaresTuristicos(id)
);

SELECT * FROM FOTOSCOMENTARIOS
-- Y esta creada
CREATE TABLE FotosComentarios (
    id INT PRIMARY KEY IDENTITY(1,1),
    Cod_comentario INT NOT NULL,
    Cod_usuario INT NOT NULL,
    URLImagen NVARCHAR(255) NOT NULL,
    FechaSubida DATETIME DEFAULT GETDATE(),
    EsAprobada BIT DEFAULT 0, -- Moderación para fotos de usuarios
    
    CONSTRAINT FK_FotoComentario_Comentario FOREIGN KEY (Cod_comentario) REFERENCES Comentarios(id),
    CONSTRAINT FK_FotoComentario_Usuario FOREIGN KEY (Cod_usuario) REFERENCES Usuarios(id)
);