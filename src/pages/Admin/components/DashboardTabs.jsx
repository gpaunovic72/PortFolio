import { BarChart3, Briefcase, Calendar } from "lucide-react";
import PropTypes from "prop-types";

export default function DashboardTabs({ activeTab, onTabChange }) {
  const tabs = [
    {
      id: "projects",
      label: "Projets",
      icon: Briefcase,
      description: "Gérer vos projets",
    },
    {
      id: "experiences",
      label: "Expériences",
      icon: Calendar,
      description: "Gérer vos expériences",
    },
    {
      id: "stats",
      label: "Statistiques",
      icon: BarChart3,
      description: "Vue d'ensemble",
    },
  ];

  return (
    <div className="dashboard-tabs">
      <div className="tabs-header">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            >
              <Icon size={20} />
              <span className="tab-label">{tab.label}</span>
              <span className="tab-description">{tab.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

DashboardTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
