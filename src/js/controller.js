import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime';
import recipeView from './views/recipeView.js';
import { async } from 'regenerator-runtime';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import Views from './views/View.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarkView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Fetch recipe data
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Load Spinner
    recipeView.spinner();

    // Activate active class
    resultsView.update(model.getSearchResultPage());
    // load recipe from model
    await model.loadRecipe(id);
    // Render recipe
    recipeView.render(model.state.recipe);

    // update bookmarked recipe
    bookmarksView.update(model.state.bookmarks);
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
    ResultsView.render(model.getSearchResultPage());

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

const controlServings = function (newServing) {
  // update servings
  recipeView.updateServings(newServing);
  // render recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};
const init = function () {
  recipeView.addHandlerRenderer(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
