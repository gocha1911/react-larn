import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'

function Navbar() {
    const [user] = useAuthState(auth)

    const signUserOut = async () => {
        await signOut(auth)
    }

    return (
        <header className='header'>
            <nav className="menu">
                <ul className="menu__list">
                    <li className="menu__item">
                        <Link className='menu__link' to={'/'}>HOME</Link>
                    </li>
                    <li className="menu__item">
                        {!user ? (<Link className='menu__link' to={'/login'}>LOGIN</Link>) : (<Link className='menu__link post' to={'/createPost'}>CREATE POST</Link>)}
                    </li>
                </ul>
            </nav>
            {user && (
                <div className="header__profile">
                    <div className='header__profile_user'>
                        <img src={user?.photoURL || "https://tse3.mm.bing.net/th?id=OIP.-gymMKaj3o4z4DoAnkBqzQHaHa&pid=Api&P=0&h=220"} />
                        <h1>{user?.displayName}</h1>
                    </div>
                    <div className="logOut">
                        <button onClick={signUserOut}>Logout</button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar