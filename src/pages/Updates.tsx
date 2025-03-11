import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, CheckCircle } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface UpdateInfo {
  currentVersion: string;
  latestVersion: string;
  hasUpdate: boolean;
}

function Updates() {
  const { isDarkMode } = useThemeStore();
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo>({
    currentVersion: '1.0.0',
    latestVersion: '1.0.1',
    hasUpdate: true
  });
  const [checking, setChecking] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const checkForUpdates = async () => {
    setChecking(true);
    // Simulate checking for updates
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUpdateInfo({
      currentVersion: '1.0.0',
      latestVersion: '1.0.1',
      hasUpdate: true
    });
    setChecking(false);
  };

  const downloadUpdate = async () => {
    setDownloading(true);
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDownloading(false);
    setUpdateInfo(prev => ({ ...prev, hasUpdate: false, currentVersion: prev.latestVersion }));
  };

  useEffect(() => {
    checkForUpdates();
  }, []);

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-8 shadow-lg max-w-2xl mx-auto`}>
      <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-yellow-400' : 'text-gray-900'}`}>
        Software Updates
      </h2>

      <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <div className="space-y-2">
          <p>Current Version: {updateInfo.currentVersion}</p>
          <p>Latest Version: {updateInfo.latestVersion}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={checkForUpdates}
            disabled={checking}
            className={`${
              isDarkMode ? 'bg-blue-900 text-yellow-400 hover:bg-blue-800' : 'bg-blue-900 text-white hover:bg-blue-800'
            } px-6 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
          >
            <RefreshCw className={`w-5 h-5 ${checking ? 'animate-spin' : ''}`} />
            Check for Updates
          </button>

          {updateInfo.hasUpdate && (
            <button
              onClick={downloadUpdate}
              disabled={downloading}
              className={`${
                isDarkMode ? 'bg-green-700 text-yellow-400 hover:bg-green-600' : 'bg-green-600 text-white hover:bg-green-700'
              } px-6 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
            >
              {downloading ? (
                <><RefreshCw className="w-5 h-5 animate-spin" /> Downloading...</>
              ) : (
                <><Download className="w-5 h-5" /> Download Update</>
              )}
            </button>
          )}
        </div>

        {!updateInfo.hasUpdate && (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle className="w-5 h-5" />
            <span>Your software is up to date!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Updates