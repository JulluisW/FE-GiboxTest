import { Layout } from "antd";
import { Typography } from "antd";
import './style.scss'

const { Content } = Layout;

export function MainSection({children, ...props}) {
  return (
    <Content className="main-content">
        <Typography.Title>
          {props.title}
        </Typography.Title>
        {children}
      </Content>
  )
}
