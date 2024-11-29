import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useState, useEffect } from 'react';
//import {AuthContext} from '../../contexts/AdminAuthContext';
import { Navigate } from 'react-router-dom'; 
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../Product/ProductList.css';


const ReservationList = () => {

    //const { isLoggedIn } = useContext(AuthContext);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/reservations', {
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
                setReservations(data);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    // if (!isLoggedIn) {
       
    //     return <Navigate to="/login" replace />;
    // }
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    

    return ( 
        <div>

  <Table className="m-2 product-table" striped bordered hover size="bg" style={{ width: '100%'}}>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Table for</th>
                            <th>Action</th>

                        </tr>
                    </thead>

                    <tbody>
                  
                        {reservations.map((reservation) => (
                            <tr key={reservation._id}>


                                <td>{reservation.name}</td>
                                <td>{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                                <td>{`${reservation.time.hour}:${reservation.time.minute}`}</td>
                                <td>{reservation.numberOfPeople}</td>
                        
                                {/* <td><Button onClick={() => handleDelete(product._id)} className="delete-button mr-2" variant="danger">Cancel</Button></td> */}
                        
                              
                            </tr>
                        ))}
                    </tbody>
                </Table>


        </div>
     );
}
 
export default ReservationList;