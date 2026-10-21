import {Link,NavLink,Outlet,useNavigate} from 'react-router-dom';
import {CarFront,Plus,LogOut,UserRound,Menu} from 'lucide-react';
import {useAuth} from '../context/AuthContext';
import {useState} from 'react';
export default function Layout(){const {user,signOut}=useAuth(),navigate=useNavigate(),[open,setOpen]=useState(false);
 async function logout(){try{await signOut();navigate('/')}catch(e){alert(e.message)}}
 return <><header className="site-header"><div className="container nav"><Link className="logo" to="/"><span className="logo-icon"><CarFront size={23}/></span>Bat<span>Car</span></Link><button className="menu-toggle" aria-label="Toggle menu" onClick={()=>setOpen(!open)}><Menu/></button><nav className={open?'nav-links open':'nav-links'} onClick={()=>setOpen(false)}><NavLink to="/cars">Explore cars</NavLink>{user?<><NavLink to="/my-listings">My listings</NavLink><NavLink to="/cars/new" className="nav-add"><Plus size={16}/> Sell a car</NavLink><button onClick={logout} className="nav-logout"><LogOut size={16}/> Log out</button></>:<><NavLink to="/login">Log in</NavLink><NavLink to="/register" className="nav-add"><UserRound size={16}/> Sign up</NavLink></>}</nav></div></header><main><Outlet/></main><footer><div className="container footer-inner"><div><strong>CarVista</strong><p>Find the drive that moves you.</p></div><span>© {new Date().getFullYear()} CarVista · React exam project</span></div></footer></>;
}
