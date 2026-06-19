import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;