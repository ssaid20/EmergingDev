import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editProfile(action) {
    console.log("editProfile saga executed with payload:", action.payload);
    try {
      // Send the PUT request without the user ID in the URL
      console.log("Action Payload:", action.payload);
      yield axios.put(`/api/user`, action.payload);
      yield put({ type: "EDIT_PROFILE_SUCCESS" });
    } catch (error) {
      yield put({ type: "EDIT_PROFILE_FAILURE", error: error.message });
    }
}

function* profileSaga() {
    yield takeLatest('EDIT_PROFILE_REQUEST', editProfile);
    // Add other sagas here as necessary
}

export default profileSaga;

