import { useUser } from "@clerk/clerk-react";
import {
    useEffect, useRef,
    // useRef 
} from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const renderAfterCalled = useRef(false);
    const nav = useNavigate();
    const { user } = useUser();
    const email = user.primaryEmailAddress?.emailAddress

    const backendRootUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const dataToSend = {
            email: email
        };
        if (!renderAfterCalled.current) {
            fetch(backendRootUrl + "api/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Specify the content type
                },
                body: JSON.stringify(dataToSend)
            }).then(() => {
                nav("/");
            }).catch(error => {
                console.error('Error:', error);
            });
        }
        renderAfterCalled.current = true;
    }, [nav, backendRootUrl, email, user])

    return (
        <div className="">
            <p>{`Loading`}</p>
        </div>
    )
}

export default CreateAccount