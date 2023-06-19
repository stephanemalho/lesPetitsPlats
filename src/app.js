import './css/style.css';
import recipes from './data/recipes.js';
import { afficherSelectBox, getTotalRecipes} from './js/selects.js';
import { hiddeSelectBox } from './js/utils/utils.js';

console.log('Hello Webpack!');
afficherSelectBox();
hiddeSelectBox();
getTotalRecipes(recipes);