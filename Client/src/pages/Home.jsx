import React from 'react'
import {Row,Col,Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './Home.css'

export default function Home() {
  return (
    <Row>
        <Col md={6} className='d-flex flex-direction-column align-items-center'>
            <div className='left'>
                <h1 style={{padding:"3px"}}>
                Spark Conversations, Share Moments: Your Chat Haven Awaits!
                </h1>
                <p>
                Welcome to Ping-Pals, the ultimate chat experience designed for seamless communication. Connect with friends, share laughter, and stay connected in real-time. Our app offers a user-friendly interface, powerful features, and a vibrant community where conversations never stop. Join us and elevate your chatting experience today!
                </p>
                <LinkContainer to='/chat'>
                    <Button > Get Started <i className='fas fa-comments home-message-icon'></i></Button>
                    
                </LinkContainer>
            </div>
        </Col>
        <Col md={6} className='home__bg'>
            <div>
                <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZyaWVuZHMlMjBwbGF5aW5nfGVufDB8fDB8fHww" alt="" />
            </div>
            
        </Col>
    </Row>
  )
}
