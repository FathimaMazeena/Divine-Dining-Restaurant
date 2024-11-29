import React, { useContext, useState, useEffect } from 'react';
import {AuthContext} from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom'; 
import { Table, Button } from 'react-bootstrap';


const MyReservations = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch('/api/my-reservations', {
                    method: 'GET',
                    credentials: 'include', // Include cookies
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reservations');
                }

                const data = await response.json();
                //setOrders(data);
                setReservations(data.reservations);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (!isLoggedIn) {
       
        return <Navigate to="/login" replace />;
    }
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return ( 
        <div>
            <h2>Reservations</h2>
        <Table className="m-2 orders" striped bordered hover size="bg" style={{ width: '100%'}}>
                <thead>
                    <tr>
                        <th>Reservation Date</th>
                        <th>Time</th>
                        <th>No of People</th>
                    </tr>
                </thead>

                <tbody className="orders">
                    {reservations.map((reservation) => (
                        <tr key={reservation._id}>
                            <td><p>{new Date(reservation.reservationDate).toLocaleDateString()}</p></td>
                            <td><p>{`${reservation.time.hour}:${reservation.time.minute}`}</p></td>
                            <td><p>{reservation.numberOfPeople}</p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        
     );
}
 
export default MyReservations;