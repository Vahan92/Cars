import { takeLatest, takeEvery, call, put, fork } from "redux-saga/effects";
import * as actions from "../actions/CarActions";
import axios from "axios";
// import * as api from '../api/users';

const baseUrl = "http://localhost:4000/api";

function* getCars() {
  try {
    const result = yield call(() => {
      return axios.get(`${baseUrl}/getCars`);
    });
    yield put(actions.getCarsSuccess(result.data));
  } catch (error) {
    console.error(error);
  }
}

function* removeCar(id) {
  try {
    const result = yield call(() => {
      return axios.delete(`${baseUrl}/${id}`);
    });
    yield put(actions.removeCareSuccess(result.data));
    yield put({ type: "GET_CARS_REQUEST" });
  } catch (error) {
    console.error(error);
  }
}

function* removeCars(ids) {
  try {
    const result = yield call(() => {
      return axios
      .delete(`${baseUrl}/deleteMany`, {
        data: { ids: ids.payload }
      });
    });
    yield put(actions.removeCarsSuccess(result.data));
    yield put({ type: "GET_CARS_REQUEST" });
  } catch (error) {
    console.error(error);
  }
}

function* editCar(car) {
  console.log(`car `, car);

  console.log(`car["_id"] `, car._id);
  try {
    const result = yield call(() => {
      return axios.patch(`${baseUrl}/updateCar/${car.payload["_id"]}`, car.payload);
    });
    yield put(actions.editCar(result.data));
    yield put({ type: "GET_CARS_REQUEST" });
  } catch (error) {
    console.error(error);
  }
}

// function* editCar(id) {
//   try {
//     const result = yield call(() => {
//       return axios.delete(`${baseUrl}/${id}`);
//     });
//     yield put(actions.removeCareSuccess(result.data));
//     yield put({ type: "GET_CARS_REQUEST" });
//   } catch (error) {
//     console.error(error);
//   }
// }

function* createPost(action) {
  console.log(`action `, action);
  try {
    const newPost = yield call(() => {
      axios.post(`${baseUrl}/addCar`, action.payload);
    });
    // yield put(actions.createPostSuccess(newPost));
    yield put({ type: "GET_CARS_REQUEST" });
  } catch (error) {
    yield put({ type: "I_AM_A_TEAPOT" });
    console.error(error);
  }
}

function* watchCreatePost() {
  yield takeLatest("CREATE_POST_SUCCESS", createPost);
}

function* watchGetCarsRequest() {
  yield takeEvery("GET_CARS_REQUEST", getCars);
}

function* watchRemoveCar() {
  yield takeEvery("REMOVE_CAR", removeCar);
}

function* watchRemoveCars() {
  yield takeEvery("REMOVE_CARS", removeCars);
}

function* watchEditCar() {
  yield takeEvery("EDIT_CAR", editCar);
}

const carsSagas = [
  fork(watchGetCarsRequest),
  watchCreatePost(),
  watchRemoveCar(),
  watchEditCar(),
  watchRemoveCars()
];

export default carsSagas;
