import Logo from '/assets/logo.svg'
import LoginModal from "../components/LoginModal.jsx";

const Login = () => {

    return (
        <div className="w-[100dvw] h-[100dvh] px-[24px] pt-[48px]  gap-[58px] flex flex-col items-center tablet:pt-[80px] tablet:gap-[72.4px] desktop:gap-[83px]">
            <img src={Logo} alt="App Logo"/>
            <LoginModal />
        </div>
    )
}

export default Login