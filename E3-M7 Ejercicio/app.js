const { Pool } = require('pg');
const pool = new Pool({
    user: 'tu_usuario',
    host: 'localhost',
    database: 'nombre_tu_base_de_datos',
    password: 'tu_password',
    port: 5432,
});
async function insertarTarea(titulo, descripcion) {
    const consulta = 'INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2)';
    const valores = [titulo, descripcion];

    try {
        const resultado = await pool.query(consulta, valores);
        console.log(`Tarea "${titulo}" insertada con éxito. Filas afectadas: ${resultado.rowCount}`);
    } catch (error) {
        console.error('Error al insertar tarea:', error.message);
    }
}
async function actualizarTarea(id, nuevoTitulo, nuevaDescripcion) {
    const consulta = 'UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3';
    const valores = [nuevoTitulo, nuevaDescripcion, id];

    try {
        const resultado = await pool.query(consulta, valores);
        if (resultado.rowCount > 0) {
            console.log(`Tarea con ID ${id} actualizada. Filas afectadas: ${resultado.rowCount}`);
        } else {
            console.log(`No se encontró ninguna tarea con ID ${id} para actualizar.`);
        }
    } catch (error) {
        console.error('Error al actualizar tarea:', error.message);
    }
}

async function eliminarTarea(id) {
    const consulta = 'DELETE FROM tareas WHERE id = $1';
    const valores = [id];

    try {
        const resultado = await pool.query(consulta, valores);
        if (resultado.rowCount > 0) {
            console.log(`Tarea con ID ${id} eliminada. Filas afectadas: ${resultado.rowCount}`);
        } else {
            console.log(`No se encontró ninguna tarea con ID ${id} para eliminar.`);
        }
    } catch (error) {
        console.error('Error al eliminar tarea:', error.message);
    }
}

async function main() {
    console.log('--- Iniciando pruebas de base de datos ---');
    await insertarTarea('Nueva Tarea de Prueba', 'Esta es una descripción.');
    await actualizarTarea(1, 'Aprender PostgreSQL Profundo', 'Completar todos los ejercicios avanzados.');
    await eliminarTarea(2);
    await pool.end();
    console.log('--- Pruebas finalizadas ---');
}
main();