import React from 'react';

export const AIResponseRenderer: React.FC<{ content: string; loading?: boolean }> = ({ content, loading }) => {
  return (
    <div className="text-sm text-t1 leading-relaxed">
      {content ? (
        <div className="prose prose-invert max-w-none text-xs sm:text-sm space-y-2">
          {content.split('\n').map((line, i) => {
            if (!line.trim()) return null;
            if (line.startsWith('##')) return <h3 key={i} className="font-bold text-brand mt-2 mb-1">{line.replace(/#+\s/, '')}</h3>;
            if (line.startsWith('#')) return <h2 key={i} className="font-bold text-lg text-brand">{line.replace(/#+\s/, '')}</h2>;
            if (line.startsWith('•') || line.startsWith('-')) return <div key={i} className="ml-3 text-t1">{line}</div>;
            if (line.match(/^\d+\./)) return <div key={i} className="ml-3 text-t1">{line}</div>;
            return <p key={i} className="text-t2">{line}</p>;
          })}
          {loading && <div className="inline-block animate-pulse">▌</div>}
        </div>
      ) : (
        <div className="text-t3 italic">No content yet...</div>
      )}
    </div>
  );
};