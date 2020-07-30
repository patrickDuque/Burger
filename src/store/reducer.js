/* eslint-disable default-case */
import * as actionTypes from './actions';

const initialState = {
  ingredients : { salad: 0, meat: 0, bacon: 0, cheese: 0 },
  price       : 15
};

const INGREDIENT_PRICES = {
  salad  : 12,
  cheese : 15,
  meat   : 20,
  bacon  : 17
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients : {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        price       : state.price + INGREDIENT_PRICES[action.ingredientType]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients : {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1
        },
        price       : state.price - INGREDIENT_PRICES[action.ingredientType]
      };
    case actionTypes.RESET_INGREDIENTS:
      return { ...state, ingredients: { salad: 0, meat: 0, bacon: 0, cheese: 0 }, price: 15 };
    default:
      return state;
  }
};

export default reducer;
