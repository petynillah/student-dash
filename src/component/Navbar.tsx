import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { APP_URLS } from '../Appurl'

function Navbar(): React.JSX.Element {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = `${APP_URLS.login}/login/studentlogin`;
  };

  return (
    <>
      <div className='navbar'>
        <img src={logo} alt='logo' />
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
          <Link to="/settings" style={{ marginRight: '15px' }}>Settings</Link>
          <button
            onClick={handleLogout}
            style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
export default Navbar