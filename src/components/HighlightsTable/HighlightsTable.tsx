import React from 'react';

import { Highlight } from '../../types';

interface HighlightsTableProps {
  highlights: Highlight[];
  onHighlightRemove: (highlight: Highlight) => void;
}

export const HighlightsTable: React.FC<HighlightsTableProps> = ({ highlights, onHighlightRemove }) => {
  const handleRemoveClick = (highlight: Highlight) => {
    onHighlightRemove(highlight);
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="text-left py-2 px-4 font-semibold text-sm border-b">Text</th>
          <th className="text-left py-2 px-4 font-semibold text-sm border-b">Summary</th>
          <th className="text-left py-2 px-4 font-semibold text-sm border-b">Created at</th>
          <th className="text-left py-2 px-4 font-semibold text-sm border-b"></th>
        </tr>
      </thead>
      <tbody>
        {highlights.map((highlight) => (
          <tr key={highlight._id}>
            <td className="py-2 px-4 border-b text-sm">
              {highlight.text}
            </td>
            <td className="py-2 px-4 border-b text-sm">{highlight.summary}</td>
            <td className="py-2 px-4 border-b text-sm">{highlight.createdAt}</td>
            <td className="py-2 px-4 border-b">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleRemoveClick(highlight)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HighlightsTable;
