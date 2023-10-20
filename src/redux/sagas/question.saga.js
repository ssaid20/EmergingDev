import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

function* postQuestion(action) {
  try {
    yield axios.post("/api/question", action.payload);
    yield put({ type: "POST_QUESTION_SUCCESS" });
  } catch (error) {
    yield put({ type: "POST_QUESTION_FAILURE", error: error.message });
  }
}
function* fetchQuestion(action) {
  console.log("actions: ", action);
  try {
    const response = yield axios.get(`/api/question/${action.payload.id}`);
    console.log("Response:", response.data);
    yield put({ type: "FETCH_QUESTION_SUCCESS", payload: response.data });
  } catch (error) {
    // console.log("ResFailure:", error, response.data);
    yield put({ type: "FETCH_QUESTION_FAILURE", error: error.message });
  }
}

function* editQuestion(action) {
  try {
    console.log("actions: ", action);
    yield axios.put(`/api/question/${action.payload.id}`, action.payload);
    yield put({ type: "EDIT_QUESTION_SUCCESS" });
  } catch (error) {
    yield put({ type: "EDIT_QUESTION_FAILURE", error: error.message });
  }
}

function* fetchAllQuestions() {
  try {
    const response = yield axios.get("/api/question");
    yield put({ type: "FETCH_ALL_QUESTIONS_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "FETCH_ALL_QUESTIONS_FAILURE", error: error.message });
  }
}

function* watchQuestionSaga() {
  yield takeLatest("POST_QUESTION_REQUEST", postQuestion);
  yield takeLatest("FETCH_QUESTION_DETAILS", fetchQuestion);
  yield takeLatest("EDIT_QUESTION_REQUEST", editQuestion);
  yield takeLatest("FETCH_ALL_QUESTIONS_REQUEST", fetchAllQuestions);
}

export default watchQuestionSaga;
