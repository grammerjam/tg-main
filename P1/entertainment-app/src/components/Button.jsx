
const Button = (props) => {
    // User passes in the desired text, and the onClick function.
    const { text, onClick } = props;
    const red = "#FC4747", white = "#sdvsd";
    return (
        <button onClick={onClick} className="h-[3rem] max-h-[21rem] w-full bg-red text-white hover:bg-white hover:hover:text-black rounded-md ">
            {text}
        </button>
    )
}

export default Button;