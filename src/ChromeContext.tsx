import { createContext, useState, useEffect } from 'react';
import { Highlight } from './types';

interface ChromeContextValue {
  highlightsMap: Record<string, Highlight>
}

interface ChromeProviderProps {
  children: React.ReactNode;
}

export const ChromeProvider: React.FC<ChromeProviderProps> = ({ children }) => {
  const [highlightsMap, setHighlightsMap] = useState({});

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data;
      
      console.log('Got message', message);

      if (message.type === "highlights") {
        // Handle selected highlights
        const highlightsMap = message.data;
        setHighlightsMap(highlightsMap);
      }
    });
  }, []);

  return (
    <ChromeContext.Provider value={{ highlightsMap }}>
      {children}
    </ChromeContext.Provider>
  );
};

const ChromeContext = createContext<ChromeContextValue>({
  highlightsMap: {},
});

export default ChromeContext;
