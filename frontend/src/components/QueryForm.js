import { useState, useContext, useEffect } from "react";
import {AuthContext} from '../contexts/AuthContext';
import { UserContext } from "../contexts/UserContext";

const QueryForm = () => {

    
    const { isLoggedIn} = useContext(AuthContext);
    const {user} = useContext(UserContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [queryText, setQueryText] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {

        
        if (isLoggedIn && user) {

            //setUserId(user.userId);
            setName(user.name); 
            setEmail(user.email);
        }
    }, [isLoggedIn, user]);

    
    const handleSubmit= async (e)=>{
        e.preventDefault()

        if (!isLoggedIn && (!name || !email ||!queryText)) {
            alert('Please fill in all fields correctly.');
            return;
        }

        else if(isLoggedIn && (!queryText)){
            alert('Please type a message.');
            return;
        }
       
        const query={name, email, queryText}


    
        const response= await fetch('/api/queries',{
            method:'POST',
            body: JSON.stringify(query),
            headers:{
                'Content-Type':"application/json"
            }


        })

        const json= await response.json();

        if(!response.ok){
            //setError(json.error)
            //const errorData = await response.json();
            alert(`Error: ${json.message}`);;
        }

        if(response.ok){
            setName('')
            setEmail('')
            setQueryText('')
            setError(null)
            alert('Query Successfully Submited!');
            
        }

    }
    



    return ( 
        <div>
            <h3>GET IN TOUCH</h3>
        <form className="create container col-6 p-3 mt-5 mb-5" onSubmit={handleSubmit} >
           
        {!isLoggedIn && (
            <>
                    <div className="form-group">

                        <input
                        className="form-control m-3"
                        placeholder="Name"
                        type="text"
                        onChange={(e)=>setName(e.target.value)}
                        value={name}
                        />

                    </div>

                    <div className="form-group">

                        <input
                        className="form-control m-3"
                        placeholder="Email"
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        value={email}
                        />
                    </div>
                    </>
        )}
                    <div className="form-group">
                        <textarea
                        className="form-control m-3"
                        placeholder="Message"
                        type="text"
                        onChange={(e)=>setQueryText(e.target.value)}
                        value={queryText}
                        />
                    </div>

                    

  
  
               <button className="btn btn-secondary m-5" type="submit">Submit</button>
               {error && <div className="error">{error}</div>} 


        </form>
        </div>
        
     );

}
 
export default QueryForm;