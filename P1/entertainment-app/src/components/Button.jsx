
const Button = (props) => {
    // User passes in the desired text, and the onClick function.
    const { text, onClick } = props;

    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}