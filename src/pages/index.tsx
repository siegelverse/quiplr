import Home from "../components/Home/Home";
import IsAuth from "../components/IsAuth";
import Layout from "../components/Layout/Layout";
import WelcomePage from "./welcome";


export default function App() {
  return (
    <Layout>
      <IsAuth>
        <Home />
      </IsAuth>
    </Layout>
  )
}
