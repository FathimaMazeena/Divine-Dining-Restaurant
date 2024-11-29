import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminNavbar.css';


const AdminNavbar = () => {
    return ( 

        <ul className="sidebar-nav">
            <li className="sidebar-item"><Link className="sidebar-link" to="/products">Products</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/menus">Menus</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/categories">Categories</Link></li>
            {/* <li className="sidebar-item"><Link className="sidebar-link" to="/dishes">Dishes</Link></li> */}
            <li className="sidebar-item"><Link className="sidebar-link" to="/orders">Orders</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/reservations">Reservations</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/payments">Payments</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/offers">Offers</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/messages">Messages</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/gallery">Gallery</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/services">Services</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/locations">Locations</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/users">Users</Link></li>
            <li className="sidebar-item"><Link className="sidebar-link" to="/reports">Reports</Link></li>
        
            
        </ul>
     );
}
 
export default AdminNavbar;