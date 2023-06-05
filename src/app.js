import './css/style.css';
import recipes from './data/recipes.js';
import { afficherSelectBox } from './js/selects.js';
import { renderRecipes } from './js/cards.js';

console.log('Hello Webpack!');
afficherSelectBox();
renderRecipes(recipes);



