import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { MainSection } from "../../components";
import "./style.scss";

export function Login() {
  let navigate = useNavigate();

  const onFinish = async (values) => {
    let isLogin = false;
    try {
      const { data } = await api.get("/admins");
      data.forEach((el) => {
        if ((el.email === values.username || el.username === values.username) && el.password === values.password) {
          localStorage.setItem("token", "Masuk");
          isLogin = true;
          return navigate("../books");
        }
      });
      isLogin ? message.success("Login Success") : message.error("Invalid Email or Password");
      const rents = await api.get("/rent_transactions");
      const penalties = rents.data.filter(el => {
        return new Date(el.returnDueDate) < new Date()
      })
      message.info(<div onClick={() => {
        navigate("../rent")
      }}>There are {penalties.length} expired rent(s).  Click here to see</div>, 3)
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <MainSection title="Login">
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </MainSection>
  );
}
