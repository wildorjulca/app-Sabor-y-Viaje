


-- PROCEDIMIENTOS ALMACENADOS ----

-- 01 CREAR (USUARIO)
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


-- QUERY DE FILTRO Y SELECT GENERAL
CREATE PROCEDURE getUser_PR 
  @name NVARCHAR(100)
AS
BEGIN
  IF @name = '' 
   BEGIN
     SELECT * FROM users
   END
  ELSE
  BEGIN
  SELECT * FROM users WHERE  name LIKE '% '+ @name + '%'
  END
END
GO


------------------------------------------
------------- REGIONES -------------------
-------------------------------------------
CREATE PROCEDURE Regiones_pa 
  @tipo INT = NULL
AS
BEGIN
  -- Listar las regiones
  IF @tipo  = 1
     BEGIN
	  SELECT id,Nombre,Descripcion,ImagenPortada,Clima,MejorEpocaVisita FROM Regiones
	  RETURN
	 END
END
GO


------------------------------------------
-----------CategoriasLugares--------------
------------------------------------------

CREATE PROCEDURE CategoriasLugares_PA 
  @tipo INT = NULL
AS
BEGIN
    IF @tipo = 1
	  BEGIN
	    SELECT id,Nombre,Icono,Descripcion, 
		   CASE 
		     WHEN  Estado = 'A' THEN 'ACTIVO'
			 WHEN Estado = 'X' THEN 'INACTIVO' 
			 ELSE 'Estado desconicido'
			 END AS 'Estado'
			 FROM CategoriasLugares WHERE Estado = 'A'
	  END
END