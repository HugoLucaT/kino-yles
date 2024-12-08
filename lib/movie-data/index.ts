import { XMLParser } from "fast-xml-parser"

export function XML2JSONFromURL<T extends object>(url: string): Promise<T> {
  return fetch(url, {
    method: "GET",
    headers: { "Accept": "application/xml" },
  })
    .then(response => response.text())
    .then(data => {
      const parser = new XMLParser();
      return parser.parse(data);
    });
}

export function JSONFromURL<T extends object>(url: string): Promise<T> {
  return fetch(url, {
    method: "GET",
    cache: "no-store"
  })
    .then(response => response.json());
}
