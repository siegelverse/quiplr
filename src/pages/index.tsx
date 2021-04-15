import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Home from "../components/Home/Home";
import IsAuth from "../components/IsAuth";
import WelcomePage from "./welcome";


export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    if (localStorage.token) {
      setLoggedIn(true)
    } 
  }, [])
  
  return (
    <div>
      {loggedIn ? null : <WelcomePage />}
      <IsAuth>
        <Home />
      </IsAuth>
    </div>
  )
}
