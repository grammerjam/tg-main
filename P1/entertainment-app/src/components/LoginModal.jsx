import { useSignIn } from "@clerk/clerk-react"
import { useState } from "react";

export default function LoginModal() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) {
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
                //router.push("/")
            }
            else {
                console.log(result);
            }

        } catch (err) {
            console.error("error", err.errors[0].longMessage)
        }
    };
    return (
        <div className="rounded-[10px] bg-ma-blue p-[24px] pb-[32px] w-[100%] tablet:max-w-[400px] tablet:p-[32px]">
            <h1 className="text-h-sm font-light pb-[40px]">Login</h1>
            <form className="flex flex-col gap-[40px] pb-[24px]">
                <div className="flex flex-col gap-[24px]">
                    <input className="bg-transparent border-b-[1px] border-ma-gray pb-[18px] pl-[16px] placeholder:font-light" placeholder="Email address" onChange={(e) => setEmailAddress(e.target.value)} id="email" name="email" type="email" />
                    <input className="bg-transparent border-b-[1px] border-ma-gray pb-[18px] pl-[16px] placeholder:font-light" placeholder="Password" onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" />
                </div>
                <button className="font-light bg-ma-red rounded-[6px] py-[14px]" onClick={handleSubmit}>Login to your account</button>
            </form>
            <p className="text-center font-light">Don&apos;t have an account? <span className="text-ma-red">Sign up</span></p>
        </div>
    )
}
