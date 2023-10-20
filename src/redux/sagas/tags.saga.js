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

function* tagsSaga() {
  yield takeLatest("FETCH_TAGS", fetchTagsSaga);
}

export default tagsSaga;
