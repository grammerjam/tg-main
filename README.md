# Cinemate - Client

Cinemate is a web application that helps users wind down to watch their favorite movies and TV shows. Users can explore trending content, filter by various categories, and bookmark their favorite shows and movies for easy access.

### Website Link

[Visit Cinemate](https://develop--transcendent-arithmetic-b66dd1.netlify.app/)

## Table of Contents

- [Client Tech Stack](#client-tech-stack)
- [Features](#features)
- [Color Reference](#color-reference)
- [Usage/Examples](#usageexamples)
- [Run Locally](#run-locally)
- [Credit](#credit)
- [Related](#related)
- [Acknowledgements](#acknowledgements)

## Client Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Clerk](https://docs.clerk.dev/)
- [Tanstack](https://tanstack.com/)
- [Netlify](https://www.netlify.com/)

## Features

- Authentication and Authorization (Clerk) with optional provider (Google) to sign in/sign up.
- Ability to filter content based on Trending, Bookmarked, TV Shows, and Movies (React Router) from the Navbar.
- Ability to search content based on user-submitted queries (React Router) in the search bar and based on selected filters from the Nav.

## Color Reference

| Color       | Hex       |
| ----------- | --------- |
| ma-black    | #10141E   |
| ma-gray     | #5A698F   |
| ma-blue     | #161D2F   |
| ma-white    | #FFFFFF   |

## Usage/Examples

```React

import { useSearchParams } from "react-router-dom";
import MediaContainer from "../components/MediaContainer.jsx";
import TrendingContainer from "../components/TrendingContainer.jsx"

const Home = () => {

    let [searchParams] = useSearchParams()
    let searchString = searchParams.get('search')

    return (
        <div className="flex flex-col">
            <div className="pl-[1rem] tablet:pl-[1.5rem] w-full">
                {!searchString && <TrendingContainer />}
            </div>
                <MediaContainer pageTitle={"Recommended"} />
        </div>
    )
}
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_CLERK_PUBLISHABLE_KEY`

`VITE_BACKEND_URL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/grammerjam/tg-main.git
```
Go to the project directory
```bash
  cd tg-main/P1/entertainment-app
```
Install dependencies
```bash
  npm install
```
Start the server
```bash
  npm run start
```

## Related

Here are some related projects

https://movie-web.app/browse/game

## Credit - Team MiamiAngels

* Jose Facade - Full Stack Developer /Audio Engineer & Director | LinkedIn | GitHub
* Alejandro Vecchio - Lead Developer  | LinkedIn | GitHub
* Olivia Banks - Project Manager / Athlete | LinkedIn
* Luis Perez - Full Stack Developer / Powerlifter | LinkedIn | GitHub

## Acknowledgements

Special thanks to Allan Tito and the senior developers from the Grammerhub community for making this project happen.

______________________________

**Powered by [Grammerhub](http://discord.grammerhub.org)**
