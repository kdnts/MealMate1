<template>
  <div class="search-view">
    <div class="side-nav">
      <img src="client\src\assets\LOGO.jpg" alt="Profile Picture" />
      <div class="menu">
        <button class="side-nav-btn" @click="goToMain">Main Menu</button>
        <button class="side-nav-btn" @click="goToMenu">Your Meal Plan</button>
      </div>
    </div>

    <div class="container">
      <div class="meal-wrapper">
        <h2 class="title">Your Meal Plan</h2>
        <div class="meal-result">
          <div id="meal">
            <div v-for="meal in menu.meals" :key="meal.idMeal" class="meal-item">
              <div class="meal-img">
                <img :src="meal.strMealThumb" alt="Meal Image" />
              </div>
              <div class="meal-name">
                <h3>{{ meal.strMeal }}</h3>
                <button class="recipe-btn" @click="removeMeal(meal.idMeal)">Remove</button>
              </div>
            </div>
          </div>
          <div v-if="menu.meals.length === 0" class="notFound">
            No meals in your plan.
          </div>
        </div>
                                              
        <div class="meal-note-total">
          <label for="note">Note for this meal plan:</label>
          <textarea id="note" v-model="menu.note" placeholder="Enter your overall note here"></textarea>
          <button class="update-btn" @click="updateNote">Update Note</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuView',
  data: () => ({
    menu: { meals: [], note: '' }
  }),
  mounted() {
    this.fetchMenu();
  },
  methods: {
    fetchMenu() {
      fetch('https://mealmate1-0z1s.onrender.com/api/menu')
        .then(res => res.json())
        .then(data => {
          this.menu.meals = data.meals || [];
          this.menu.note = data.note || '';
        });
    },

    removeMeal(idMeal) {
      fetch(`https://mealmate1-0z1s.onrender.com/api/menu/${idMeal}`, { method: 'DELETE' })
        .then(() => this.fetchMenu());
    },

    updateNote() {
      fetch('https://mealmate1-0z1s.onrender.com/api/menu/note', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: this.menu.note }),
      });
    },

    goToMain() {
      this.$router.push('/');
    },

    goToMenu() {
      this.$router.push('/menu');
    }
  }
};
</script>

<style scoped>
@import '../style.css';
</style>
