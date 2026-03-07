import { useEffect } from "react";
import { useState } from "react";
import { getAllCommentsForPost } from "../../managers/CommentManager";
import { Comment } from "./comment";
import { useParams } from "react-router-dom";

export const CommentList = () => {

    const [comments, setComments] = useState([])
    const { post_id } = useParams();

    useEffect(() => {
        console.log("Fetching comments for Post ID:", post_id);
        getAllCommentsForPost(post_id).then((commentData) => {
            setComments(commentData)
        })
    }, [post_id])

    return (
        <div className="comments-container">
            <h2>Comments</h2>
                <div className="comments-list">
                    {
                        comments.map(c => {
                            return <section key={`comment${c.id}`} className="comment">
                                <Comment commentInstance={c}/>
                            </section>
                        })
                    }
                </div>
        </div>
    )
}