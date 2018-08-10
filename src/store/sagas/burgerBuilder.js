import { put } from 'redux-saga/effects'

import axios from "../../axios-orders";

import * as actions from "../actions";

export function* initIngredientSaga(action) {
  try {
    const response = yield axios.get('https://react-hamburger-e9a67.firebaseio.com/ingredients.json')
    yield put(actions.setIngredients(response.data))
  } catch (error) {
    yield put(actions.fetchIngredientsFailed())
  }
}