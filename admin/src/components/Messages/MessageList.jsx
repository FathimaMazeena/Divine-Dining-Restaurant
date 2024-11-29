import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap'; // Import Card from react-bootstrap

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/queries');
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const json = await response.json();
            setMessages(json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div>
            <Row>
            {messages.map((message) => (
                <Col key={message._id} md={4} className="mb-4 mt-4">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{message.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{message.email}</Card.Subtitle>
                        <Card.Text>{message.queryText}</Card.Text>
                        <a href="#" className="card-link">Reply</a>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
            
        </div>
    );
};

export default MessageList;
