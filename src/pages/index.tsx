import { useQuery } from "@apollo/client";
import Home from "../components/Home/Home";
import IsAuth from "../components/IsAuth";
import Profile, { ME_QUERY } from "./profile";
import WelcomePage from "./welcome";


export default function App() {
  const loggedIn = localStorage.token;
  const { loading, error, data } = useQuery(ME_QUERY);
  return (
    <div>
      {loggedIn ? null : <WelcomePage />}
      <IsAuth>
        {data.me.Profile ? (
          <Home />
          ): 
          <Profile />
        }
      </IsAuth>
    </div>
  )
}
