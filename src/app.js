import './css/style.css';
import recipes from './data/recipes.js';
import { afficherSelectBox, getTotalRecipes} from './js/selects.js';
import { hideSelectBox } from './js/utils/utils.js';

console.log('Hello Webpack!');
afficherSelectBox();
hideSelectBox();
getTotalRecipes(recipes);