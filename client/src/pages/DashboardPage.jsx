import { FaBoxOpen, FaClipboardList, FaUserFriends } from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";

export default function DashboardPage() {
  const cards = [
    {
      title: "Productos",
      description: "Gestionar inventario",
      icon: <FaBoxOpen />,
      link: "/products",
    },
    {
      title: "Materia Prima",
      description: "Administrar stock",
      icon: <GiMaterialsScience />,
      link: "/rawMaterial",
    },
    {
      title: "Pedidos",
      description: "Ver y procesar órdenes",
      icon: <FaClipboardList />,
      link: "/orders",
    },
    {
      title: "Clientes",
      description: "Administrar clientes",
      icon: <FaUserFriends />,
      link: "/clients",
    },
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">DASHBOARD</h2>
      <p className="dashboard-p">
        Bienvenido, aquí puedes gestionar tus recursos
      </p>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <a href={card.link} key={card.title} className="dashboard-card">
            <div className="icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
