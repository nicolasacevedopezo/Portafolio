const { Board, List, Card } = require('./models');

async function testDrive() {
  const tablero = await Board.findOne({
    where: { name: 'Proyecto Sprint 2' },
    include: [{
      model: List,
      include: [Card] 
    }]
  });

  console.log("Estructura del tablero:", JSON.stringify(tablero, null, 2));
  
  // ACTUALIZAR:
  await List.update({ title: 'En Progreso' }, { where: { id: 1 } });
}

testDrive();