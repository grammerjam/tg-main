import Button from "../components/Button";

const SignUp = () => {
    return (
        <main className="flex h-screen items-center justify-center">
        {/* Icon */}
            <div>

            </div>
        {/* Form Card*/}
            <div className="h-[27rem] w-[20rem] bg-ma-blue flex flex-col justify-center">
                <h2> Sign Up </h2>
                <form className="flex flex-col">
                    <label> Email Address</label>
                    <input/>
                    <label> Password </label>
                    <input/>
                    <label> Repeat Password </label>
                    <input/>
                    <Button text={"Submit"}></Button>
                    <span> 
                        <p> Already have an account? </p>
                        <a> Login </a>
                    </span>
                </form>
            </div>   
        </main>
    )
}

export default SignUp;