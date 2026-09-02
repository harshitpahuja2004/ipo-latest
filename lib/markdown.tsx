import React from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const toc: TocItem[] = [];
  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const text = h2Match[1].replace(/\*\*/g, "").trim();
      toc.push({ id: slugify(text), text, level: 2 });
    }
  }
  return toc;
}

export function renderMarkdown(markdown: string): React.ReactNode[] {
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableKey = 0;

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const [header, , ...body] = tableRows;
    elements.push(
      <div key={`table-${tableKey++}`} className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
            <tr>
              {header?.map((h, i) => (
                <th key={i} className="px-4 py-3 font-medium">
                  {h.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {body.map((row, rIndex) => (
              <tr key={rIndex} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                {row.map((cell, cIndex) => (
                  <td key={cIndex} className="px-4 py-2.5 text-slate-600 dark:text-slate-300">
                    {cell.trim()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Table row detection
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      inTable = true;
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Horizontal Rule
    if (line.trim() === "---") {
      elements.push(<hr key={i} className="my-8 border-slate-200 dark:border-slate-800" />);
      continue;
    }

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-8 mb-4 tracking-tight">
          {line.replace("# ", "").replace(/\*\*/g, "")}
        </h1>
      );
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      const text = line.replace("## ", "").replace(/\*\*/g, "");
      const id = slugify(text);
      elements.push(
        <h2 key={i} id={id} className="scroll-mt-24 font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mt-8 mb-3.5 tracking-tight border-b border-slate-200/60 dark:border-slate-800 pb-2">
          {text}
        </h2>
      );
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-semibold text-lg text-slate-900 dark:text-white mt-6 mb-2">
          {line.replace("### ", "").replace(/\*\*/g, "")}
        </h3>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="my-4 border-l-4 border-emerald-500 bg-emerald-500/10 p-4 rounded-r-xl text-slate-700 dark:text-slate-300 text-sm italic">
          {line.replace("> ", "")}
        </blockquote>
      );
      continue;
    }

    // List item
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      elements.push(
        <li key={i} className="ml-5 list-disc text-slate-700 dark:text-slate-300 my-1 text-sm sm:text-base leading-relaxed">
          {line.replace(/^[-*]\s+/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
        </li>
      );
      continue;
    }

    // Empty line
    if (!line.trim()) continue;

    // Regular Paragraph
    elements.push(
      <p key={i} className="my-3.5 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
      </p>
    );
  }

  if (inTable) flushTable();

  return elements;
}
