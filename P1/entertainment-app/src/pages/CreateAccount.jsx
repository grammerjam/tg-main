import { useUser, useAuth } from "@clerk/clerk-react";
import {
    useEffect, useRef,
} from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const email = user.primaryEmailAddress?.emailAddress
    const backendRootUrl = import.meta.env.VITE_BACKEND_URL

    const { user } = useUser();
    const { getToken } = useAuth();

    const renderAfterCalled = useRef(false);
    const nav = useNavigate();


    useEffect(() => {
        const dataToSend = {
            email: email
        };
        //needed for development so it doesn't make 2 post calls
        if (!renderAfterCalled.current) {
            fetch(backendRootUrl + "api/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                    Authorization: `Bearer ${getToken}`
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