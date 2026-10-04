import { LayoutDashboard, FolderKanban, ClipboardCheck, Bot, FileText, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import mojaXLogo from "../../assets/MoJaX.png";
export default function Sidebar() {
    const linkClass = ({ isActive }) => isActive
        ? "sidebar-link active"
        : "sidebar-link";
    return (<aside className="sidebar">

      <div className="sidebar-brand">

        <img src={mojaXLogo} alt="MoJaX" className="sidebar-logo"/>
        

      </div>

      <nav className="sidebar-nav">

        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={18}/>
          <span>Dashboard</span>
        </NavLink>

       <NavLink to="/projects" className={linkClass}>
          <FolderKanban size={18}/>
          <span>Projects</span>
        </NavLink>

        <NavLink to="/assessments" className={linkClass}>
          <ClipboardCheck size={18}/>
          <span>Assessments</span>
        </NavLink>

        <NavLink to="/agents" className={linkClass}>
          <Bot size={18}/>
          <span>Agents</span>
        </NavLink>

        <NavLink to="/reports" className={linkClass}>
          <FileText size={18}/>
          <span>Reports</span>
        </NavLink>

      </nav>

      <div className="sidebar-footer">

        <NavLink to="/settings" className={linkClass}>
          <Settings size={18}/>
          <span>Settings</span>
        </NavLink>

        <div className="sidebar-version">
          MoJaX v0.7
        </div>

      </div>

    </aside>);
}
