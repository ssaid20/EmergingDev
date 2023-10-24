import { takeLatest, put } from "redux-saga/effects";
import axios from "axios";

// Saga to handle posting a new question
function* postQuestion(action) {
  try {
    yield axios.post("/api/question", action.payload);
    yield put({ type: "POST_QUESTION_SUCCESS" });
  } catch (error) {
    yield put({ type: "POST_QUESTION_FAILURE", error: error.message });
  }
}

// Saga to fetch details of a specific question by ID
function* fetchQuestion(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(
      `/api/question/${action.payload.id}`,
      config
    );
    yield put({ type: "FETCH_QUESTION_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "FETCH_QUESTION_FAILURE", error: error.message });
  }
}

// Saga to fetch all questions
function* fetchAllQuestions() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get("/api/question", config);
    yield put({ type: "FETCH_ALL_QUESTIONS_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "FETCH_ALL_QUESTIONS_FAILURE", error: error.message });
  }
}

// Saga to fetch questions posted by a specific user
function* fetchUserQuestions(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield axios.get(
      `/api/user/${action.payload.userId}`,
      config
    );
    yield put({ type: "FETCH_USER_QUESTIONS_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "FETCH_USER_QUESTIONS_FAILURE", error: error.message });
  }
}

// Saga to edit a specific question by ID
function* editQuestion(action) {
  try {
    yield axios.put(`/api/question/${action.payload.id}`, action.payload);
    yield put({ type: "EDIT_QUESTION_SUCCESS" });
  } catch (error) {
    yield put({ type: "EDIT_QUESTION_FAILURE", error: error.message });
  }
}

// Saga to delete a specific question by ID
function* deleteQuestion(action) {
  try {
    yield axios.delete(`/api/question/${action.payload.id}`);
    yield put({ type: "DELETE_QUESTION_SUCCESS" });
  } catch (error) {
    yield put({ type: "DELETE_QUESTION_FAILURE", error: error.message });
  }
}

// Watcher saga to listen for dispatched actions and delegate to appropriate worker sagas
function* watchQuestionSaga() {
  yield takeLatest("POST_QUESTION_REQUEST", postQuestion);
  yield takeLatest("FETCH_QUESTION_DETAILS", fetchQuestion);
  yield takeLatest("FETCH_ALL_QUESTIONS_REQUEST", fetchAllQuestions);
  yield takeLatest("FETCH_USER_QUESTIONS_REQUEST", fetchUserQuestions);
  yield takeLatest("EDIT_QUESTION_REQUEST", editQuestion);
  yield takeLatest("DELETE_QUESTION_REQUEST", deleteQuestion);
}

export default watchQuestionSaga;

