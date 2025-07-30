const Menu = require("../models/Menu");

exports.getMenu = async (req, res) => {
  let menu = await Menu.findOne();
  if (!menu) menu = await Menu.create({ meals: [] });
  res.json(menu);
};

exports.addMealToMenu = async (req, res) => {
  const { idMeal, strMeal, strMealThumb } = req.body;

  let menu = await Menu.findOne();
  if (!menu) menu = await Menu.create({ meals: [] });

  if (!menu.meals.some(meal => meal.idMeal === idMeal)) {
    menu.meals.push({ idMeal, strMeal, strMealThumb });
    await menu.save();
  }

  res.end();
};

exports.removeMeal = async (req, res) => {
  const { idMeal } = req.params;

  const menu = await Menu.findOne();
  if (menu) {
    menu.meals = menu.meals.filter(meal => meal.idMeal !== idMeal);
    await menu.save();
  }

  res.end();
};

exports.updateNote = async (req, res) => {
  const { note } = req.body;

  let menu = await Menu.findOne();
  if (!menu) menu = await Menu.create({ meals: [], note });
  else {
    menu.note = note;
    await menu.save();
  }

  res.json({ success: true, note: menu.note });
};
