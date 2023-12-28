
const Button = (props) => {
    // User passes in the desired text, and the onClick function.
    const { text, onClick } = props;
    const red = "#FC4747", white = "#sdvsd";
    return (
        <button onClick={onClick} className="h-[3rem] max-h-[21rem] w-full bg-red hover:bg-white">
            {text}
        </button>
    )
}

export default Button;