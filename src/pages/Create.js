import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import ApiInterface from '../interface/ApiInterface';
import { GetToken } from '../interface/CookieInterface';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import pt from 'date-fns/locale/pt';

function Create(props) {
    registerLocale('pt', pt)
    const navigate = useNavigate();
    const today = new Date();
    const [name, setName] = useState()
    const [startDate, setStartDate] = useState(today)
    const [endDate, setEndDate] = useState()
    const [time, setTime] = useState()
    const [repeat, setRepeat] = useState()
    const token = GetToken();

    function save() {
        const payload = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            time: time,
            repeat: repeat,
            client: token
        };
        ApiInterface.post("/meds", payload).then((result) => {
            navigate(process.env.REACT_APP_ROUTING_PREFIX + "/listMeds" , { replace: true })
        });
    }

    return (
        <Card className='p-3 new-med-card'>
            <Card.Title className='text-center'>
                Novo Medicamento
            </Card.Title>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data Inicial</Form.Label>
                        <DatePicker
                            onChange={(e) => setStartDate(e)}
                            minDate={today}
                            locale="pt"
                            selected={startDate}
                            dateFormat="dd/MM/yyyy"
                            customInput={
                                <Form.Control value={startDate}></Form.Control>
                            }>
                        </DatePicker>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data Final</Form.Label>
                        <DatePicker
                            onChange={(e) => setEndDate(e)}
                            minDate={startDate}
                            locale="pt"
                            selected={endDate}
                            dateFormat="dd/MM/yyyy"
                            customInput={
                                <Form.Control value={endDate}></Form.Control>
                            }>
                        </DatePicker>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Horário</Form.Label>
                        <Form.Control value={time} onChange={(e) => setTime(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Repetir</Form.Label>
                        <Form.Control value={repeat} onChange={(e) => setRepeat(e.target.value)}></Form.Control>
                    </Form.Group>
                </Form>
            </Card.Body>
            <Card.Footer className='text-center'>
                
            <Button className='m-1 mt-3' onClick={() => save()}>Salvar</Button>
                    <Link to={process.env.REACT_APP_ROUTING_PREFIX + "/listMeds"} >
                        <Button variant="danger" className='m-1 mt-3'>Cancelar</Button>
                    </Link>
            </Card.Footer>
        </Card>
    )

}
export default Create;




// <th>Nome</th>
// <th>Data Inicio</th>
// <th>Data Fim</th>
// <th>Horário</th>
// <th>Vezes por dia</th>