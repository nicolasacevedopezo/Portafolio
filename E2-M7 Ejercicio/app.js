const pool = require('./config/db'); 

async function obtenerUsuarios() {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        console.log("--- Lista de Usuarios ---");
        console.table(resultado.rows);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function obtenerUsuarioPorEmail(email) {
    try {
        const consulta = 'SELECT * FROM usuarios WHERE email = $1';
        const valores = [email];
        const resultado = await pool.query(consulta, valores);
        
        if (resultado.rows.length > 0) {
            console.log("Usuario encontrado:", resultado.rows[0]);
        } else {
            console.log("No se encontró el usuario:", email);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function ejecutarApp() {
    await obtenerUsuarios();
    await obtenerUsuarioPorEmail('ana.garcia@example.com');
    await obtenerUsuarioPorEmail('noexiste@test.com');
    await pool.end();
}

ejecutarApp();