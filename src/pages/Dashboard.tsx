import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

function Dashboard() {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (type: 'file' | 'url') => {
    setIsScanning(true);
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsScanning(false);
    navigate('/scan-results', { 
      state: { 
        type,
        item: type === 'file' ? fileInput?.name : urlInput,
        result: Math.random() > 0.5 ? 'safe' : 'malicious'
      }
    });
  };

  return (
    <div className={`space-y-8 ${isDarkMode ? 'text-yellow-400' : 'text-gray-900'}`}>
      {/* File Scanner Section */}
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Upload className="w-6 h-6" />
          File Scanner
        </h2>
        
        <div className="space-y-4">
          <input
            type="file"
            onChange={(e) => setFileInput(e.target.files?.[0] || null)}
            className={`block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
              file:text-sm file:font-semibold ${
                isDarkMode 
                  ? 'file:bg-blue-900 file:text-yellow-400 hover:file:bg-blue-800' 
                  : 'file:bg-blue-100 file:text-blue-900 hover:file:bg-blue-200'
              } cursor-pointer`}
          />
          <button
            onClick={() => handleScan('file')}
            disabled={!fileInput || isScanning}
            className={`${
              isDarkMode ? 'bg-blue-900 text-yellow-400 hover:bg-blue-800' : 'bg-blue-900 text-white hover:bg-blue-800'
            } px-6 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
          >
            {isScanning ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Scanning...</>
            ) : (
              <>Scan File</>
            )}
          </button>
        </div>
      </div>

      {/* URL Scanner Section */}
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <LinkIcon className="w-6 h-6" />
          URL Scanner
        </h2>
        
        <div className="space-y-4">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter URL to scan"
            className={`w-full px-4 py-2 rounded-full ${
              isDarkMode 
                ? 'bg-black border-blue-900 text-yellow-400 placeholder-yellow-400/50' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } border focus:outline-none focus:ring-2 focus:ring-blue-900`}
          />
          <button
            onClick={() => handleScan('url')}
            disabled={!urlInput.trim() || isScanning}
            className={`${
              isDarkMode ? 'bg-blue-900 text-yellow-400 hover:bg-blue-800' : 'bg-blue-900 text-white hover:bg-blue-800'
            } px-6 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
          >
            {isScanning ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Scanning...</>
            ) : (
              <>Scan URL</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard