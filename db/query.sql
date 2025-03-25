


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