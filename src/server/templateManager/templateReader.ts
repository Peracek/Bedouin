

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
        paramsName: paramsFile && paramsFile.name,
        checksum: dir.checksum
      }
    })
    .filter(x => x !== undefined)
  return templateDirs as TemplateDir[]
}

export const getTemplate = async (options: {dirPath?: string, checksum?: string}) => {
  const { dirPath, checksum } = options
  
  const dirs = await getTemplateDirs()
  let dir: TemplateDir | undefined
  if(dirPath) {
    dir = dirs.find(d => d.dirPath === dirPath)
  } else {
    dir = dirs.find(d => d.checksum === checksum)
  }

  if(!dir) {
    throw 'TODO: direcotry not found'
  }

  const template = new TemplateDefinition(dir.dirPath, dir.checksum, dir.templateName, dir.paramsName)
  return template
}

