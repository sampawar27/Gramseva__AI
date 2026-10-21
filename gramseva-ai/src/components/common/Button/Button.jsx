import "./Button.css";

function Button({
    text,
    variant,
    onClick
}) {

    return (
        <button
            className={`button ${variant || ""}`}
            onClick={onClick}
        >
            {text}
        </button>
    );

}

export default Button;