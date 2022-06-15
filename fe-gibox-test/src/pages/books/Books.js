import { Layout } from "antd";
import { HeaderMenu } from "../../components";

const {Content} = Layout;

export function Books() {

  return (
    <Layout>
      <HeaderMenu page="books" />
      <Content>Books</Content>
    </Layout>
  );
}
