declare module "template-utils" {
  export function parseConfig(raw: string): any[]
  export function renderTemplate(templateSpec: string, params: {[key: string]: any}): string
}