import { useNavigate, Link } from "react-router-dom"

const NotFound = () =>
{
    const navigate = useNavigate();

    const handleGoBack = () =>
    {
        navigate(-1)
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-h-lg font-medium mb-4">404 Not Found</h1>
            <p className="text-h-xsm mb-4">Sorry, the page you are looking for does not exist.</p>
            <p className="text-h-xsm">
                Click <Link onClick={handleGoBack} className="text-blue-500">here</Link> to go back.
            </p>
        </div>
    )
}

export default NotFound