import { SlackSquareOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
const LogoSidebar = ({ collapsed }) => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="flex gap-2 items-center">
        <SlackSquareOutlined style={{ fontSize: "22px" }} />{" "}
        {!collapsed && <span className="text-xs">CRM by TuruLabs</span>}
      </div>
    </div>
  );
};

export default LogoSidebar;
