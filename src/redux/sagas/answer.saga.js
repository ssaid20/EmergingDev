import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* postAnswer(action) {
  try {
    console.log("Sending payload to backend:", action.payload);
    yield axios.post("/api/answer", action.payload);
    yield put({ type: "POST_ANSWER_SUCCESS" });
  } catch (error) {
    yield put({ type: "POST_ANSWER_FAILURE", error: error.message });
  }
}

function* fetchAnswersForQuestion(action) {
  try {
    console.log("action payload", action);
    const response = yield axios.get(`/api/answer/${action.payload}`);
    yield put({ type: "FETCH_ANSWERS_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "FETCH_ANSWERS_FAILURE", error: error.message });
  }
}

function* watchAnswerSaga() {
  yield takeLatest("POST_ANSWER_REQUEST", postAnswer);
  yield takeLatest("FETCH_ANSWERS_FOR_QUESTION", fetchAnswersForQuestion);
}

export default watchAnswerSaga;
