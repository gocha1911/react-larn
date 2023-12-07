import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection } from "firebase/firestore"
import * as yup from "yup"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

function Form() {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const schema = yup.object().shape({
        title: yup.string().min(2, "You Must Add A Title!").required("You Must Add A Title!"),
        description: yup.string().required("You Must Add A Description!")
    })

    const { register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(schema)
    })

    const postRef = collection(db, "posts")

    const onCreatePost = async (data) => {
        await addDoc(postRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })
        reset()
        navigate('/')
    }

    return (
        <form className="form" onSubmit={handleSubmit(onCreatePost)}>
            <input type="text" placeholder="Title..." {...register("title")} />
            <p className="form_error">{errors.title?.message}</p>
            <textarea type="text" placeholder="Description..." {...register("description")} />
            <p className="form_error">{errors.description?.message}</p>
            <input type="submit" />
        </form>
    )
}

export default Form