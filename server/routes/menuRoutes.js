const express = require("express");
const router = express.Router();
const {
    getMenu,
    addMealToMenu,
    removeMeal,
    updateNote,
} = require("../controllers/menuController");

router.get("/", getMenu);
router.post("/", addMealToMenu);
router.delete("/:idMeal", removeMeal);
router.put("/note", updateNote);

module.exports = router;
