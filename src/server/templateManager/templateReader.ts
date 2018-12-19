

import { TemplateDir } from '@shared/types/TemplateDir'
import { readDirsAtRoot } from './fileBrowser'
import TemplateDefinition from './TemplateDefinition'

const templateExtension = /\.nomad$/
const paramsExtension = /\.tf$/


export const getTemplateDirs = async () => {
  const dirs = await readDirsAtRoot()
  const templateDirs = dirs
    .map(dir => {
      const templateFile = dir.contents.find(file => templateExtension.test(file.name))
      const paramsFile = dir.contents.find(file => paramsExtension.test(file.name))
      if(!templateFile) return

      return { 
        dirPath: dir.dirPath,
        templateName: templateFile.name, 
        paramsName: paramsFile && paramsFile.name }
    })
    .filter(x => x !== undefined)
  return templateDirs as TemplateDir[]
}

export const getTemplate = async (dirPath: string) => {
  const dirs = await getTemplateDirs()
  const dir = dirs.find(d => d.dirPath === dirPath)

  if(!dir) {
    throw 'TODO: direcotry not found'
  }

  const template = new TemplateDefinition(dir.dirPath, dir.templateName, dir.paramsName)
  return template
}

