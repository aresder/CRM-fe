import { Button, Layout } from "antd";
import LogoSidebar from "./LogoSidebar";
import MenuList from "./MenuList";
import { Content, Header } from "antd/es/layout/layout";
import DashboardPage from "../../pages/admin/DashboardPage";
import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AddPage from "../../pages/admin/AddPage";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import removeCookie from "../../hooks/removeCookie";

const { Sider } = Layout;
const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout>
      <Sider
        className="text-white hidden md:block"
        collapsed={collapsed}
        collapsible
        trigger={null}>
        <LogoSidebar collapsed={collapsed} />
        <MenuList />
      </Sider>
      <Layout>
        <Header className="p-0 bg-white">
          <div className="flex justify-between items-center h-full">
            <Button
              type="text"
              icon={
                collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />
              }
              className="ml-4"
              onClick={() => setCollapsed(!collapsed)}
            />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              className="mr-4"
              onClick={() => removeCookie("x-access-token")}
            />
          </div>
        </Header>
        <Content>
          <Routes>
            <Route path="admin/dashboard" element={<DashboardPage />} />
            <Route path="admin/add" element={<AddPage />} />
          </Routes>
        </Content>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default SidebarComponent;
