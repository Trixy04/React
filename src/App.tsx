import React, { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

import Form from 'react-bootstrap/Form';

const data = [
  { name: "Anom", age: 19, gender: "Male" },
  { name: "Megha", age: 19, gender: "Female" },
  { name: "Subham", age: 25, gender: "Male" },
]

const form = false;
const btn = false;
const btn_mod = false;
const insert_btn = true;

function App() {
  const [students, setStudents] = useState(data);
  const [showForm, setShowForm] = useState(form);
  const [showBtn, setShowBtn] = useState(btn);
  const [showBtnMod, setShowBtnMod] = useState(btn_mod);
  const [showInsertBtn, setShowInsertBtn] = useState(insert_btn);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [studentToEdit, setStudentToEdit] = useState('');

  function delete_(el: String) {
    setStudents(students.filter(obj => obj.name !== el));
  }

  function add() {
    students.push({ name: name, age: parseInt(age), gender: gender });
    setStudents(students);
    setShowForm(false);
  }

  function show_set() {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }

  function mod() {
    for (let i = 0; i < students.length; i++) {
      if (students[i].name == studentToEdit) {
        students[i].name = name
        students[i].gender = gender
        students[i].age = parseInt(age)
        break;
      }
    }
    setStudents(students)
    show_set()
  }

  function reset_user() {
    var name_ = ''
    var age_ = ''
    var gender_ = ''
    setName(name_)
    setAge(age_)
    setGender(gender_)
  }

  function show_btn() {
    if (showBtn) {
      setShowBtn(false);
    } else {
      setShowBtn(true);
    }
  }

  function show_insert() {
    if (showInsertBtn) {
      setShowInsertBtn(false);
    } else {
      setShowInsertBtn(true);
    }
  }

  function show_btn_mod() {
    if (showBtnMod) {
      setShowBtnMod(false);
    } else {
      setShowBtnMod(true);
    }
  }

  function handleModClick(val: any) {
    setName(val.name)
    setAge(val.age)
    setGender(val.gender)
    setStudentToEdit(val.name)
    show_set();
    show_btn_mod();
    show_insert()
  }

  return (
    <div className="App">

      <Navbar>
        <Container>
          <Navbar.Brand href="#home">CLASS MANAGER</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Teriaca Mattia</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <center>
        <Button className='btn-success' onClick={() => { show_set(); show_btn() }}>ADD +</Button>

        <Table striped className='w-50 mt-5 text-center align-middle'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Età</th>
              <th>Sesso</th>
              <th>Modifica</th>
              <th>Elimina</th>
            </tr>
          </thead>
          <tbody>
            {students.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.age}</td>
                  <td>{val.gender}</td>
                  <td className='text-center'>
                    <Button className='btn-light' onClick={() => handleModClick(val)}>
                      <AiFillEdit color="" />
                    </Button>
                  </td>
                  <td className='text-center'>


                    <Button onClick={() => delete_(val.name)} className='btn-light'>
                      <BsFillTrash3Fill color="red" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        {showForm &&
          <Form className='w-25'>
            <Form.Group className="mb-3" controlId="_name">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="any" id="Name" placeholder="" onChange={(name: { target: { value: React.SetStateAction<string>; }; }) => setName(name.target.value)} value={name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="_age">
              <Form.Label>Età</Form.Label>
              <Form.Control type="number" placeholder="" onChange={(age: { target: { value: React.SetStateAction<string>; }; }) => setAge(age.target.value)} value={age} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="_gender">
              <Form.Label>Sesso</Form.Label>
              <Form.Select aria-label="Default select example" id="Gender" onChange={(gender: { target: { value: React.SetStateAction<string>; }; }) => setGender(gender.target.value)} value={gender} required>
                <option value="Male" selected>Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
            {showBtn &&
              <Button variant="success" type="submit" className='mr-2' onClick={() => add()}>
                Inserisci
              </Button>
            }
            {showBtnMod &&
              <Button variant="success" type="submit" className='mr-2' onClick={() => { { mod() }; reset_user(); show_insert(); show_btn_mod(); }}>
                Modifica
              </Button>
            }
            <Button variant="light" onClick={() => setShowForm(false)}>
              Chiudi
            </Button>
          </Form>
        }

      </center>
    </div>
  );
}
export default App;

