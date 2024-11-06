import {Link} from 'react-router-dom'

import "./NavigationRail.css";

export default function Navigation() {
  const menuItems = [
    { id: 1, label: "Servers", path: "/" },
    { id: 2, label: "Logs", path: "/logs" },
    { id: 3, label: "Config", path: "/config" },
  ];
  
  return (
    <div className="navigationRail">
      <ul>
        {menuItems.map((item) => (
          <li className="menuItem" key={item.id}>
            <Link to={item.path} ><span className="menuLabel">{item.label}</span></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
