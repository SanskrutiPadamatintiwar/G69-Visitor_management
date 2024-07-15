const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Slot = require('./models/Slot');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/parkinglot_org');

app.get('/slots', async (req, res) => {
  const slots = await Slot.find();
  res.json(slots);
});

app.post('/slots', async (req, res) => {
  const slot = new Slot(req.body);
  await slot.save();
  res.json(slot);
});

app.put('/slots/:id', async (req, res) => {
  const { id } = req.params;
  const slot = await Slot.findByIdAndUpdate(id, req.body, { new: true });
  res.json(slot);
});

app.patch('/slots/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Slot.findById(id);
    if (slot) {
      slot.isOccupied = !slot.isOccupied;
      await slot.save();
      res.json(slot);
    } else {
      res.status(404).send('Slot not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
