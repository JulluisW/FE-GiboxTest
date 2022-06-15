import { Layout } from "antd";
import { HeaderMenu } from "../../components";

const {Content} = Layout;

export function Rent() {
  return (
    <Layout>
      <HeaderMenu page="rent" />
      <Content>Rent</Content>
    </Layout>
  )
}
