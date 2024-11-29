import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, ButtonToolbar} from 'react-bootstrap';
import{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Product/ProductList.css';


const MenuList = () => {

    const[menus, setMenus]= useState([]);

    const fetchMenus= async ()=>{
        const response= await fetch('http://localhost:4000/api/menus');
        const json= await response.json();

        if(response.ok){
            console.log(json);
            setMenus(json);
        }

    }


    useEffect(()=>{

        
        fetchMenus();

    }, []);


    // const handleDelete = async (productId) => {
    //     try {
    //         const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
    //             method: 'DELETE',
    //         });

    //         const data = await response.json();
    //         if (data.success) {
    //             fetchProducts();
    //             alert('Product deleted successfully');

    //         } else {
    //             alert('Failed to delete product');
    //         }
    //     } catch (error) {
    //         console.error('Error deleting product:', error);
    //         alert(`Error deleting product: ${error.message}`);
    //     }
    // };

    return ( 
        <div>

  <Table className="m-2 product-table" striped bordered hover size="bg" style={{ width: '100%'}}>
                    <thead>
                        <tr>
                            <th>Menu</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Portion</th>
                            <th>Active Status</th>
                            <th>Todays Special</th>
                        </tr>
                    </thead>

                    <tbody>
                  
                        {menus.map((menu) => (
                            <tr key={menu._id}>
                                <td><img src={menu.image} alt={menu.menuName} style={{ width: '75px', height: 'auto' }} /><br/>{menu.menuName}</td>
                                <td>{menu.description}</td>
                                <td>Rs.{menu.price}</td>
                                <td>{menu.portion}</td>
                                <td>{menu.isActive}</td>
                                <td>{menu.isTodaysMenu}</td>
                                <td><Link className="btn btn-primary mr-2">Edit</Link>
                                <Button className="mr-2" variant="danger">Delete</Button></td>
                        
                              
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="add-button">
                    <p><Link to='/add-menu'>ADD</Link></p>
                </div>

        </div>
     );
}
 
export default MenuList;