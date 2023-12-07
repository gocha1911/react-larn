import { addDoc, getDocs, collection, query, where, doc, deleteDoc } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"


function Post(props) {
    const likesRef = collection(db, "likes")
    const likesDoc = query(likesRef, where("postId", "==", props.post.id))
    const [user] = useAuthState(auth)
    const [likes, setLikes] = useState(null)

    const getLike = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    const deletePost = async () => {
        try {
            const postDoc = doc(db, "posts", props.post.id);
            await deleteDoc(postDoc);
            props.onDelete(props.post.id);
            removeLike()
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    const addLike = async () => {
        try {
            await addDoc(likesRef, {
                userId: user?.uid,
                postId: props.post.id
            })
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }])
            }
        } catch (err) {
            console.log(err);
        }
    }

    const removeLike = async () => {
        const likeToDeleteQuery = query(
            likesRef,
            where("postId", "==", props.post.id),
            where("userId", "==", user?.uid)
        )

        const likeToDeleteDate = await getDocs(likeToDeleteQuery)

        const likeToDelete = doc(db, "likes", likeToDeleteDate.docs[0].id)
        try {
            await deleteDoc(likeToDelete)
            if (user) {
                setLikes((prev) => prev?.filter(like => like.id === likeToDeleteDate.docs[0].id))
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getLike()
    }, [])

    return (
        <div className="postBox">
            <h1 className="post__title">{props.post.title}</h1>
            <p className="post__desc">{props.post.description}</p>
            <div className="post__footer">
                <p><span>User:</span> {props.post.username}</p>
                <div className="postBox__item">
                    <button className="post__footer__delete" onClick={deletePost}>Delete post</button>
                    <button onClick={hasUserLiked ? removeLike : addLike} className="post__footer__like">{hasUserLiked ? <>&#128078;</> : <>&#128077;</>} <span className="post__footer_like_number">{likes?.length}</span></button>
                </div>
            </div>
        </div>
    )
}

export default Post