import { useState } from 'react';
import Logo from '/assets/logo.svg'
import { useSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ForgotPassword() {
    const [signUpError, setSignUpError] = useState("")
    const [email, setEmail] = useState('');
    const [successfulCreation, setSuccessfulCreation] = useState(false);
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const { isLoaded, signIn, setActive } = useSignIn();
    const [complete, setComplete] = useState(false);
    const [secondFactor, setSecondFactor] = useState(false);
    const [hasSubmitedCreate, setHasSubmitedCreate] = useState(false)
    const [hasSubmitedReset, setHasSubmitedReset] = useState(false)
    const navigate = useNavigate();

    if (!isLoaded) {
        return null;
    }

    async function create(e) {
        e.preventDefault()
        setHasSubmitedCreate(true)
        if (email === "") {
            return
        }
        e.preventDefault();
        await signIn
            ?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            })
            .then(() => {
                setSuccessfulCreation(true);
                setSignUpError("")

            })
            .catch(err => {
                setSignUpError(err.errors[0].message)
                console.error('error', err.errors[0].longMessage)
            });
    }

    async function reset(e) {
        e.preventDefault();
        setHasSubmitedReset(true)
        if (code === "") {
            return
        }
        if (password === "") {
            return
        }
        await signIn
            ?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })
            .then(result => {
                if (result.status === 'needs_second_factor') {
                    setSecondFactor(true);
                } else if (result.status === 'complete') {
                    setActive({ session: result.createdSessionId });
                    setComplete(true);
                    navigate("/")
                } else {
                    console.log(result);
                }
            })
            .catch(err => {
                console.error('error', err.errors[0].longMessage)
                setSignUpError(err.errors[0].message)
            });
    }

    return (
        <div className="w-[100dvw] h-[100dvh] px-[24px] pt-[48px]  gap-[58px] flex flex-col items-center tablet:pt-[80px] tablet:gap-[72.4px] desktop:gap-[83px]">
            <Helmet>
                <title>Forgot Password - Entertainment App</title>
                <meta name="description" content="Forgot your password? No worries! Follow the steps on this page to reset your password and regain access to your Entertainment App account." />
            </Helmet>
            <img src={Logo} />
            <div className="w-[100%] rounded-[10px] bg-ma-blue p-[24px] pb-[32px] tablet:max-w-[400px] tablet:p-[32px]">
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',

                    }}
                    className='text-ma-black'
                    onSubmit={!successfulCreation ? create : reset}
                >
                    <h1 className="text-h-lg font-light pb-[40px] text-white">Forgot Password</h1>
                    {!successfulCreation && !complete && (
                        <div className='flex flex-col gap-[40px]'>
                            <div className="w-[100%] relative h-[44px]">
                                <input
                                    type='email'
                                    name="email"
                                    placeholder='Email address'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className='text-white w-[100%] bg-transparent border-b-[1px] border-ma-gray pb-[18px] pl-[16px] text-b-med placeholder:font-light font-light focus:outline-none focus:border-ma-white caret-ma-red'
                                />
                                {hasSubmitedCreate && email === "" ?
                                    <p className='absolute text-ma-red text-b-sm right-0 top-0 pt-[3px] tablet:pt-[2px]'>Can&apos;t be empty</p>
                                    : null
                                }
                            </div>
                            {signUpError ? <p className="text-ma-red text-b-sm right-0 top-0 pt-[3px] tablet:pt-[2px]">{signUpError}</p> : null}
                            <button className="font-light bg-ma-red rounded-[6px] py-[14px] hover:bg-white hover:text-ma-black text-white">Send Code</button>
                        </div>
                    )}

                    {successfulCreation && !complete && (
                        <div className='flex flex-col gap-[40px]'>
                            <div className='flex flex-col gap-[24px]'>
                                <div className="w-[100%] relative h-[44px]">
                                    <input
                                        type='text'
                                        name="resetCode"
                                        placeholder='Reset Code'
                                        value={code}
                                        onChange={e => setCode(e.target.value)}
                                        className='text-white w-[100%] bg-transparent border-b-[1px] border-ma-gray pb-[18px] pl-[16px] text-b-med placeholder:font-light font-light focus:outline-none focus:border-ma-white caret-ma-red'
                                    />
                                    {hasSubmitedReset && code === "" ?
                                        <p className='absolute text-ma-red text-b-sm right-0 top-0 pt-[3px] tablet:pt-[2px]'>Can&apos;t be empty</p>
                                        : null
                                    }
                                </div>
                                <div className="w-[100%] relative h-[44px]">
                                    <input
                                        type='password'
                                        name='password'
                                        placeholder='New Password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className='text-white w-[100%] bg-transparent border-b-[1px] border-ma-gray pb-[18px] pl-[16px] text-b-med placeholder:font-light font-light focus:outline-none focus:border-ma-white caret-ma-red'
                                    />
                                    {hasSubmitedReset && password === "" ?
                                        <p className='absolute text-ma-red text-b-sm right-0 top-0 pt-[3px] tablet:pt-[2px]'>Can&apos;t be empty</p>
                                        : null
                                    }
                                </div>
                                {signUpError ? <p className="text-ma-red text-b-sm right-0 top-0 pt-[3px] tablet:pt-[2px]">{signUpError}</p> : null}
                            </div>
                            <button className="font-light bg-ma-red rounded-[6px] py-[14px] hover:bg-white hover:text-ma-black text-white">Reset</button>
                        </div>
                    )}

                    {complete && 'You successfully changed you password'}
                    {secondFactor && '2FA is required, this UI does not handle that'}
                </form>
            </div>
        </div>
    )
}
