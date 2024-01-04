import Button from "../components/Button";
import { useState } from "react";

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");


    return (
        <main className="flex h-screen items-center justify-center">
            {/* Icon */}
            <div>

            </div>
            {/* Form Card*/}
            <div className="min-h-[27rem] w-[20rem] p-[1.5rem] rounded-[0.66rem] bg-ma-blue flex flex-col">
                <h2 className=" text-[2.5rem] mb-[2.5rem]"> Sign Up </h2>
                <form className="flex flex-col">
                    <label className=" text-ma-gray mb-[0.5rem]"> Email Address</label>
                    <input onChange={(e) => {
                        setEmail(e.target.value)
                    }} value={email} className=" mb-[1.5rem] bg-transparent border-b-[1px] border-b-ma-gray" />
                    <label className=" text-ma-gray mb-[0.5rem]"> Password </label>
                    <input onChange={(e) => {
                        setPassword(e.target.value)
                    }} value={password} className=" mb-[1.5rem] bg-transparent border-b-[1px] border-b-ma-gray" />
                    <label className=" text-ma-gray mb-[0.5rem]"> Repeat Password </label>
                    <input onChange={(e) => {
                        setRepeatPassword(e.target.value)
                    }} value={repeatPassword} className=" mb-[1.5rem] bg-transparent border-b-[1px] border-b-ma-gray" />
                    <Button text={"Create an Account"}></Button>
                    <div className=" mt-[1.5rem] flex justify-center">
                        <p className=" mr-[0.5rem]"> Already have an account? </p>
                        <a href="/login" className="text-ma-red"> Login </a>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default SignUp;