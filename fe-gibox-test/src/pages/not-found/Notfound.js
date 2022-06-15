import { Button } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";

export function Notfound() {
  return (
    <div className="not-found-page">
      <img src="https://i0.wp.com/saedx.com/blog/wp-content/uploads/2019/01/saedx-blog-featured-70.jpg?fit=1200%2C500&ssl=1" alt="notfound" />
      <Button size="large">
        <Link to="/books">Go Back</Link>
      </Button>
    </div>
  );
}
