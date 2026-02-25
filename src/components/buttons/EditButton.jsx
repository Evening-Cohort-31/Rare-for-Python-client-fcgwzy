import "./button.css";


export const EditButton = ({onClick}) => {

  return (
    <>
        <button className="cube-btn"
        onClick={onClick}
        disabled={disabled}>Settings Icon</button>
    </>
  );
};