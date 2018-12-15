

import config from '../../../config.json'
import TemplateDir from '@shared/types/TemplateDir'
import { readDirsAt } from './fileBrowser'

const root = config.templateRootDirectory

const templateExtension = /\.nomad$/
const paramsExtension = /\.params$/


export const getTemplateDirs = async () => {
  const dirs = await readDirsAt(root)
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



