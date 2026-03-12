const { Pool } = require('pg');


const config = {
  user: 'tu_usuario',         
  host: 'localhost',          
  database: 'nombre_tu_db',    
  password: 'tu_password',      
  port: 5432,                 
};

const pool = new Pool(config);

const verificarConexion = async () => {
  try {
    const client = await pool.connect();
    
    console.log("Conexión exitosa a Base");

    client.release(); 
 
    
  } catch (err) {
    console.error("Error al conectar a la base de datos:");
    console.error(err.stack); 
  }
};


verificarConexion();