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
                /*Investigate why the login hasn't completed */
                console.log(result);
            }

        } catch (err) {
            console.error("error", err.errors[0].longMessage)
        }
    };
    return (
        <div className="rounded-[10px] bg-ma-blue p-[24px] pb-[32px] w-[100%]">
            <h1 className="text-h-sm font-light pb-[40px]">Login</h1>
            <form className="flex flex-col gap-[40px] pb-[24px]">
                <div className="flex flex-col gap-[24px]">
                    <input onChange={(e) => setEmailAddress(e.target.value)} id="email" name="email" type="email" />
                    <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" />
                </div>
                <button className="font-light border-cyan-500 border-4" onClick={handleSubmit}>Login to your account</button>
            </form>
            <p className="text-center font-light">Don&apos;t have an account? Sign up</p>
        </div>
    )
}
