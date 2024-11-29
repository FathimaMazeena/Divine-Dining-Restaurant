import fileupload_icon from "../../assets/file_upload_icon.jpeg";
import './AddProductForm.css';
import { useState } from "react";

const AddProductForm = () => {

    const [image, setImage]= useState(false);
    const [productDetails, setProductDetails] = useState({
        productName:"",
        image: "",
        description:"",
        price:"",
        ingredients: "",
        currentIngredient: "",
        categoryName: "Beverages",
        stockLevel: ""
    });

    const addIngredient = () => {
        // if (productDetails.currentIngredient.trim()) {
        //   setProductDetails.ingredients([...productDetails.ingredients, productDetails.currentIngredient.trim()]);
        //   setProductDetails.currentIngredient(''); 
        //   console.log("ingredients", productDetails.ingredients)
        // }
        if (productDetails.currentIngredient.trim()) {
            
            setProductDetails(prevDetails => ({
                ...prevDetails,
                ingredients: [...prevDetails.ingredients, productDetails.currentIngredient.trim()],
                currentIngredient: '' 
            }));
            console.log("ingredients", productDetails.ingredients);
        }
    };

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);

    };

    const changeHandler=(e)=>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    };

    const clearForm = () => {
        setProductDetails({
            productName: '',
            description: '',
            price: '',
            ingredients: '',
            stockLevel: '',
            image: null,
        });
    };
    

    // const addProduct = async()=>{
    //     console.log(productDetails);
    //     let responseData;
    //     let product = {
    //         ...productDetails,
    //         price: parseFloat(productDetails.price),
    //         stockLevel: parseInt(productDetails.stockLevel),
    
    //     };
        
    //     let formData = new FormData();
    //     formData.append('product',image);

    //     await fetch('http://localhost:4000/upload',{
    //         method: 'POST',
    //         headers:{
    //             Accept:'application/json',

    //         },
    //         body: formData,

    //     }).then((res) => res.json()).then((data) =>{responseData=data})

    //     if(responseData.success){
    //         product.image = responseData.image_url;
    //         console.log(product);
    //         await fetch ('http://localhost:4000/api/products',{
    //             method:'POST',
    //             headers:{
    //                 Accept:'application/json',
    //                 'Content-Type':'application/json',
    //             },
    //             body:JSON.stringify(product),

    //         }).then((res)=>res.json()).then((data)=>{
    //             data.success?alert("Product Added"):alert("Adding Product failed")
    //         })

    //     }
    // }

    const addProduct = async () => {
        console.log(productDetails);
        let responseData;
        let product = {
            ...productDetails,
            price: parseFloat(productDetails.price),
            stockLevel: parseInt(productDetails.stockLevel),
        };
    
        try {
            let formData = new FormData();
            formData.append('product', image); // Assuming 'image' contains the image file from your input field
    
            // Upload the image
            const imageResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });
    
            // Check if the response is actually JSON
            const imageResponseText = await imageResponse.text();
            try {
                const imageData = JSON.parse(imageResponseText); // Try to parse as JSON
                if (!imageResponse.ok) {
                    throw new Error(`Image upload failed: ${imageData.message || imageData.error}`);
                }
    
                // Add the image URL to the product object
                product.image = imageData.image_url;
            } catch (error) {
                throw new Error(`Image upload response is not valid JSON: ${imageResponseText}`);
            }
    
            // Add the product
            const productResponse = await fetch('http://localhost:4000/api/products', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
    
            // Check if the response is actually JSON
            const productResponseText = await productResponse.text();
            try {
                const productData = JSON.parse(productResponseText); // Try to parse as JSON
                if (!productResponse.ok) {
                    throw new Error(`Product addition failed: ${productData.message || productData.error}`);
                }
    
                alert('Product Added Successfully');
                clearForm();
            } catch (error) {
                throw new Error(`Product response is not valid JSON: ${productResponseText}`);
            }
    
        } catch (error) {
            console.error('Error:', error.message); // Log the error message to the console
            alert('Adding Product failed: ' + error.message); // Display the error message to the user
        }
    };
    

    return ( 
        <div className='add-product'>
            <div className="add-product-itemfield">
                <p>Product Name</p>
                <input value={productDetails.productName} onChange={changeHandler} type='text' name='productName'/>
            </div>
            <div className="add-product-itemfield">
                <p>Description</p>
                <input value={productDetails.description} onChange={changeHandler} type='text' name='description'/>
            </div>
            <div className="add-product-itemfield">
                <p>Price</p>
                <input value={productDetails.price} onChange={changeHandler} type='text' name='price'/>
            </div>
            <div className="add-product-itemfield">
                <p>Ingredients</p>
                <input value={productDetails.currentIngredient} onChange={changeHandler} type='text' name='currentIngredient'/>
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
                <input value={productDetails.stock} onChange={changeHandler} type='text' name='stockLevel'/>
            </div>
            <div className="add-product-itemfield">
                <label htmlFor="file-input"><img src={image?URL.createObjectURL(image):fileupload_icon} className="file-upload-image"/></label>
                <input onChange={imageHandler} type="file" name="product" id="file-input" hidden/>
                
            </div>

            <button onClick={()=>{addProduct()}}className="add-product-button">Add Product</button>

        </div>
        
     );
}
 
export default AddProductForm;