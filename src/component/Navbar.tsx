import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { APP_URLS } from '../Appurl'


function Navbar(){
    return(
        <>
        <div className='navbar'>
        <img src={logo} alt='logo'></img>
            <div className='list'>
                <ul>
                    <li><a href={`${APP_URLS.login}/login/studentdash`}>home</a></li>
                    <li><Link to="allbooks">Books</Link></li>
                    <li><Link to="availablebk"> check if a book exists</Link></li>
                    <li><Link to='borrowedbk'>borrowed books</Link></li>
                    <li><Link to="allbooks">read status</Link></li>
                    <li><Link to="">payment status</Link></li>
                    
                </ul>
            </div>
            <div className='set'>
                <a href="" >Settings</a>
            </div>
        </div>
        </>
    )
}
export default Navbar