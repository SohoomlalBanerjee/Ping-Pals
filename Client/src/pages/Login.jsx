import React, { useContext } from 'react'
import './Login.css'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row,Col} from 'react-bootstrap';
import { AppContext } from '../context/appContext.js';
import photo from '../assets/login2.png'
import { useState } from 'react';
import {useLoginUserMutation} from '../services/AppApi.js'
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {socket}=useContext(AppContext)

    const navigate = useNavigate();

    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    function handleLogin(e) {
        e.preventDefault();
        loginUser({ email, password }).then(({ data }) => {
            if (data) {
                socket.emit("new-user");
                navigate("/chat");
            }
        });
    }

    return (
            <Container>
                <Row >
                    <Col md={7} className="login__bg ml-auto" >
                    </Col >
                    <Col md={5} className="d-flex align-items-center justify-content-center">
                        <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                            <div>
                                <p>
                                    Don't have an account ?<Link to='/signup'>Sign-up</Link> 
                                </p>
                            </div>
                        </Form>


                    </Col>
                </Row>
            </Container>
    )
}
