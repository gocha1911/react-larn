import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Google from '../assets/google.png'

function Login() {
    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
        navigate('/')
    }

    return (
        <section className="login">
            <p className="login__title">Sign In With Google To Continue</p>
            <button onClick={signInWithGoogle} className="login__btn"> <img src={Google} alt="" />Sign in with google</button>
        </section>
    )
}

export default Login