const pool = require('./dbconfig');

async function realizarTransferencia(cuentaOrigenId, cuentaDestinoId, monto) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        console.log(`\nIniciando transferencia de $${monto}...`);
        const descuento = await client.query(
            'UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2 RETURNING *',
            [monto, cuentaOrigenId]
        );

        if (descuento.rowCount === 0) {
            throw new Error("La cuenta de origen no existe.");
        }
        const abono = await client.query(
            'UPDATE cuentas SET saldo = saldo + $1 WHERE id = $2 RETURNING *',
            [monto, cuentaDestinoId]
        );
        if (abono.rowCount === 0) {
            throw new Error("La cuenta de destino no existe");
        }
        await client.query('COMMIT');
        console.log("ÉXITO: Transferencia realizada y guardada");

    } catch (error) {
        await client.query('ROLLBACK');
        console.error("ERROR: La transacción ha sido revertida");
        console.error(`Motivo: ${error.message}`);
    } finally {

        client.release();
    }
}

realizarTransferencia(1, 2, 100.00);
