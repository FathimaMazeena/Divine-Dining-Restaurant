import { Link } from 'react-router-dom';
import "./ProfileNavbar.css"

const ProfileNavbar = () => {

    return ( 

<ul className="sidebar-nav">
    <li className="sidebar-item"><Link className="sidebar-link" to="/profile/activity">Activity</Link></li>
    <li className="sidebar-item"><Link className="sidebar-link" to="/profile/my-orders">Orders</Link></li>
    <li className="sidebar-item"><Link className="sidebar-link" to="/profile/my-reservations">Reservations</Link></li>
    <li className="sidebar-item"><Link className="sidebar-link" to="/profile/messages">Messages</Link></li>
    <li className="sidebar-item"><Link className="sidebar-link" to="/profile/payments">Payments</Link></li>
</ul>
     );
}
 
export default ProfileNavbar;