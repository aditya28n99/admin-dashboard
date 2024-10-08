import React, { useState } from 'react';
import Sidebar from '../../components/Navigations/Sidebar';
import ModelLibrary from '../../components/DashboardComponents/ModelLibrary/ModelLibrary';
import LabelData from '../../components/DashboardComponents/LabelData/LabelData';
import Model from '../../components/DashboardComponents/Model/Model';
import Test from '../../components/DashboardComponents/Test/Test';
import Settings from '../../components/DashboardComponents/Settings/Settings';
import Support from '../../components/DashboardComponents/Support/Support';
import Navbar from '../../components/Navigations/Navbar';

export default function DashboardScreen() {
  //setting up a component state for the screen from sidebar
  const [currentView, setCurrentView] = useState('ModelLibrary');

  // from this switch cases we can make the component routing insted of react router. 
  const renderView = () => {
    switch (currentView) {
      case 'ModelLibrary':
        return <ModelLibrary />;
      case 'LabelData':
        return <LabelData />;
      case 'Model':
        return <Model />;
      case 'Test':
        return <Test />;
      case 'Settings':
        return <Settings />;
      case 'Support':
        return <Support />;
      default:
        return <ModelLibrary />;
    }
  };

const [sidebarOpen, setSidebarOpen] = useState(false);
  
return (
  <div>
    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} setCurrentView={setCurrentView} currentView={currentView}/>
    <div className="lg:pl-72">
      <Navbar onSidebarToggle={() => setSidebarOpen(true)} />
      {/* Main content */}
      <div className="flex-grow overflow-auto p-6">
          {renderView()}
        </div>
    </div>
  </div>

);
};
