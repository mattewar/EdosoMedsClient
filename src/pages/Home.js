import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {SetToken} from '../interface/CookieInterface';


function Home(props) {
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    function submit() {
        SetToken(token);
        navigate(process.env.REACT_APP_ROUTING_PREFIX + "/listMeds" , {replace: true})
    }
    return (
        <Card className='p-3'>
            <Card.Title>
                Bem vindo
            </Card.Title>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Insira o identificador do aplicativo do idoso</Form.Label>
                        <Form.Control value={token} onChange={(event) => setToken(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Button className='mt-2' onClick={() => submit()}>Enviar</Button>
                </Form>
            </Card.Body>
        </Card>
    )

}
export default Home;
