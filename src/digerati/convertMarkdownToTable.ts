import { Converter } from 'showdown';

/**
 * Convert Markdown to HTML and enhance tables with data-labels for mobile responsiveness.
 * Log the resulting HTML to the console for inspection.
 * 
 * @author <cabal@digerati.design>
 */
export const convertMarkdownToTable = () => {
    const converter = new Converter({
        tables: true,
        noHeaderId: true,
        headerLevelStart: 2,
        literalMidWordUnderscores: true
    });
    const markdownBlocks = document.querySelectorAll('markdown');
    if (!markdownBlocks.length) {
        return;
    }
    markdownBlocks.forEach((markdown, index) => {
        const rawHtml = converter.makeHtml(markdown.innerHTML);
        const template = document.createElement('template');
        template.innerHTML = rawHtml.trim();
        const tables = template.content.querySelectorAll('table');
        tables.forEach((table) => {
            const headerCells = Array.from(table.querySelectorAll('thead tr th')).map(th =>
                th.textContent?.trim() || ''
            );
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach((row) => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, i) => {
                    const label = headerCells[i] || '';
                    cell.setAttribute('data-label', label);
                });
            });
            table.classList.add('responsive-table');
        });
        // 🔍 Log the enhanced HTML
        console.log(`Converted Markdown block #${index + 1}:\n`, template.innerHTML.trim());
        // Replace <markdown> with final processed HTML
        markdown.outerHTML = template.innerHTML;
    });
};
