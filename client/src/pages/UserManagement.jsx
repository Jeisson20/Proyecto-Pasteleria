import UserTable from "../components/UsersTable.jsx";
import Sidebar from "../components/Sidebar.jsx";
import fondoPasteleria from "../assets/fondoPasteleria.png";
export default function UserManagement() {
  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${fondoPasteleria})` }}
    >
      <div className="sidebar_box">
        <Sidebar />
      </div>
      <main className="main-content">
        <UserTable />
      </main>
    </div>
  );
}
