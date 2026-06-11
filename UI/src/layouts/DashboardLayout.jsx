import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import TopNavbar from "../components/common/TopNavbar";

const DashboardLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopNavbar />

        <div
          style={{
            padding: "20px",
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;