import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
  loading?: boolean;
}

export const AIResponseRenderer: React.FC<Props> = ({ content, loading }) => {
  return (
    <div className="ai-response-container">
      <div className="prose prose-invert prose-sm max-w-none
        prose-headings:text-brand prose-headings:font-mono prose-headings:uppercase prose-headings:tracking-wider prose-headings:text-[11px] prose-headings:font-bold prose-headings:mt-4 prose-headings:mb-2 prose-headings:border-b prose-headings:border-b0 prose-headings:pb-1.5
        prose-h1:text-[13px] prose-h1:text-brand prose-h1:border-b-2 prose-h1:border-brand/20
        prose-h2:text-[12px] prose-h2:text-brand
        prose-h3:text-[11px] prose-h3:text-fs-gold
        prose-p:text-[12px] prose-p:text-t1 prose-p:leading-[1.8] prose-p:my-1.5
        prose-strong:text-t0 prose-strong:font-bold
        prose-em:text-t2 prose-em:italic
        prose-ul:my-1.5 prose-ul:pl-4
        prose-ol:my-1.5 prose-ol:pl-4
        prose-li:text-[11.5px] prose-li:text-t1 prose-li:leading-[1.7] prose-li:my-0.5
        prose-li:marker:text-brand
        prose-code:text-brand prose-code:bg-brand-dim prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[10.5px] prose-code:font-mono
        prose-blockquote:border-l-2 prose-blockquote:border-brand prose-blockquote:bg-brand-dim prose-blockquote:rounded-r-lg prose-blockquote:px-3 prose-blockquote:py-2 prose-blockquote:my-2
        prose-table:text-[10.5px]
        prose-th:text-t3 prose-th:font-mono prose-th:uppercase prose-th:tracking-wider prose-th:text-[9px] prose-th:px-2 prose-th:py-1.5 prose-th:border-b prose-th:border-b1
        prose-td:px-2 prose-td:py-1.5 prose-td:text-t1 prose-td:font-mono prose-td:border-b prose-td:border-b0
      ">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <div className="flex items-center gap-2 mt-5 mb-2 pb-2 border-b-2 border-brand/20">
                <div className="w-1 h-4 bg-brand rounded-full" />
                <h1 className="text-[13px] font-mono font-bold uppercase tracking-wider text-brand m-0">{children}</h1>
              </div>
            ),
            h2: ({ children }) => (
              <div className="flex items-center gap-2 mt-4 mb-2 pb-1.5 border-b border-b0">
                <div className="w-0.5 h-3.5 bg-brand/60 rounded-full" />
                <h2 className="text-[12px] font-mono font-bold uppercase tracking-wider text-brand m-0">{children}</h2>
              </div>
            ),
            h3: ({ children }) => (
              <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-fs-gold mt-3 mb-1.5">{children}</h3>
            ),
            strong: ({ children }) => {
              const text = String(children);
              // Detect inline labels like "BUY", "SELL", "HOLD"
              if (/^(BUY|STRONG BUY)$/i.test(text)) return <span className="px-1.5 py-0.5 rounded bg-fs-green-dim text-fs-green text-[10px] font-bold font-mono">{text}</span>;
              if (/^(SELL|STRONG SELL)$/i.test(text)) return <span className="px-1.5 py-0.5 rounded bg-fs-red-dim text-fs-red text-[10px] font-bold font-mono">{text}</span>;
              if (/^(HOLD|NEUTRAL)$/i.test(text)) return <span className="px-1.5 py-0.5 rounded bg-fs-gold-dim text-fs-gold text-[10px] font-bold font-mono">{text}</span>;
              // Detect scores like "85/100", "A", "8/10"
              if (/^\d+\/\d+$/.test(text) || /^[A-F][+-]?$/.test(text)) return <span className="font-mono font-bold text-brand">{text}</span>;
              return <strong className="text-t0 font-bold">{children}</strong>;
            },
            table: ({ children }) => (
              <div className="my-3 surface-3 border border-b1 rounded-xl overflow-hidden">
                <table className="w-full text-[10.5px]">{children}</table>
              </div>
            ),
            blockquote: ({ children }) => (
              <div className="border-l-2 border-brand bg-brand-dim rounded-r-lg px-3 py-2.5 my-3 text-[11.5px] text-t1 italic">
                {children}
              </div>
            ),
            ul: ({ children }) => (
              <ul className="my-1.5 pl-0 list-none flex flex-col gap-1">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="flex items-start gap-2 text-[11.5px] text-t1 leading-[1.7]">
                <span className="text-brand text-[8px] mt-1.5 flex-shrink-0">◆</span>
                <span>{children}</span>
              </li>
            ),
            p: ({ children }) => {
              const text = String(children);
              // Detect disclaimer
              if (/not financial advice/i.test(text)) {
                return <p className="text-[10px] text-t3 italic mt-4 pt-2 border-t border-b0 text-center">{children}</p>;
              }
              return <p className="text-[12px] text-t1 leading-[1.8] my-1.5">{children}</p>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
      {loading && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" />
            <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce [animation-delay:0.15s]" />
            <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
          <span className="text-[9px] text-t3 font-mono">analyzing...</span>
        </div>
      )}
    </div>
  );
};
