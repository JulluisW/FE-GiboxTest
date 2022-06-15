import { Layout, Menu } from "antd";
import { useState } from "react";
import { BookFilled, UserOutlined, BellFilled, ReconciliationOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style.scss";
const { Header } = Layout;

const menuItems = [
  {
    label: <Link to="/books">Books</Link>,
    key: "books",
    icon: <BookFilled />,
  },
  {
    label: <Link to="/students">Students</Link>,
    key: "students",
    icon: <UserOutlined />,
  },
  {
    label: <Link to="/rent">Rent Status</Link>,
    key: "rent",
    icon: <ReconciliationOutlined />,
  },
  {
    label: <Link to="/notification">Notification</Link>,
    key: "notification",
    icon: <BellFilled />,
  },
];

export function HeaderMenu({ page }) {
  const [current] = useState(page);

  return (
    <Header className="main-header">
      <Menu className="main-menu" selectedKeys={[current]} mode="horizontal" items={menuItems} />
    </Header>
  );
}
