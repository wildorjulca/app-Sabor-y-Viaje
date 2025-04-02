import sql from 'mssql'

// const dbSetting = {
//     user: 'wildor',
//     password: 'wildor12345',
//     server: 'localhost',
//     database: 'webstore',
//     options: {
//         encrypt:true,
//         trustServerCertificate:true,
//     }
// }

// export const getConnection = async () => {
//     const pool = await slq.connect(dbSetting)
//     const result = await pool.request().query("SELECT * FROM persona")
//     console.log(result)

// }



export const conexion = () => {
    const config = {
        user: "wildor",
        password: "wildor12345",
        server: "localhost",
        database: "toursApp",
        options: {
            encrypt: true, // Requerido por Azure
            trustServerCertificate: true, // Para servidores locales
        },
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000,
        },
    };

    try {
        const pool = new sql.ConnectionPool(config);
        console.log("Conexión establecida exitosamente a la base de datos.");
        return pool.connect();
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    }
};
