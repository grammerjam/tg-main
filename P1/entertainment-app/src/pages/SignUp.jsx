import Button from "../components/Button";

const SignUp = () => {
    return (
        <main className="flex h-screen items-center justify-center">
        {/* Icon */}
            <div>

            </div>
        {/* Form Card*/}
            <div className="min-h-[27rem] w-[20rem] p-[1.5rem] rounded-[0.66rem] bg-ma-blue flex flex-col">
                <h2 className=" text-[2.5rem] mb-[2.5rem]"> Sign Up </h2>
                <form className="flex flex-col">
                    <label className=" text-ma-gray"> Email Address</label>
                    <input className=" mb-[1.5rem]"/>
                    <label className=" text-ma-gray"> Password </label>
                    <input className=" mb-[1.5rem]"/>
                    <label className=" text-ma-gray"> Repeat Password </label>
                    <input className=" mb-[2.5rem]"/>
                    <Button text={"Create an Account"}></Button>
                    <div className=" mt-[1.5rem] flex justify-center">
                        <p className=" mr-[0.5rem]"> Already have an account? </p>
                        <a href="/" className="text-ma-red"> Login </a>
                    </div>
                </form>
            </div>   
        </main>
    )
}

export default SignUp;