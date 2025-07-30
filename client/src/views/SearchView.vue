<template>
  <div class="search-view">
    <div class="side-nav">
      <img src="https://via.placeholder.com/250x150" alt="Profile Picture" />
      <div class="menu">
        <button class="side-nav-btn" @click="goToMain">Main Menu</button>
        <button class="side-nav-btn" @click="goToMenu">Your Meal Plan</button>
      </div>
    </div>

    <div class="container">
      <div class="meal-wrapper">
        <div class="meal-search">
          <h2 class="title">Find Meal With Your Ingredients</h2>
          <blockquote>
            The most random quote you ever seen <br />
            <cite>- kdnts</cite>
          </blockquote>

          <div class="meal-search-box">
            <input
              v-model="searchInput"
              type="text"
              class="search-control"
              placeholder="Enter ingredient"
            />
            <button class="search-btn btn" @click="getMealList">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div class="meal-result">
          <h2 class="title">Your Search Result:</h2>
          <div id="meal" :class="{ notFound: meals.length === 0 }">
            <div v-if="meals.length === 0 && searched" class="notFound">
              Sorry, we didn't find any meal!
            </div>
            <div
              v-for="meal in meals"
              :key="meal.idMeal"
              class="meal-item"
            >
              <div class="meal-img">
                <img :src="meal.strMealThumb" alt="" />
              </div>
              <div class="meal-name">
                <h3>{{ meal.strMeal }}</h3>
                <a href="#" class="recipe-btn" @click.prevent="getMealRecipe(meal.idMeal)">Get Recipe</a>
                <button  class="recipe-btn" @click="addToMenu(meal.idMeal)">Add Recipe to Menu</button>
              </div>
            </div>
          </div>
        </div>

        <div class="meal-details" :class="{ showRecipe: showModal }">
          <button class="btn recipe-close-btn" @click="closeRecipe">
            <i class="fas fa-times"></i>
          </button>

          <div class="meal-details-content" v-if="selectedMeal">
            <h2 class="recipe-title">{{ selectedMeal.strMeal }}</h2>
            <p class="recipe-category">{{ selectedMeal.strCategory }}</p>
            <div class="recipe-instruct">
              <h3>Instructions:</h3>
              <p>{{ selectedMeal.strInstructions }}</p>
            </div>
            <div class="recipe-meal-img">
              <img :src="selectedMeal.strMealThumb" alt="Meal" />
            </div>
            <div class="recipe-link">
              <a :href="selectedMeal.strYoutube" target="_blank">Watch Tutorial</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchView",
  data() {
    return {
      searchInput: "",
      meals: [],
      selectedMeal: null,
      showModal: false,
      searched: false,
    };
  },
  methods: {
    goToMain() {
      this.$router.push('/');
    },
    goToMenu() {
      this.$router.push('/menu');
    },

    async getMealList() {
      this.searched = true;
      this.selectedMeal = null;
      this.showModal = false;

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.searchInput}`
      );
      const data = await response.json();
      this.meals = data.meals || [];
    },

    async getMealRecipe(idMeal) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const data = await response.json();
      this.selectedMeal = data.meals[0];
      this.showModal = true;
    },

    closeRecipe() {
      this.showModal = false;
      this.selectedMeal = null;
    },

    async addToMenu(mealId) {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await res.json();
      const meal = data.meals[0];

      await fetch("http://localhost:3000/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
        }),
      });
    }
  }
};
</script>

<style scoped>
@import "../style.css";
</style>
