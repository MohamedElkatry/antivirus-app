import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

function Settings() {
  const { isDarkMode, language, autoUpdate, toggleTheme, setLanguage, toggleAutoUpdate } = useThemeStore();

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-8 shadow-lg max-w-2xl mx-auto`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-yellow-400' : 'text-gray-900'}`}>
        Settings
      </h2>

      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="font-medium">Theme</p>
            <p className="text-sm">Switch between dark and light mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDarkMode 
                ? 'bg-blue-900 text-yellow-400 hover:bg-blue-800' 
                : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between">
          <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="font-medium">Language</p>
            <p className="text-sm">Choose your preferred language</p>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
              className={`${
                isDarkMode 
                  ? 'bg-blue-900 text-yellow-400 border-blue-800' 
                  : 'bg-blue-100 text-blue-900 border-blue-200'
              } rounded-md border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-900`}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>

        {/* Auto Update Toggle */}
        <div className="flex items-center justify-between">
          <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="font-medium">Automatic Updates</p>
            <p className="text-sm">Allow automatic software updates</p>
          </div>
          <button
            onClick={toggleAutoUpdate}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
              autoUpdate 
                ? (isDarkMode ? 'bg-blue-900' : 'bg-blue-600') 
                : (isDarkMode ? 'bg-gray-700' : 'bg-gray-300')
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                autoUpdate ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings