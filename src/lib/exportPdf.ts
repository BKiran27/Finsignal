/**
 * Export AI analysis content as a styled PDF using browser print.
 * No extra dependencies needed — uses a hidden iframe + window.print().
 */
export function downloadReportPdf(markdownHtml: string, title: string) {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '-9999px';
  iframe.style.width = '800px';
  iframe.style.height = '600px';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) return;

  doc.open();
  doc.write(`<!DOCTYPE html>
<html><head>
<title>${title} — FinSignal Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; color: #1a1a2e; padding: 40px 48px; line-height: 1.7; font-size: 11px; }
  
  /* Header */
  .report-header { border-bottom: 3px solid #c9a84c; padding-bottom: 16px; margin-bottom: 24px; }
  .report-header h1 { font-size: 20px; font-weight: 700; color: #0a0a1a; margin-bottom: 4px; }
  .report-header .subtitle { font-size: 10px; color: #666; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 1.5px; }
  .report-header .date { font-size: 9px; color: #999; margin-top: 4px; }
  
  /* Content */
  h1, h2, h3 { font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 1px; margin-top: 20px; margin-bottom: 8px; page-break-after: avoid; }
  h1 { font-size: 14px; color: #c9a84c; border-bottom: 2px solid #c9a84c33; padding-bottom: 6px; }
  h2 { font-size: 12px; color: #c9a84c; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px; }
  h3 { font-size: 11px; color: #b8860b; }
  p { margin: 6px 0; font-size: 11px; }
  strong { color: #0a0a1a; }
  
  ul, ol { padding-left: 20px; margin: 6px 0; }
  li { font-size: 10.5px; margin: 3px 0; }
  li::marker { color: #c9a84c; }
  
  table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10px; page-break-inside: avoid; }
  th { background: #f5f0e0; color: #1a1a2e; font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; padding: 6px 8px; text-align: left; border-bottom: 2px solid #c9a84c44; }
  td { padding: 5px 8px; border-bottom: 1px solid #eee; font-family: 'JetBrains Mono', monospace; }
  tr:nth-child(even) { background: #fafaf5; }
  
  blockquote { border-left: 3px solid #c9a84c; background: #faf8f0; padding: 8px 12px; margin: 10px 0; font-style: italic; color: #555; font-size: 10px; }
  code { background: #f0ede0; padding: 1px 4px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
  
  .footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #ddd; font-size: 8px; color: #999; text-align: center; font-family: 'JetBrains Mono', monospace; }
  
  @media print {
    body { padding: 20px 24px; }
    @page { margin: 15mm; size: A4; }
  }
</style>
</head><body>
<div class="report-header">
  <h1>${title}</h1>
  <div class="subtitle">FinSignal Institutional Research Report</div>
  <div class="date">Generated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
</div>
<div class="content">${markdownHtml}</div>
<div class="footer">
  FinSignal Research Terminal · This is not financial advice · Confidential
</div>
</body></html>`);
  doc.close();

  // Wait for fonts, then print
  setTimeout(() => {
    iframe.contentWindow?.print();
    setTimeout(() => document.body.removeChild(iframe), 2000);
  }, 800);
}

/**
 * Convert markdown text to basic HTML for PDF export
 */
export function markdownToHtml(md: string): string {
  let html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`(.+?)`/g, '<code>$1</code>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr/>');

  // Tables
  html = html.replace(/(\|.+\|[\r\n]+\|[-| :]+\|[\r\n]+((?:\|.+\|[\r\n]*)+))/g, (match) => {
    const rows = match.trim().split('\n').filter(r => !r.match(/^\|[-| :]+\|$/));
    if (rows.length < 1) return match;
    const headerCells = rows[0].split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
    const bodyRows = rows.slice(1).map(row => {
      const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
  });

  // Unordered lists
  html = html.replace(/(^- .+$(\n- .+$)*)/gm, (match) => {
    const items = match.split('\n').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  // Paragraphs
  html = html.split('\n\n').map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');

  return html;
}
