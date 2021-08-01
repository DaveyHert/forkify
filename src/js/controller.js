import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime';
import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Fetch recipe data
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Load Spinner
    recipeView.spinner();
    // load recipe from model
    await model.loadRecipe(id);
    // Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    ResultsView.spinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.LoadSearchResults(query);
    console.log(model.state.search);
    ResultsView.render(model.getSearchResultPage(1));
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRenderer(controlRecipe);
  searchView.addHandlerSearch(controlSearch);
};
init();
