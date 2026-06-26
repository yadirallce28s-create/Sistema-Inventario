import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/layout.css";

function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;