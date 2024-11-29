import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, ButtonToolbar} from 'react-bootstrap';
import{useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductList.css';
import EditProductForm from './EditProductForm';

const ProductList = () => {

    const[products, setProducts]= useState([]);

    const fetchProducts= async ()=>{
        const response= await fetch('http://localhost:4000/api/products');
        const json= await response.json();

        if(response.ok){
            console.log(json);
            setProducts(json);
        }

    }


    useEffect(()=>{

        
        fetchProducts();

    }, []);


    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            if (data.success) {
                fetchProducts();
                alert('Product Deleted Successfully');

            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Error Deleting product:', error);
            alert(`Error deleting product: ${error.message}`);
        }
    };

    return ( 
        <div>

  <Table className="m-2 product-table" striped bordered hover size="bg" style={{ width: '100%'}}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Ingredients</th>
                            <th>Category</th>
                            <th>Stock Level</th>
                            <th>Manage Product</th>
                        </tr>
                    </thead>

                    <tbody>
                  
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td><img src={product.image} alt={product.productName} style={{ width: '75px', height: 'auto' }} /><br/>{product.productName}</td>
                                <td>{product.description}</td>
                                <td>Rs.{product.price}</td>
                                <td>
                                    {product.ingredients.map((ingredient) => (
                                        <p key={ingredient}>{ingredient}</p>
                                    ))}
                                </td>

                                <td>{product.categoryId.name}</td>
                                <td>{product.stockLevel}</td>
                                <td><Link className="edit-button btn btn-primary mr-2" to={`/edit-product/${product._id}`}>Edit</Link>
                                <Button onClick={() => handleDelete(product._id)} className="delete-button mr-2" variant="danger">Delete</Button></td>
                        
                              
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="add-button">
                    <p><Link to='/add-product'>ADD</Link></p>
                </div>

        </div>
     );
}
 
export default ProductList;