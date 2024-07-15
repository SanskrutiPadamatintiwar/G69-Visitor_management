const mongoose = require('mongoose');
const Slot = require('./models/Slot');

mongoose.connect('mongodb://localhost:27017/parkinglot_org');

const seedData = async () => {
  try {
    await Slot.deleteMany({});

    const slots = [];
    for (let i = 1; i <= 8; i++) {
      slots.push({ number: i, isOccupied: false });
    }

    await Slot.insertMany(slots);
    console.log('Database seeded with 8 parking slots!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedData();
