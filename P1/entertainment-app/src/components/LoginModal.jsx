import { useSignIn } from "@clerk/clerk-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '/assets/google-logo.svg'

export default function LoginModal() {
    const navigate = useNavigate();
    const { isLoaded, signIn, setActive } = useSignIn();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [hasSubmited, setHasSubmited] = useState(false)
    const [signUpError, setSignUpError] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignUpError("")
        setHasSubmited(true)

        if (!isLoaded) {
            return;
        }

        if (!emailAddress || !password) {
            return;
        }


        try {
            const result = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (result.status === "complete") {
                console.log(result);
                await setActive({ session: result.createdSessionId });
                navigate("/")
            }
            else {
                console.log(result);
            }

        } catch (err) {
            console.error("error", err.errors[0].longMessage)
            setSignUpError(err.errors[0].message)
        }
    };
    return (
        <div className="w-[100%] rounded-[10px] bg-ma-blue p-[24px] pb-[32px] tablet:max-w-[400px] tablet:p-[32px]">
            <h1 className="text-h-lg font-light pb-[40px]">Login</h1>
            <form className="flex flex-col gap-[40px] pb-[24px]">
                <div className="flex flex-col gap-[24px]">
                    <div className="w-[100%] relative h-[44px]">
                        <input className={`w-[100%] bg-transparent border-b-[1px] border-ma-gray pb-[18px] pl-[16px] text-b-med placeholder:font-light font-light focus:outline-none focus:border-ma-white caret-ma-red ${hasSubmited && emailAddress === "" ? "border-b-ma-red" : ""}`} placeholder="Email address"
                            onChange={(e) => setEmailAddress(e.target.value)}
                            id="email"
                            name="email"
                            type="email"
                        />
                        <p className={`absolute text-ma-red text-b-sm right-0 top-0 pt-[3px] tablet:pt-[2px] ${hasSubmited && emailAddress === "" ? "" : "hidden"}`}>Can&apos;t be empty</p>
                    </div>
                    <div className="w-[100%] relative h-[44px]">
                        <input className={`w-[100%] bg-transparent border-b-[1px] border-ma-gray pb-[18px] pl-[16px] text-b-med placeholder:font-light font-light focus:outline-none focus:border-ma-white caret-ma-red ${hasSubmited && password === "" ? "border-b-ma-red" : ""}`} placeholder="Password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" />
                        <p className={`absolute text-ma-red text-b-sm right-0 top-0 pt-[3px] tablet:pt-[2px] ${hasSubmited && password === "" ? "" : "hidden"}`}>Can&apos;t be empty</p>
                    </div>
                </div>
                {signUpError ? <p className=" text-b-med text-ma-red">{signUpError}</p> : null}
                <button className="font-light bg-ma-red rounded-[6px] py-[14px] hover:bg-white hover:text-ma-black" onClick={handleSubmit}>Login to your account</button>
            </form>
            <SignInOAuthButtons />
            <p className="text-center font-light pt-[24px]">Don&apos;t have an account? <Link to="/signup">
                <span className="text-ma-red">Sign up</span>
            </Link></p>
            <Link to="/forgot-password">
                <p className="text-center font-light text-ma-gray pt-[16px]">Forgot Your Password?</p>
            </Link>
        </div>
    )
}

function SignInOAuthButtons() {
    const { signIn } = useSignIn();

    const signInWith = (strategy) => {
        signIn.authenticateWithRedirect({
            strategy,
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/create-account",
        });
    };
    return (
        <div className="w-full bg-white rounded-[6px]">
            <button onClick={(e) => {
                e.preventDefault()
                signInWith("oauth_google")
            }} className="text-black flex justify-center w-full gap-[16px] py-[16px] " aria-label="Sign in with Gmail" >
                Sign In With Gmail <img src={Logo} alt="Sign in with Gmail" />
            </button>
        </div>
    );
}