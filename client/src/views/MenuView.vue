<template>
  <div class="search-view">
    <div class="side-nav">
      <img src="https://sdmntprwestus.oaiusercontent.com/files/00000000-ea70-6230-8692-033da3813955/raw?se=2025-08-03T18%3A54%3A46Z&sp=r&sv=2024-08-04&sr=b&scid=b5b1aca5-b50d-5e0a-a104-c3170f2b9b8f&skoid=ea1de0bc-0467-43d6-873a-9a5cf0a9f835&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-03T12%3A09%3A05Z&ske=2025-08-04T12%3A09%3A05Z&sks=b&skv=2024-08-04&sig=mxTEgr5zfpY9MokmS64U5IQGNLpP3DgD8H%2Bj2PNMFfo%3D" alt="Profile Picture" />
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
