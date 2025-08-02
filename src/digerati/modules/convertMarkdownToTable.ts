// src/digerati/modules/convertMarkdownToTable.ts

import { Converter } from "showdown";
import {
    autoGroup,
    log,
    warn,
    devError
} from "$digerati/utils/logger";
import { eventBus } from "$digerati/events";

export interface ConvertMarkdownOptions {
    selector?: string;     // container selector holding markdown (default: 'markdown' element)
    logOutput?: boolean;   // whether to console.log resulting HTML per block
}

/**
 * Convert Markdown to HTML and enhance tables with data-labels for mobile responsiveness.
 */
export const convertMarkdownToTable = (opts: ConvertMarkdownOptions = {}): void => {
    const selector = opts.selector ?? "markdown";
    const shouldLogOutput = opts.logOutput ?? false;

    autoGroup("Convert Markdown To Table", () => {
        eventBus.emit("convertMarkdown:init", { selector });

        const converter = new Converter({
            tables: true,
            noHeaderId: true,
            headerLevelStart: 2,
            literalMidWordUnderscores: true
        });

        const markdownBlocks = Array.from(
            document.querySelectorAll<HTMLElement>(selector)
        );
        if (!markdownBlocks.length) {
            warn(`No markdown blocks found for selector "${selector}".`);
            eventBus.emit("convertMarkdown:done", { count: 0 });
            return;
        }

        markdownBlocks.forEach((markdown, index) => {
            autoGroup(`Markdown Block #${index + 1}`, () => {
                let source = markdown.textContent?.trim() ?? "";
                if (source === "") {
                    // fallback to innerHTML if textContent is empty (e.g., contains HTML)
                    source = markdown.innerHTML.trim();
                }

                let rawHtml: string;
                try {
                    rawHtml = converter.makeHtml(source);
                } catch (e) {
                    devError("Markdown conversion failed for block", index, e);
                    eventBus.emit("convertMarkdown:error", {
                        blockIndex: index,
                        error: String(e)
                    });
                    return;
                }

                const template = document.createElement("template");
                template.innerHTML = rawHtml.trim();

                const tables = Array.from(template.content.querySelectorAll<HTMLTableElement>("table"));
                tables.forEach((table) => {
                    // Determine header cells: prefer thead > th, else first row of tbody
                    let headerCells: string[] = [];
                    const theadThs = Array.from(table.querySelectorAll("thead tr th"));
                    if (theadThs.length) {
                        headerCells = theadThs.map((th) => th.textContent?.trim() || "");
                    } else {
                        const firstBodyRow = table.querySelector("tbody tr");
                        if (firstBodyRow) {
                            const cells = Array.from(firstBodyRow.querySelectorAll("td"));
                            headerCells = cells.map((td) => td.textContent?.trim() || "");
                        }
                    }

                    const rows = Array.from(table.querySelectorAll("tbody tr"));
                    rows.forEach((row) => {
                        const cells = Array.from(row.querySelectorAll("td"));
                        cells.forEach((cell, i) => {
                            const label = headerCells[i] || "";
                            if (label) {
                                cell.setAttribute("data-label", label);
                            }
                        });
                    });

                    table.classList.add("responsive-table");
                    eventBus.emit("convertMarkdown:enhancedTable", {
                        blockIndex: index,
                        headerCount: headerCells.length
                    });
                });

                if (shouldLogOutput) {
                    log(`Converted Markdown block #${index + 1}:`, template.innerHTML.trim());
                }

                // Replace the original <markdown> element with the rendered content
                markdown.replaceWith(template.content.cloneNode(true));
                eventBus.emit("convertMarkdown:blockConverted", {
                    blockIndex: index,
                    originalSelector: selector
                });
            });
        });

        eventBus.emit("convertMarkdown:done", { count: markdownBlocks.length });
    });
};
