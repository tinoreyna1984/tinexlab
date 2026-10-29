import { readFileSync } from "node:fs";

import type { Locale } from "./i18n";

export type Project = {
  slug: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  tags: string[];
  year: string;
  repo?: string;
  site?: string;
  image: string;
};

export type ProjectTag = { slug: string; label: Record<Locale, string> };

const tagLabels: Record<string, string> = {
  angular: "Angular", java: "Java", "spring-boot": "Spring Boot", wordpress: "WordPress",
  auth0: "auth0", nextjs: "Next.js", "react-native": "React Native", mern: "MERN",
  mongodb: "MongoDB", express: "Express", nodejs: "Node.js", "redux-toolkit": "Redux Toolkit",
  react: "React", bootstrap: "Bootstrap", sass: "SASS", javascript: "JavaScript", css: "CSS",
  html: "HTML", tailwind: "Tailwind",
};

function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (char === '"' && quoted && input[i + 1] === '"') { cell += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && input[i + 1] === "\n") i += 1;
      row.push(cell); if (row.some(Boolean)) rows.push(row); row = []; cell = "";
    } else cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function required(value: string, field: string, line: number): string {
  if (!value.trim()) throw new Error(`projects.csv: campo "${field}" vacío en la fila ${line}`);
  return value.trim();
}

function loadProjects(): Project[] {
  const rows = parseCsv(readFileSync("data/projects.csv", "utf8"));
  const header = rows.shift();
  const expected = ["slug", "title_es", "title_en", "title_pt", "description_es", "description_en", "description_pt", "tags", "year", "image", "repo", "site"];
  if (!header || expected.some((field, index) => header[index] !== field)) throw new Error("projects.csv: cabecera inválida");
  return rows.map((row, index) => {
    const line = index + 2;
    if (row.length !== expected.length) throw new Error(`projects.csv: se esperaban ${expected.length} columnas en la fila ${line}`);
    const [slug, es, en, pt, descEs, descEn, descPt, rawTags, year, image, repo, site] = row;
    return {
      slug: required(slug, "slug", line), title: { es: required(es, "title_es", line), en: required(en, "title_en", line), pt: required(pt, "title_pt", line) },
      description: { es: required(descEs, "description_es", line), en: required(descEn, "description_en", line), pt: required(descPt, "description_pt", line) },
      tags: required(rawTags, "tags", line).split(";").map((tag) => required(tag, "tags", line)), year: required(year, "year", line),
      image: `/portfolio/${required(image, "image", line)}`, ...(repo.trim() ? { repo: repo.trim() } : {}), ...(site.trim() ? { site: site.trim() } : {}),
    };
  });
}

export const projects = loadProjects();
export const projectTags: ProjectTag[] = [...new Set(projects.flatMap((project) => project.tags))].map((slug) => ({
  slug, label: { es: tagLabels[slug] ?? slug, en: tagLabels[slug] ?? slug, pt: tagLabels[slug] ?? slug },
}));
