

export default function LoginModal() {
    return (
        <div className="rounded-[10px] bg-ma-blue p-[24px] pb-[32px] w-[100%]">
            <h1 className="text-h-sm font-light pb-[40px]">Login</h1>
            <form className="flex flex-col gap-[40px] pb-[24px]">
                <div className="flex flex-col gap-[24px]">
                    <input type="email" />
                    <input type="password" />
                </div>
                <button className="font-light">Login to your account</button>
            </form>
            <p className="text-center font-light">Don&apos;t have an account? Sign up</p>
        </div>
    )
}
