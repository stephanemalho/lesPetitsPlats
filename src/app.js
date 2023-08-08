import './css/style.css';
import recipes from './data/recipes.js';
import { filterRecipes } from './js/mainFilter';
import { afficherSelectBox} from './js/selects.js';
import { getTotalRecipes, hideSelectBox } from './js/utils/utils.js';

afficherSelectBox();
hideSelectBox();
getTotalRecipes(recipes);
filterRecipes(recipes);