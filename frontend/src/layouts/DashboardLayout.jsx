import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="mainContent">

        <Navbar />

        <div className="pageContent">
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;