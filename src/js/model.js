import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    // Fetch recipe
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    // store the recipe date in the state object
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
      sourceURL: recipe.source_url,
      ingredients: recipe.ingredients,
      cookingTime: 45,
      servings: recipe.servings,
    };

    // console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const LoadSearchResults = async function (query) {
  try {
    // store query for future use
    state.search.query = query;
    // fetch recipes from API and store response as data
    const data = await getJSON(`${API_URL}?search=${query}`);
    // Map over results array and rename each recipes prop, then save response in state
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.result.slice(start, end);
};
