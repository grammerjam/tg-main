const backendRootUrl = import.meta.env.VITE_BACKEND_URL
const bookmarkRoute = "users/bookmarks"


export const updateBookmark = async (data) => {
    const dataToSend = {
        email: data.userEmail,
        mediaId: data.bookmarkId
    }

    try {
        await fetch(backendRootUrl + "api/" + bookmarkRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify(dataToSend)
        }).then(async (res) => {
            await res.json()
        }).then(() => {
            return true
        })
    } catch (error) {
        console.error('Error:', error);
        return false
    }
};