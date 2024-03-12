import PropTypes from 'prop-types';

const Button = (props) => {
    // User passes in the desired text, and the onClick function.
    const { text, onClick } = props;
    return (
        <button onClick={onClick} className="font-light text-b-med h-[3rem] max-h-[21rem] w-full bg-ma-red text-ma-white hover:bg-ma-white hover:text-black rounded-md " role="button" >
            {text}
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func
}

export default Button;