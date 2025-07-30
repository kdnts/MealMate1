const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  meals: [
    {
      idMeal: String,
      strMeal: String,
      strMealThumb: String,
    },
  ],
  note: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Menu', menuSchema);
