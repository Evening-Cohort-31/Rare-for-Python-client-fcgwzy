import "./button.css";

export const SubscribeButton = ({ onClick }) => {
  return (
    <>
      <button className="subscribe-btn round-btn" onClick={onClick}>
        Subscribe
      </button>
    </>
  );
}
