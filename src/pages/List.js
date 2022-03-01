import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { GetToken, RemoveToken } from '../interface/CookieInterface';
import ApiInterface from '../interface/ApiInterface';


function List(props) {

    const navigate = useNavigate();
    const token = GetToken();
    const [meds, setMeds] = useState([])
    const [show, setShow] = useState(false);
    const [toRemoveId, setToRemoveId] = useState()

    function logout() {
        RemoveToken();
        navigate('/', { replace: true })
    }

    function handleRemove(id) {
        setToRemoveId(id)
        console.log(id)
        setShow(true)
    }


    function remove() {
        ApiInterface.delete("/meds?id=" + toRemoveId).then((result) => {
            setToRemoveId()
            setShow(false)
        });
    }

    useEffect(() => {
        ApiInterface.get("/meds?id=" + token).then((result) => {
            setMeds(result.data)
            console.log(result.data)
        });
    }, [toRemoveId, token])

    return (
        <div className="App">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data Inicio</th>
                        <th>Data Fim</th>
                        <th>Horário</th>
                        <th>Vezes por dia</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        meds.length > 0 && meds.map(item => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{new Date(item.startDate).toLocaleString("pt-BR",{day:"numeric",month:"numeric",year:"numeric"})}</td>
                                    <td>{new Date(item.endDate).toLocaleString("pt-BR",{day:"numeric",month:"numeric",year:"numeric"})}</td>
                                    <td>{item.time}</td>
                                    <td>{item.repeat}</td>
                                    <td><Button onClick={() => handleRemove(item._id)} variant="danger" >Deletar</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

            <Link to={`/createMeds`}>
                <Button type="submit" className='m-1'>Novo</Button>
            </Link>
            <Button variant="danger" className='m-1' onClick={() => logout()}>Sair</Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Remoção de medicamento</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Tem certeza que deseja remover o medicamento?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={() => remove()}>Remover</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}
export default List;
