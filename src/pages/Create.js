import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import ApiInterface from '../interface/ApiInterface';
import { GetToken } from '../interface/CookieInterface';
import TimePicker from 'react-time-picker';

function Create(props) {
    const navigate = useNavigate();
    const [name, setName] = useState()
    const [time, setTime] = useState()
    const [repeat, setRepeat] = useState()
    const [image, setImage] = useState()
    const [imageName, setImageName] = useState()
    const token = GetToken();

    async function save() {
        console.log(image)
        const payload = {
            name: name,
            time: time,
            repeat: repeat,
            client: token,
            image: await toBase64(image),
            imageName: imageName
        };
        ApiInterface.post("/meds", payload).then((result) => {
            navigate(process.env.REACT_APP_ROUTING_PREFIX + "/listMeds", { replace: true })
        });
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return (
        <Card className='p-3 new-med-card'>
            <Card.Title className='text-center'>
                Novo Medicamento
            </Card.Title>
            <Card.Body>
                <Form>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control type="file" onChange={(e) => { setImage(e.target.files[0]); setImageName(e.target.value.split('\\').reverse()[0]) }}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nome do remédio</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Horário de tomar o remédio</Form.Label>
                        <TimePicker onChange={setTime} value={time} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Repetir a cada x horas</Form.Label>
                        <Form.Control value={repeat} disableClock={true} onChange={(e) => setRepeat(e.target.value)}></Form.Control>
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