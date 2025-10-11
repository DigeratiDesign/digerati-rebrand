// src/digerati/modules/convertMarkdownToTable.ts

import { Converter } from 'showdown';

import { eventBus } from '$digerati/events';
import { autoGroup, devError, log, warn } from '$digerati/utils/logger';

export interface ConvertMarkdownOptions {
  selector?: string; // container selector holding markdown (default: 'markdown' element)
  logOutput?: boolean; // whether to console.log resulting HTML per block
}

const SCROLL_WRAP_CLASS = 'table-scroll';
const RESPONSIVE_TABLE_CLASS = 'responsive-table';

/**
 * Convert Markdown to HTML and enhance tables with data-labels for mobile responsiveness,
 * wrapping them in a horizontally-scrollable container for overflow handling.
 */
export const convertMarkdownToTable = (opts: ConvertMarkdownOptions = {}): void => {
  const selector = opts.selector ?? 'markdown';
  const shouldLogOutput = opts.logOutput ?? false;

  autoGroup('Convert Markdown To Table', () => {
    eventBus.emit('convertMarkdown:init', { selector });

    const converter = new Converter({
      tables: true,
      noHeaderId: true,
      headerLevelStart: 2,
      literalMidWordUnderscores: true,
    });

    const markdownBlocks = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!markdownBlocks.length) {
      warn(`No markdown blocks found for selector "${selector}".`);
      eventBus.emit('convertMarkdown:done', { count: 0 });
      return;
    }

    markdownBlocks.forEach((markdown, index) => {
      autoGroup(`Markdown Block #${index + 1}`, () => {
        let source = markdown.textContent?.trim() ?? '';
        if (source === '') {
          // fallback to innerHTML if textContent is empty (e.g., contains HTML)
          source = markdown.innerHTML.trim();
        }

        let rawHtml: string;
        try {
          rawHtml = converter.makeHtml(source);
        } catch (e) {
          devError('Markdown conversion failed for block', index, e);
          eventBus.emit('convertMarkdown:error', {
            blockIndex: index,
            error: String(e),
          });
          return;
        }

        const template = document.createElement('template');
        template.innerHTML = rawHtml.trim();

        const tables = Array.from(template.content.querySelectorAll<HTMLTableElement>('table'));

        tables.forEach((table, tIndex) => {
          // Determine header cells: prefer thead > th, else first row of tbody
          let headerCells: string[] = [];
          const theadThs = Array.from(table.querySelectorAll('thead tr th'));
          if (theadThs.length) {
            headerCells = theadThs.map((th) => th.textContent?.trim() || '');
          } else {
            const firstBodyRow = table.querySelector('tbody tr');
            if (firstBodyRow) {
              const cells = Array.from(firstBodyRow.querySelectorAll('td'));
              headerCells = cells.map((td) => td.textContent?.trim() || '');
            }
          }

          // Add data-labels to each body cell for stacked layout on small screens
          const rows = Array.from(table.querySelectorAll('tbody tr'));
          rows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll('td'));
            cells.forEach((cell, i) => {
              const label = headerCells[i] || '';
              if (label) cell.setAttribute('data-label', label);
            });
          });

          // Ensure our table class is present
          table.classList.add(RESPONSIVE_TABLE_CLASS);

          // Create a scroll wrapper and move the table inside
          const wrapper = document.createElement('div');
          wrapper.className = SCROLL_WRAP_CLASS;

          // Accessibility: derive a readable label from <caption>, if present
          const captionText =
            table.querySelector('caption')?.textContent?.trim() || 'Scrollable table';
          wrapper.setAttribute('role', 'region');
          wrapper.setAttribute('aria-label', captionText);
          wrapper.setAttribute('tabindex', '0');

          // Replace table with wrapper->table in the template DOM
          table.replaceWith(wrapper);
          wrapper.appendChild(table);

          eventBus.emit('convertMarkdown:enhancedTable', {
            blockIndex: index,
            tableIndex: tIndex,
            headerCount: headerCells.length,
            wrapped: true,
            wrapperClass: SCROLL_WRAP_CLASS,
          });
        });

        if (shouldLogOutput) {
          log(`Converted Markdown block #${index + 1}:`, template.innerHTML.trim());
        }

        // Replace the original <markdown> element with the rendered content
        markdown.replaceWith(template.content.cloneNode(true));
        eventBus.emit('convertMarkdown:blockConverted', {
          blockIndex: index,
          originalSelector: selector,
        });
      });
    });

    eventBus.emit('convertMarkdown:done', { count: markdownBlocks.length });
  });
};
