import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Table, Badge, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const UserList = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:4000/api/users');
        const json = await response.json();

        if (response.ok) {
            console.log(json);
            setUsers(json);
        }
    };


    useEffect(() => {
        
        fetchUsers();
    }, []);


    const customers = users.filter(user => user.usertype === 'customer');
    const staff = users.filter(user => user.usertype === 'staff');

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (data.success) {
                await fetchUsers();
                alert('User Deleted Successfully');

            } else {
                alert('Failed to delete user');
            }
        } catch (error) {
            console.error('Error Deleting user:', error);
            alert(`Error deleting user: ${error.message}`);
        }
    };

    return ( 
        <div>

            <Tabs defaultActiveKey="users" id="admin-tabs">
                <Tab eventKey="users" title="Customers">

                <Table className="m-2 product-table" striped bordered hover size="bg" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>User Role</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Conatct</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((user)=>(
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.usertype}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                    

                </tbody>
            </Table>

                </Tab>

                <Tab eventKey="staff" title="Staff">
                <Table className="m-2 product-table" striped bordered hover size="bg" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>User Role</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Conatct</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {staff.map((user)=>(
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.usertype}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phone}</td>
                            <td><Button onClick={() => handleDelete(user._id)} variant="danger">DELETE</Button></td>
                        </tr>
                    ))}
                    

                </tbody>
            </Table>
                </Tab>
            </Tabs>
            

            <div className="add-button">
                    <p><Link to='/add-staff'>ADD</Link></p>
            </div>
        </div>
     );
}
 
export default UserList;