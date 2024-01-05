import { useSignUp } from "@clerk/clerk-react";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [verify, setVerify] = useState(false);
    const [code, setCode] = useState("")


    const [hasSubmited, setHasSubmited] = useState(false)

    const nav = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmited(true);

        if (!isLoaded) {
            return;
        }

        if (password !== repeatPassword) {
            return;
        }

        if(!email || !password || !repeatPassword){
            return;
        }

        try {
            await signUp.create({
                emailAddress: email,
                password: password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setVerify(true);
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }

    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            // Submit the code that the user provides to attempt verification
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status !== "complete") {
                // The status can also be `abandoned` or `missing_requirements`
                // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
                console.log(JSON.stringify(completeSignUp, null, 2));
            }

            // Check the status to see if it is complete
            // If complete, the user has been created -- set the session active
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId })
                // Handle your own logic here, like redirecting to a new page if needed.
                nav("/login")
            }
        } catch (err) {
            // This can return an array of errors.
            // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
            console.error(JSON.stringify(err, null, 2));
        }
    };
    /*
        - Fix padding on mobile vs desktop
        - Change caret color
        - Border active color
    
    */
    return (
        <div className="flex w-full flex-col pt-[3rem] px-[1.5rem]  justify-center items-center">
            {/* Icon */}
            <img src="../../assets/logo.svg" className="mb-[3.5rem] tablet:mb-[4.5rem] desktop:mb-[5rem]" />
            {/* SignUp */}
            <div className="w-full tablet:w-[25rem] p-[1.5rem] rounded-[0.66rem] bg-ma-blue flex flex-col">
                <h2 className="font-light text-h-lg mb-[2.5rem]"> Sign Up </h2>
                {/* First form */}
                {!verify &&
                    <form className="flex flex-col">
                        <div className="flex flex-col relative mb-[1.5rem]">
                            <input onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" value={email} className="font-light text-b-med pl-[1rem] pb-[1rem] mb-[1.5rem] bg-transparent border-b-[1px] text-ma-white border-b-ma-gray outline-none" placeholder="Email"/>
                            {hasSubmited && !email && <p className="text-ma-red absolute right-[1rem] text-b-sm">{"Can't be empty"}</p>}
                        </div>
                        <div className="flex flex-col relative mb-[1.5rem]">
                            <input onChange={(e) => {
                                setPassword(e.target.value)
                            }} type="password" value={password} className="font-light text-b-med pl-[1rem] pb-[1rem] mb-[1.5rem] bg-transparent border-b-[1px] text-ma-white border-b-ma-gray outline-none" placeholder="Password" />
                            {hasSubmited && !password && <p className="text-ma-red absolute right-[1rem] text-b-sm">{"Can't be empty"}</p>}
                        </div>
                        <div className="flex flex-col relative mb-[1.5rem]">
                            <input onChange={(e) => {
                                setRepeatPassword(e.target.value)
                            }} type="password" value={repeatPassword} className="font-light text-b-med pl-[1rem] pb-[1rem] mb-[1.5rem] bg-transparent border-b-[1px] text-ma-white border-b-ma-gray outline-none" placeholder="Repeat Password" />
                            {hasSubmited && !repeatPassword && <p className="text-ma-red absolute right-[1rem] text-b-sm">{"Can't be empty"}</p>}
                        </div>
                        <Button text={"Create an Account"} onClick={handleSubmit}></Button>
                        <div className=" mt-[1.5rem] flex justify-center">
                            <p className=" font-light mr-[0.5rem]"> Already have an account? </p>
                            <a href="/login" className="font-light text-ma-red"> Login </a>
                        </div>
                    </form>}
                {/* Second form */}
                {verify &&
                    <form className="flex flex-col">
                        <label className=" text-ma-gray mb-[0.5rem]"> Verification Code </label>
                        <input onChange={(e) => {
                            setCode(e.target.value)
                        }} value={code} className=" mb-[1.5rem] bg-transparent border-b-[1px] border-b-ma-gray" />
                        <Button text={"Verify"} onClick={handleVerify}></Button>
                    </form>}
            </div>
        </div>
    )
}

export default SignUp;