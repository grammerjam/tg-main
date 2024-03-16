import Logo from '/assets/logo.svg'
import LoginModal from "../components/LoginModal.jsx";
import { Helmet } from 'react-helmet';

const Login = () => {

    return (
        <div className="w-[100dvw] h-[100dvh] px-[24px] pt-[48px]  gap-[58px] flex flex-col items-center tablet:pt-[80px] tablet:gap-[72.4px] desktop:gap-[83px]">
            <Helmet>
                <title>Login - Entertainment App </title>
                <meta name="description" content="Secure and quick login to access your personalized entertainment world. Stream your favorites on our entertainment platform anytime, anywhere."/>
            </Helmet>
            <img src={Logo} alt="App Logo"/>
            <LoginModal />
        </div>
    )
}

export default Login