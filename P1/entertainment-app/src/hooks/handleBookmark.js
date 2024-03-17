const backendRootUrl = import.meta.env.VITE_BACKEND_URL
const bookmarkRoute = "users/bookmarks"

export const updateBookmark = async (data, token) => {
    const dataToSend = {
        email: data.userEmail,
        mediaId: data.bookmarkId
    }

    try {
        await fetch(backendRootUrl + "api/" + bookmarkRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type
                Authorization: `Bearer ${await token()}`
            },
            body: JSON.stringify(dataToSend)
        }).then(async (res) => {
            const response = await res.json()
            console.log(response)
        })
    } catch (error) {
        console.error('Error:', error);
    }
};