import { Comment } from "./comment";

export const CommentList = ({ comments }) => {
  return (
    <div className="comments-container">
      <h2>Comments</h2>
      <div className="comments-list">
        {comments.map((c) => (
          <section key={`comment${c.id}`} className="comment">
            <Comment commentInstance={c} />
          </section>
        ))}
      </div>
    </div>
  );
};
