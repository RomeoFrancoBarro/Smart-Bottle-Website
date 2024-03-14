import React, { useState, useEffect } from 'react';
import StartFirebase from '../firebase';
import { ref, set, get, update, remove } from "firebase/database";

const ReactCRUD = () => {
    const [db, setDb] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [section, setSection] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [negativeKey, setNegativekey] = useState('');

    useEffect(() => {
        setDb(StartFirebase());
    }, []);

    const getAllInputs = () => {
        return {
        name: name,
        email: email,
        section: section,
        date: date,
        time: time,
        negativeKey: Number(negativeKey)
        }
    }

    const insertData = () => {
        const data = getAllInputs();

        set(ref(db, 'Users/' + data.negativeKey), {
        name: data.name,
        email: data.email,
        section: data.section,
        date: data.date,
        time: data.time
        })
        .then(() => { alert('Data was added successfully') })
        .catch((error) => { alert('There was an error, details: ' + error) });
    }

    const updateData = () => {
        const data = getAllInputs();

        update(ref(db, 'Users/' + data.negativeKey), {
        name: data.name,
        email: data.email,
        section: data.section,
        date: data.date,
        time: data.time
        })
        .then(() => { alert('Data was updated successfully') })
        .catch((error) => { alert('There was an error, details: ' + error) });
    }

    const deleteData = () => {
        const data = getAllInputs();

        remove(ref(db, 'Users/' + data.negativeKey))
        .then(() => { alert('Data was deleted successfully') })
        .catch((error) => { alert('There was an error, details: ' + error) });
    }

    const selectData = () => {
        const data = getAllInputs();

        get(ref(db, 'Users/' + data.negativeKey))
        .then((snapshot) => {
            if (snapshot.exists()) {
            const userData = snapshot.val();
            alert(`Data: ${JSON.stringify(userData)}`);
            } else {
            alert('Data not found');
            }
        })
        .catch((error) => { alert('There was an error, details: ' + error) });
    }

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  }

  return (
    <>
      <label>Enter Name</label>
      <input type='text' id="userbox" value={name}
        onChange={handleInputChange(setName)} />
      <br /><br />

      <label>Enter Email</label>
      <input type='text' id="namebox" value={email}
        onChange={handleInputChange(setEmail)} />
      <br /><br />

      <label>Enter Section</label>
      <input type='text' id="phonebox" value={section}
        onChange={handleInputChange(setSection)} />
      <br /><br />

      <label>Choose Date</label>
      <input type='date' id="datebox" value={date}
        onChange={handleInputChange(setDate)} />
      <br /><br />

      <label>Choose Time</label>
      <input type='time' id="datebox" value={time}
        onChange={handleInputChange(setTime)} />
      <br /><br />

      <label>Choose Keye</label>
      <input type='number' id="datebox" value={negativeKey}
        onChange={handleInputChange(setNegativekey)} />
      <br /><br />

      <button id="addBtn" onClick={insertData}>Add Data</button>
      <button id="updateBtn" onClick={updateData}>Update Data</button>
      <button id="deleteBtn" onClick={deleteData}>Delete Data</button>
      <button id="selectBtn" onClick={selectData}>Get Data from DB</button>
    </>
  );
}

export default ReactCRUD;
