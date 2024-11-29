import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fileupload_icon from "../../assets/file_upload_icon.jpeg";
import './AddProductForm.css';

const EditProductForm = () => {
    const { id } = useParams(); // Get the product ID from the URL

    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        productName: "",
        image: "",
        description: "",
        price: "",
        ingredients: [],
        currentIngredient: "",
        categoryName: "Beverages",
        stockLevel: ""
    });

    // Fetch the existing product data when the component loads
    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await fetch(`http://localhost:4000/api/products/${id}`);
            const productData = await response.json();

            if (response.ok) {
                setProductDetails({
                    productName: productData.productName,
                    image: productData.image,
                    description: productData.description,
                    price: productData.price,
                    ingredients: productData.ingredients,
                    //ingredients: productData.ingredients.join(", ") || "",
                    categoryName: productData.categoryName,
                    stockLevel: productData.stockLevel
                });
            } else {
                alert("Failed to load product details");
            }
        };

        fetchProductDetails();
    }, [id]);

    const addIngredient = () => {
        if (productDetails.currentIngredient.trim()) {
            setProductDetails(prevDetails => ({
                ...prevDetails,
                ingredients: [...prevDetails.ingredients, productDetails.currentIngredient.trim()],
                currentIngredient: ''
            }));
        }
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]); // Set the selected image
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const updateProduct = async () => {
        let product = {
            ...productDetails,
            price: parseFloat(productDetails.price),
            stockLevel: parseInt(productDetails.stockLevel)
        };

        try {
            let responseData;

            // If an image is selected, upload it
            if (image) {
                let formData = new FormData();
                formData.append('product', image); // Upload new image

                const imageResponse = await fetch('http://localhost:4000/upload', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                    },
                    body: formData,
                });

                const imageResponseText = await imageResponse.text();
                const imageData = JSON.parse(imageResponseText);

                if (!imageResponse.ok) {
                    throw new Error(`Image upload failed: ${imageData.message || imageData.error}`);
                }

                product.image = imageData.image_url; // Set the new image URL
            }

            // Update the product details
            const productResponse = await fetch(`http://localhost:4000/api/products/${id}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            const productResponseText = await productResponse.text();
            const productData = JSON.parse(productResponseText);

            if (!productResponse.ok) {
                throw new Error(`Product update failed: ${productData.message || productData.error}`);
            }

            alert('Product Updated Successfully');

        } catch (error) {
            console.error('Error:', error.message);
            alert('Updating Product failed: ' + error.message);
        }
    };

    return (
        <div className='add-product'>
            <div className="add-product-itemfield">
                <p>Product Name</p>
                <input value={productDetails.productName} onChange={changeHandler} type='text' name='productName' />
            </div>
            <div className="add-product-itemfield">
                <p>Description</p>
                <input value={productDetails.description} onChange={changeHandler} type='text' name='description' />
            </div>
            <div className="add-product-itemfield">
                <p>Price</p>
                <input value={productDetails.price} onChange={changeHandler} type='text' name='price' />
            </div>
            <div className="add-product-itemfield">
                <p>Ingredients</p>
                <input value={productDetails.currentIngredient} onChange={changeHandler} type='text' name='currentIngredient' />
                <button type="button" onClick={addIngredient}>
                    Add Ingredient
                </button>
            </div>
            <div className="add-product-itemfield">
                <p>Category</p>
                <select value={productDetails.categoryName} onChange={changeHandler} type='text' name='categoryName'>
                    <option value='Beverages'>Beverages</option>
                    <option value='Brunch'>Brunch</option>
                    <option value='main_course'>Main Course</option>
                    <option value='breakfast'>Breakfast</option>
                    <option value='apetizers'>Apetizers</option>
                    <option value='deserts'>Deserts</option>
                </select>
            </div>
            <div className="add-product-itemfield">
                <p>Stock Level</p>
                <input value={productDetails.stockLevel} onChange={changeHandler} type='text' name='stockLevel' />
            </div>
            <div className="add-product-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : productDetails.image || fileupload_icon} className="file-upload-image" />
                </label>
                <input onChange={imageHandler} type="file" name="product" id="file-input" hidden />
            </div>

            <button onClick={updateProduct} className="update-product-button">Update Product</button>
        </div>
    );
};

export default EditProductForm;
