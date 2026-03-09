import { Comment } from "./comment";

export const CommentList = ({ comments, onUpdateSuccess }) => {
  return (
    <div className="comments-container">
      <h2>Comments</h2>
      <div className="comments-list">
        {comments.map((c) => (
          <section key={`comment${c.id}`} className="comment">
            <Comment commentInstance={c} onUpdateSuccess={onUpdateSuccess} />
          </section>
        ))}
      </div>
    </div>
  );
};
