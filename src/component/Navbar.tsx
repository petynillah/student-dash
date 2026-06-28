import logo from '../assets/logo.jpg'

function Navbar(){
    return(
        <>
        <div className='navbar'>
        <img src={logo} alt='logo'></img>
            <div className='list'>
                <ul>
                    <li><a href="http://localhost:5174/studentdash">home</a></li>
                    <li><a href="allbooks">Books</a></li>
                    <li><a href="availablebk"> check if a book exists</a></li>
                    <li><a href="borrowedbk">borrowed books</a></li>
                    <li><a href="allbooks">read status</a></li>
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