import { Menu } from "antd";
import { AppstoreOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MenuList = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      className="h-svh mt-0 flex flex-col gap-2 relative">
      <Menu.Item key={"dashboard"} icon={<AppstoreOutlined />}>
        <Link to={"/admin/dashboard"}>Dashboard</Link>
      </Menu.Item>
      <Menu.Item key={"add"} icon={<EditOutlined />}>
        <Link to={"/admin/add"}>Add</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;
