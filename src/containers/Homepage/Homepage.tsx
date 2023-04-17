import { useContext, useMemo } from 'react';

import { HighlightsTable } from '../../components/HighlightsTable/HighlightsTable';
import ChromeContext from '../../ChromeContext';

export const Homepage: React.FC = () => {
  const { highlightsMap } = useContext(ChromeContext);

  const highlights = useMemo(() => Object.values(highlightsMap), [highlightsMap]);

  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">ChatGPT Chrome Plugin</h1>
      <p className="text-lg mb-4">
        Select some text on the page to create a highlight.
      </p>
      <HighlightsTable highlights={highlights} onHighlightRemove={() => {}} />
    </div>
  );
}
