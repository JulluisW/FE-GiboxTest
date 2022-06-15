import { Layout } from "antd";
import { HeaderMenu } from "../../components";

const {Content} = Layout;

export function Students() {
  return (
    <Layout>
      <HeaderMenu page="students"/>
      <Content>Students</Content>
    </Layout>
  )
}
