import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, Download } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

function ScanResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();
  const { type, item, result } = location.state || {};

  if (!type || !item) {
    navigate('/');
    return null;
  }

  const getStatusIcon = () => {
    switch (result) {
      case 'safe':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'suspicious':
        return <AlertTriangle className="w-16 h-16 text-yellow-500" />;
      case 'malicious':
        return <XCircle className="w-16 h-16 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (result) {
      case 'safe':
        return 'text-green-500';
      case 'suspicious':
        return 'text-yellow-500';
      case 'malicious':
        return 'text-red-500';
      default:
        return '';
    }
  };

  const handleDownloadReport = () => {
    const report = {
      type,
      item,
      result,
      timestamp: new Date().toISOString(),
      details: `Scan report for ${type}: ${item}`
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scan-report-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-8 shadow-lg max-w-2xl mx-auto`}>
      <div className="text-center space-y-6">
        {getStatusIcon()}
        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-yellow-400' : 'text-gray-900'}`}>
          Scan Results
        </h2>
        <div className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>Type: {type === 'file' ? 'File Scan' : 'URL Scan'}</p>
          <p className="break-all">Item: {item}</p>
          <p className={`font-semibold ${getStatusColor()}`}>
            Status: {result.charAt(0).toUpperCase() + result.slice(1)}
          </p>
        </div>
        
        <button
          onClick={handleDownloadReport}
          className={`${
            isDarkMode ? 'bg-blue-900 text-yellow-400 hover:bg-blue-800' : 'bg-blue-900 text-white hover:bg-blue-800'
          } px-6 py-2 rounded-full transition-colors flex items-center gap-2 mx-auto`}
        >
          <Download className="w-5 h-5" />
          Download Report
        </button>
      </div>
    </div>
  );
}

export default ScanResults