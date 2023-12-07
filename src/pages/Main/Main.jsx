import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import Post from "./Post"

function Main() {
    const postRef = collection(db, "posts")
    const [postList, setPostList] = useState(null)

    const handleDelete = (postId) => {
        setPostList((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    };

    const getPosts = async () => {
        const data = await getDocs(postRef)
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <main className="main">
            {postList?.map((post) => {
                return (
                    <Post post={post} onDelete={handleDelete} />
                )
            })}
        </main>
    )
}

export default Main