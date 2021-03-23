import IsAuth from "../components/IsAuth";
import Layout from "../components/Layout/Layout";
import Users from "../components/Users";
import WelcomePage from "./welcome";


export default function Home() {
  return (
    <Layout>
      <WelcomePage />
      <IsAuth>
        <Users />
      </IsAuth>
    </Layout>
  )
}
