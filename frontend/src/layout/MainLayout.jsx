import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "20px",
            background: "#f4f6f9",
            minHeight: "100vh",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;