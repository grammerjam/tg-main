import { useSignUp } from "@clerk/clerk-react";
import Button from "../components/Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [signUpError, setSignUpError] = useState("")

    const [verify, setVerify] = useState(false);
    const [code, setCode] = useState("")
    const [verifyError, setVerifyError] = useState("")

    const [hasSubmited, setHasSubmited] = useState(false)
    const nav = useNavigate();

    const backendRootUrl = import.meta.env.VITE_BACKEND_URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmited(true);
        setSignUpError("")
        if (!isLoaded) {
            return;
        }
        if (password !== repeatPassword) {
            setSignUpError("Passwords do not match")
            return;
        }
        if (!email || !password || !repeatPassword) {
            return;
        }

        try {
            await signUp.create({
                emailAddress: email,
                password: password,
            });
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setVerify(true);
            setHasSubmited(false);

        } catch (error) {
            setSignUpError(error.errors[0].longMessage)
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setVerifyError("")
        setHasSubmited(true)
        if (!isLoaded) {
            return;
        }
        if (!code) {
            return;
        }
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status !== "complete") {
                console.log(JSON.stringify(completeSignUp, null, 2));
            }
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId })
                const dataToSend = {
                    email: email
                };
                await fetch(backendRootUrl + "api/users", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Specify the content type
                    },
                    body: JSON.stringify(dataToSend)
                }).then(
                    nav("/")
                )
            }
        } catch (error) {
            setVerifyError(error.errors[0].longMessage)
        }
    };

    return (
        <div className="flex w-full flex-col pt-[3rem] tablet:pt-[5rem] px-[1.5rem]  justify-center items-center">
            <Helmet>
                <title>Sign Up - Entertainment App </title>
                <meta name="description" content="Join the Entertainment App community and unlock exclusive features. Create your account today to personalize your entertainment experience and discover content tailored to your tastes." />
            </Helmet>    
            {/* Icon */}
            <img src="../../assets/logo.svg" className="mb-[3.5rem] tablet:mb-[4.5rem] desktop:mb-[5rem]" />
            {/* SignUp */}
            <div className="w-full tablet:w-[25rem] p-[1.5rem] rounded-[0.66rem] bg-ma-blue flex flex-col">
                <h2 className="font-light text-h-lg mb-[2.5rem]"> Sign Up </h2>
                {/* First form */}
                {!verify &&
                    <form className="flex flex-col">
                        <div className="flex flex-col relative mb-[0.5rem]">
                            <input onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" value={email} placeholder="Email address"
                                className={`caret-ma-red font-light text-b-med pl-[1rem] pb-[1rem] mb-[1.5rem] bg-transparent border-b-[1px] text-ma-white border-b-ma-gray outline-none focus:border-ma-white ${hasSubmited && email === "" ? "border-b-ma-red" : ""}`} />
                            {hasSubmited && !email && <p className="text-ma-red absolute right-[1rem] text-b-sm">{"Can't be empty"}</p>}
                        </div>
                        <div className="flex flex-col relative mb-[0.5rem]">
                            <input onChange={(e) => {
                                setPassword(e.target.value)
                            }} type="password" value={password} placeholder="Password"
                                className={`caret-ma-red font-light text-b-med pl-[1rem] pb-[1rem] mb-[1.5rem] bg-transparent border-b-[1px] text-ma-white border-b-ma-gray outline-none focus:border-ma-white ${hasSubmited && email === "" ? "border-b-ma-red" : ""}`} />
                            {hasSubmited && !password && <p className="text-ma-red absolute right-[1rem] text-b-sm">{"Can't be empty"}</p>}
                        </div>
                        <div className="flex flex-col relative mb-[1.5rem] tablet:mb-[0.5rem]">
                            <input onChange={(e) => {
                                setRepeatPassword(e.target.value)
                            }} type="password" value={repeatPassword} placeholder="Repeat Password"
                                className={`caret-ma-red font-light text-b-med pl-[1rem] pb-[1rem] mb-[1.5rem] bg-transparent border-b-[1px] text-ma-white border-b-ma-gray outline-none focus:border-ma-white ${hasSubmited && email === "" ? "border-b-ma-red" : ""}`} />
                            {hasSubmited && !repeatPassword && <p className="text-ma-red absolute right-[1rem] text-b-sm">{"Can't be empty"}</p>}
                        </div>
                        {signUpError ? <p className=" text-b-med text-ma-red pb-[24px]">{signUpError}</p> : null}
                        <Button text={"Create an Account"} onClick={handleSubmit}></Button>
                        <div className=" mt-[1.5rem] flex justify-center">
                            <p className=" font-light mr-[0.5rem]"> Already have an account? </p>
                            <a href="/login" className="font-light text-ma-red"> Login </a>
                        </div>
                    </form>}
                {/* Second form */}
                {verify &&
                    <form className="flex flex-col">
                        <div className="flex flex-col relative mb-[1.5rem] tablet:mb-[0.5rem]">
                            <input onChange={(e) => {
                                setCode(e.target.value)
                            }} value={code} placeholder="Verification Code"
                                className={` relative w-full caret-ma-red font-light text-b-med pl-[1rem] pb-[1rem] mb-[1.5rem] bg-transparent border-b-[1px] text-ma-white border-b-ma-gray outline-none focus:border-ma-white ${hasSubmited && email === "" ? "border-b-ma-red" : ""}`} />
                            {hasSubmited && !code && <p className="text-ma-red absolute right-[1rem] text-b-sm">{"Can't be empty"}</p>}
                        </div>
                        {verifyError ? <p className=" text-b-med text-ma-red pb-[24px]"> {verifyError} </p> : null}
                        <Button text={"Verify"} onClick={handleVerify}></Button>
                    </form>}
            </div>
        </div>
    )
}

export default SignUp;