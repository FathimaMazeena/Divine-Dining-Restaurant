import React, {createContext, useState, useEffect} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children})=>{

    const [user, setUser]= useState(null);

    useEffect(()=>{

        const fetchUserDetails = async()=>{

            try{
                
                const response = await fetch ("api/user",{

                    method: "GET",
                    credentials: "include",
                    headers:{
                        "Content-Type":"application/json",
                    }

                
                });

                if(!response.ok){
                    throw new Error("Failed to fetch user details");
                }

                const data= await response.json();
                setUser(data);

            } catch(error){
                console.error('Error fetching user details', error);
            }

        };

        fetchUserDetails();

    }, []);

    return(
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    );


};