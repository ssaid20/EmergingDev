// tags.saga.js

import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTagsSaga() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/tags", config);
    yield put({ type: "SET_TAGS", payload: response.data });
  } catch (error) {
    console.log("Error fetching tags:", error);
  }
}

function* fetchQuestionsForTagSaga(action) {
  try {
      const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
      };
      const response = yield axios.get(`/api/tags/${action.payload}/questions`, config);
      yield put({ type: "SET_QUESTIONS_FOR_TAG", payload: response.data });
  } catch (error) {
      console.log("Error fetching questions for tag:", error);
  }
}

function* tagsSaga() {
  yield takeLatest("FETCH_TAGS", fetchTagsSaga);
  yield takeLatest("FETCH_QUESTIONS_FOR_TAG", fetchQuestionsForTagSaga);
}

export default tagsSaga;
