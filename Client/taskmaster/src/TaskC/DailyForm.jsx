import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useCalendarContext } from '../CalendarContext'
import axios from 'axios';

const DailyForm = ({ list, setList, extendedList, setExtendedList }) => {
    const { coordinates, setCoordinates } = useCalendarContext();
    const [nameValue, setNameValue] = useState('');
    const handleNameChange = (event) => {
        setNameValue(event.target.value);
    };

    const handleAddButtonClick = async () => {
        if (!list.includes(nameValue)) {
            try {
                const response = await axios.post(`/content/daily/add/${localStorage.getItem('userId')}`, {
                    name: nameValue
                })
                const data = response.data.tasks
                setExtendedList(data)
                const newarr = data.map(item => {
                    return item.name
                })
                setList(newarr)
                setNameValue('');

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

    };
    const handleDeleteButtonClick = async () => {

        if (list.includes(nameValue)) {
            try {
                console.log(nameValue)
                const response = await axios.delete(`/content/daily/remove/${localStorage.getItem('userId')}`, {
                    data: { name: nameValue }
                });
                const data = response.data.tasks
                const newarr = data.map(item => {
                    return item.name
                })
                const filteredArray = extendedList.filter(item => item.name !== nameValue);

                setList(newarr)
                setExtendedList(filteredArray)

                setNameValue('');

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }


    };

    return (
        <Form className='ModelForm'>


            <Form.Group controlId="Input2">
                <Form.Label>Describe your task</Form.Label>
                <Form.Control type="text" value={nameValue} onChange={handleNameChange} />
            </Form.Group>
            <div className="buttons">
                <Button variant="primary" onClick={handleAddButtonClick}>
                    Add
                </Button>
                <Button variant="primary" onClick={handleDeleteButtonClick}>
                    Delete
                </Button>
            </div>

        </Form>
    );
};

export default DailyForm;