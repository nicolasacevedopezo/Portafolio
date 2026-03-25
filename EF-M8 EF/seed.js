const sequelize = require('./config/database');
const { User, Board, List, Card } = require('./models');

async function seed() {
  try {
    await sequelize.sync({ force: true }); 

    const nico = await User.create({ username: 'NicoAcevedo', email: 'nico@example.com' });
    const proyecto1 = await Board.create({ name: 'Proyecto Sprint 2', UserId: nico.id });
    const listaTodo = await List.create({ title: 'To Do', BoardId: proyecto1.id });
    await Card.create({ content: 'Aprender Sequelize', ListId: listaTodo.id });

    console.log("¡Base de datos poblada con éxito!");
  } catch (error) {
    console.error("Error en el seeding:", error);
  } finally {
    await sequelize.close();
  }
}

seed();