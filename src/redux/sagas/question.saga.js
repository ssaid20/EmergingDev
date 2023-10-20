import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

function* postQuestion(action) {
  try {
    yield axios.post("/api/question", action.payload);
    yield put({ type: "POST_QUESTION_SUCCESS" });
  } catch (error) {
    yield put({ type: "POST_QUESTION_FAILURE", error: error.message });
  }
}

function* postQuestionSaga() {
  yield takeLatest("POST_QUESTION_REQUEST", postQuestion);
}

export default postQuestionSaga;
