import "./Avatar.css";

const Avatar = ({ image, name }) => {
  return (
    <div className="avatar">
      {image ? (
        <img src={image} alt={name} />
      ) : (
        <span>{name?.charAt(0)}</span>
      )}
    </div>
  );
};

export default Avatar;