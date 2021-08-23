import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime';
import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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
    // console.log(model.state.search);
    ResultsView.render(model.getSearchResultPage(1));

    // render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goto) {
  ResultsView.render(model.getSearchResultPage(goto));
  // render pagination
  paginationView.render(model.state.search);
  controlServings();
};

const controlServings = function (serving) {
  // update servings
  recipeView.updateServings(serving);
  // render recipe
  recipeView.render(model.state.recipe);
  console.log('Servings Updated');
};

const init = function () {
  recipeView.addHandlerRenderer(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};
init();
