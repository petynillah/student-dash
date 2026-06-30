import logo from '../assets/logo.jpg'

function Navbar(){
    return(
        <>
        <div className='navbar'>
        <img src={logo} alt='logo'></img>
            <div className='list'>
                <ul>
                    <li><a href='https://library-login.vercel.app/studentdash'>home</a></li>
                    <li><a href="https://student-dash-zeta.vercel.app/allbooks">Books</a></li>
                    <li><a href="https://student-dash-zeta.vercel.app/availablebk"> check if a book exists</a></li>
                    <li><a href="https://student-dash-zeta.vercel.app/borrowedbk">borrowed books</a></li>
                    <li><a href="https://student-dash-zeta.vercel.app/allbooks">read status</a></li>
                    <li><a href="">payment status</a></li>
                    
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