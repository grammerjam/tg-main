import Logo from '../../assets/logo.svg'
import LoginModal from "../components/LoginModal";

const Login = () => {

    return (
        <div className="px-[24px] pt-[48px] gap-[58px] flex flex-col items-center">
            <img src={Logo}/>
            <LoginModal />
        </div>
    )
}

export default Login