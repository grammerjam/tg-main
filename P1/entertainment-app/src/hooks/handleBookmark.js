const backendRootUrl = import.meta.env.VITE_BACKEND_URL
const bookmarkRoute = "users/bookmarks"

export const updateBookmark = async (userEmail, bookmarkId) => {
    const dataToSend = {
        email: userEmail,
        mediaId: bookmarkId
    }

    await fetch(backendRootUrl + "api/" + bookmarkRoute, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        },
        body: JSON.stringify(dataToSend)
    }).then((res) => {
        let response = res.json()
        console.log(response)
    }).catch(error => {
        console.error('Error:', error);
    });
};