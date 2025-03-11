import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, Settings as SettingsIcon } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import ScanResults from './pages/ScanResults';
import Updates from './pages/Updates';
import Settings from './pages/Settings';
import { useThemeStore } from './store/themeStore';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        {/* Navigation */}
        <nav className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-blue-900' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-2">
                  <Shield className={`w-8 h-8 ${isDarkMode ? 'text-yellow-400' : 'text-blue-900'}`} />
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-blue-900'}`}>
                    Antivirus Scanner
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  to="/updates" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isDarkMode 
                      ? 'text-yellow-400 hover:bg-gray-800' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Updates
                </Link>
                <Link 
                  to="/settings" 
                  className={`p-2 rounded-full ${
                    isDarkMode 
                      ? 'text-yellow-400 hover:bg-gray-800' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <SettingsIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scan-results" element={<ScanResults />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;