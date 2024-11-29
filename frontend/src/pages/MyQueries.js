import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom'; 


const MyQueries = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [queries, setQueries] = useState([]);
    //const [replyText, setReplyText] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await fetch('/api/messages', {
                    method: 'GET',
                    credentials: 'include', // Include cookies
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch queries');
                }
                //console.log('Fetching queries...');
                const data = await response.json();
                //console.log('Fetched data:', data);
                setQueries(data.queries);
                //setReplyText(data.replyText);

            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQueries(); 
    }, []); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    if (!isLoggedIn) {
       
        return <Navigate to="/login" replace />;
    }

    return ( 
        <>
        <h2>Queries</h2>
        {queries.map((query) => (
            <div className="query-box" key={query._id} style={{ display: "block", width: "100%", marginBottom: "20px" }}>
                <p>You posted a query on <b>{new Date(query.createdAt).toLocaleDateString()}</b></p>
                <h6>{query.queryText}</h6>
                <p>{query.responseText ? query.responseText : "No reply yet"}</p>
                <hr/>
            </div>
        ))}
        
        </>
        
     );
}
 
export default MyQueries;