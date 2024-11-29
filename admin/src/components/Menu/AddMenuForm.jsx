import fileupload_icon from "../../assets/file_upload_icon.jpeg";
import '../Product/AddProductForm.css';
import { useState } from "react";

const AddMenuForm = () => {

    const [image, setImage]= useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isTodaysMenu, setIsTodaysMenu] = useState(false);
    const [portion, setPortion] = useState('');
    const [showPortion, setShowPortion] = useState(false);

    const handleActiveCheckboxChange = (event) => {
        setIsActive(event.target.checked);
    };

    const handleTodaysMenuCheckboxChange = (event) => {
        setIsTodaysMenu(event.target.checked);
    };

    const handlePortionChange = (event) => {
        setPortion(event.target.value);
      };
    
      const handlePortionToggle = (event) => {
        setShowPortion(event.target.checked);
      };

    const [menuDetails, setMenuDetails] = useState({
        menuName: "",
        image: "",
        description: "",
        price: "",
        portion: "",
        isActive: false,
        isTodaysMenu: false
    });

    

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);

    };

    const changeHandler=(e)=>{
        setMenuDetails({...menuDetails, [e.target.name]:e.target.value})
    };

    const clearForm = () => {
        setMenuDetails({
        menuName: "",
        image: null,
        description: "",
        price: "",
        portion: "",
        isActive: null,
        isTodaysMenu: null
        });
    };
    

    const addMenu = async () => {
        console.log(menuDetails);
        let responseData;
        let menu = {
            ...menuDetails,
            price: parseFloat(menuDetails.price),
            isActive,
            isTodaysMenu,
            ...(showPortion ? { portion } : {})
        };
    
        try {
            let formData = new FormData();
            formData.append('menu', image); // Assuming 'image' contains the image file from your input field
    
            // Upload the image
            const imageResponse = await fetch('http://localhost:4000/upload-menu', {
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
                menu.image = imageData.image_url;
            } catch (error) {
                throw new Error(`Image upload response is not valid JSON: ${imageResponseText}`);
            }
    
            // Add the product
            const menuResponse = await fetch('http://localhost:4000/api/menus', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menu),
            });
    
            // Check if the response is actually JSON
            const menuResponseText = await menuResponse.text();
            try {
                const menuData = JSON.parse(menuResponseText); // Try to parse as JSON
                if (!menuResponse.ok) {
                    throw new Error(`Menu addition failed: ${menuData.message || menuData.error}`);
                }
    
                alert('Menu Added Successfully');
                clearForm();
            } catch (error) {
                throw new Error(`Menu response is not valid JSON: ${menuResponseText}`);
            }
    
        } catch (error) {
            console.error('Error:', error.message); // Log the error message to the console
            alert('Adding Menu failed: ' + error.message); // Display the error message to the user
        }
    };
    

    return ( 
        <div className='add-product'>
            <div className="add-product-itemfield">
                <p>Menu Name</p>
                <input value={menuDetails.menuName} onChange={changeHandler} type='text' name='menuName'/>
            </div>
            <div className="add-product-itemfield">
                <p>Description</p>
                <input value={menuDetails.description} onChange={changeHandler} type='text' name='description'/>
            </div>
            <div className="add-product-itemfield">
                <p>Price</p>
                <input value={menuDetails.price} onChange={changeHandler} type='text' name='price'/>
            </div>

            <label>
        Active:
        <input
          type="checkbox"
          checked={isActive}
          onChange={handleActiveCheckboxChange}
        />
      </label>

      <label>
        Todays Menu:
        <input
          type="checkbox"
          checked={isTodaysMenu}
          onChange={handleTodaysMenuCheckboxChange}
        />
      </label>

      <label>
        Show Portion:
        <input
          type="checkbox"
          checked={showPortion}
          onChange={handlePortionToggle}
        />
      </label>

      {showPortion && (
        <label>
          Portion:
          <select value={portion} onChange={handlePortionChange}>
            <option value="">Select Portion</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      )}


           
           
            <div className="add-product-itemfield">
                <label htmlFor="file-input"><img src={image?URL.createObjectURL(image):fileupload_icon} className="file-upload-image"/></label>
                <input onChange={imageHandler} type="file" name="menu" id="file-input" hidden/>
                
            </div>

            <button onClick={()=>{addMenu()}}className="add-product-button">Add Menu</button>

        </div>
        
     );
}
 
export default AddMenuForm;