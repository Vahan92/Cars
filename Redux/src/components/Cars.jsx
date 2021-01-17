import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Table, Button, Modal } from 'react-bootstrap';
import { Icon, Popconfirm } from 'antd';
import Pagination from './Pagination';
import { fetchCars, confirm, saveEdit, addCar, deleteMany, getCars, createPost, editCar, removeCars } from '../actions/CarActions';

function Users() {
  const [editModal, showEditmodal] = useState(false);
  const [modal, modalShow] = useState(false);
  const [deleteArray, setDeleteArray] = useState([]);
  const [carInput, setCarInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      brand: '',
      model: '',
      year: null,
      color: '',
      type: ''
    }
  );

  const dispatch = useDispatch();
  const results = useSelector(state => state);

  console.log(`results `, results);

  useEffect(() => {
    // dispatch(fetchCars());
    dispatch(getCars());
  }, [dispatch]);

  const onChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setCarInput({ ...carInput, [name]: newValue });
  }

  const saveReportChanges = e => {
    e.preventDefault();
    // dispatch(saveEdit(carInput));
    dispatch(editCar(carInput));
  }

  const registerCar = e => {
    e.preventDefault();
    // dispatch(addCar(carInput));
    console.log(carInput);
    dispatch(createPost(carInput))
  }

  const edit = user => {
    showEditmodal(true);
    setCarInput(user);
    modalShow(true);
  }

  const addCarModal = () => {
    showEditmodal(false);
    modalShow(true);
  }

  const selectToDelete = id => {
    const index = deleteArray.indexOf(id);
    if (index !== -1) {
      setDeleteArray(deleteArray.filter(value => value !== id));
    } else {
      setDeleteArray(oldArray => [...oldArray, id]);
    }
  }

  const deleteCars = () => {
    // dispatch(deleteMany(deleteArray));
    dispatch(removeCars(deleteArray))
    setDeleteArray([]);
  }

  const confirmDelete = id => {
    const index = deleteArray.indexOf(id);
    if (index !== -1) setDeleteArray(deleteArray.filter(value => value !== id));
    dispatch(confirm(id))
  }

  return (
    <>
      {results.carsReducer.loading ? (
        "Loading..."
      ) : results.carsReducer.cars.length ? (
        <>
          <Table responsive>
            <thead>
              <tr>
                {Object.keys(results.carsReducer.cars[0]).filter(el => el !== "id" && el !== 'postId').map(el => (
                  <th key={el}>{el}</th>
                ))}
                <th>Actions</th>
                <th>
                  <Popconfirm
                    title="Are you sure you want to delete selected cars?"
                    placement="left"
                    onConfirm={deleteCars}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button disabled={deleteArray.length < 2} variant="outline-primary">Delete selected</Button>
                  </Popconfirm>
                </th>
              </tr>
            </thead>
            <tbody>
              {results.carsReducer.cars.map(el => (
                <tr key={el.id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.body}</td>
                  {/* <td>{el.color}</td>
                  <td>{el.type}</td> */}
                  <td>
                    <Popconfirm
                      title="Are you sure you want to delete this car?"
                      placement="left"
                      onConfirm={() => { confirmDelete(el._id) }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Icon type="delete" style={{ color: 'red', marginRight: "0.5rem" }} />
                    </Popconfirm>
                    <Icon type="edit" style={{ color: "#e6e600" }} onClick={() => edit(el)} />
                  </td>
                  <td><input onClick={() => { selectToDelete(el._id) }} type="checkbox" /></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination total={results.carsReducer.cars.length}/>
        </>
      ) : <h5>Ther are not any cars to be shown</h5>}
      <div>
        <Button onClick={addCarModal} variant="outline-primary">Add Car</Button>
      </div>
      <Modal
        show={modal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => modalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editing user info
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editModal ? saveReportChanges : registerCar} style={{ width: "100%", padding: "0 0.5rem" }}>
            {Object.keys(carInput).filter(val => val !== "_id").map(el => (
              <Form.Group key={el}>
                <Form.Label>
                  {el} :
                </Form.Label>
                <Form.Control onChange={onChange} defaultValue={editModal ? carInput[el] : ""} type={el === "year" ? "number" : "text"} name={el} required={true} />
              </Form.Group>
            ))}
            <div style={{ textAlign: "right" }}>
              <Button style={{ marginRight: "0.5rem" }} type="submit" className="btn btn-success">Save</Button>
              <Button className="btn btn-danger" onClick={() => modalShow(false)}>Cancel</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Users;