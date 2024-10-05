// src/components/Dashboard.js
import React, { useState } from 'react';
import ProfilePage from './ProfilePage';
import ServicePage from './ServicePage';
import AnalyticsPage from './AnalyticsPage';
import QASection from './QASection';
import FAQSection from './FAQSection';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'Profile':
        return <ProfilePage />;
      case 'Service':
        return <ServicePage />;
      case 'Analytics':
        return <AnalyticsPage />;
      case 'Q&A':
        return <QASection />;
      case 'FAQ':
        return <FAQSection />;
      default:
        return <ProfilePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-300 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4">Admin Dashboard</h2>
        <nav className="flex-1">
          <ul>
            <li>
              <button
                onClick={() => setActiveSection('Profile')}
                className={`block p-4 w-full text-left ${
                  activeSection === 'Profile' ? 'bg-blue-400' : 'bg-blue-300'
                }`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('Service')}
                className={`block p-4 w-full text-left ${
                  activeSection === 'Service' ? 'bg-blue-400' : 'bg-blue-300'
                }`}
              >
                Service/Activity
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('Analytics')}
                className={`block p-4 w-full text-left ${
                  activeSection === 'Analytics' ? 'bg-blue-400' : 'bg-blue-300'
                }`}
              >
                Analytics
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('Q&A')}
                className={`block p-4 w-full text-left ${
                  activeSection === 'Q&A' ? 'bg-blue-400' : 'bg-blue-300'
                }`}
              >
                Q&A Management
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('FAQ')}
                className={`block p-4 w-full text-left ${
                  activeSection === 'FAQ' ? 'bg-blue-400' : 'bg-blue-300'
                }`}
              >
                FAQ Management
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;
