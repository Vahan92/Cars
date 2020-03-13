import { FETCH_CARS, SUCCESSFULY_REGISTERED, I_AM_A_TEAPOT } from './types';
import axios from "axios";
import { message } from 'antd';

export const fetchCars = () => dispatch => {
  fetch("http://localhost:4000/api/getCars")
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_CARS,
        payload: posts
      })
    );
};

export const addCar = postData => dispatch => {
  axios
    .post('http://localhost:4000/api/addCar', postData).then(res => {
      dispatch(fetchCars());
      dispatch({
        type: SUCCESSFULY_REGISTERED,
        payload: res
      })
      message.success('Car successfully registered', 7);
    }).catch((error) => {
      if (error.response.status === 418) {
        dispatch({
          type: I_AM_A_TEAPOT,
          payload: error
        })
        message.error('One of the fields is fieled in incorrectly', 7);
      }
    })
}

export const confirm = id => dispatch => {
  axios
    .delete(`http://localhost:4000/api/deleteCar/${id}`).then(res => {
      message.success('Car was successfully deleted', 7);
      dispatch(fetchCars());
    }).catch((error) => {
      if (error.response.status === 404) {
        message.error('There is not such a car', 7);
      }
    })
}

export const deleteMany = (idsToDelete) => dispatch => {
  axios
    .delete('http://localhost:4000/api/deleteMany', {
      data: { ids: idsToDelete }
    }).then(res => {
      message.success('Cars successfully deleted', 7);
      dispatch(fetchCars());
    }).catch((error) => {
      if (error.response.status === 404) {
        message.error('There are not such cars', 7);
      }
    })
}

export const saveEdit = car => dispatch => {
axios.patch(`http://localhost:4000/api/updateCar/${car["_id"]}`, car)
      .then(function (response) {
        message.success('Car information successfully updated', 7);
        dispatch(fetchCars());
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          message.error('There is not such a car', 7);
        }
        if (error.response.status === 400) {
          message.error(error.response.data, 7)
        }
      });
  }

