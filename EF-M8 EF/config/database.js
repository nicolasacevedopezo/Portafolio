const { Sequelize } = require('sequelize');

// Reemplaza con tus credenciales de Postgres
const sequelize = new Sequelize('kanbanpro_db', 'tu_usuario', 'tu_password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, 
});

module.exports = sequelize;