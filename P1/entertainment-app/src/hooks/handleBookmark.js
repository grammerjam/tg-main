const backendRootUrl = import.meta.env.VITE_BACKEND_URL
const bookmarkRoute = "users/bookmarks"

export const updateBookmark = async (data, list) => {
    let indexOfBookmark = list.indexOf(data.bookmarkId)
    if (indexOfBookmark !== -1) {
        list.splice(indexOfBookmark, 1)
    } else {
        list.push(data.bookmarkId)
    }
    console.log(list)
    const dataToSend = {
        email: data.userEmail,
        bookmarks: list
    }

    try {
        await fetch(backendRootUrl + "api/" + bookmarkRoute, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' // Specify the content type
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