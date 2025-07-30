
const axios = require('axios');

const searchMealsByIngredient = async (req, res) => {
  const ingredient = req.query.i;

  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  
  res.json(response.data);
};

module.exports = {
  searchMealsByIngredient
};
