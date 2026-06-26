import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/layout.css";

function MainLayout({ children }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;