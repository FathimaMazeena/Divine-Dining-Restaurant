import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {AdminAuthContext} from '../../contexts/AdminAuthContext';
import { UserContext } from '../../contexts/UserContext';


const Header = () => {

    const { isLoggedIn, logout } = useContext(AdminAuthContext);
    const { user } = useContext(UserContext);

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <a href="/" className="navbar-brand">
                    <img src="/images/restaurant.png" width="30" height="30" className="d-inline-block align-top" alt=""/>
                    DIVINE DINING ADMIN DASHBOARD</a>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navitems"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse justify-content-center" id="navitems">
                {isLoggedIn && (
                    <>

                   <ul className="navbar-nav"> 
                       <li className="nav-item"><Link className="nav-link" to="/my-profile">Profile</Link></li>
                       <li className="nav-item"><Link className="nav-link" onClick={logout}>Logout</Link></li>
                  </ul>
                  <p>Welcome {user?.name || "User"}!</p>
                    
                    </>
                        
                )}
                </div>
            
      </nav>
     );
}
 
export default Header;