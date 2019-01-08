import fs from 'fs-extra'
import crypto from 'crypto'
import { join } from 'path'
import NodeCache from 'node-cache'

import config from '../../../config.json'
const rootDirPath = process.env.TEMPLATES_DIR || config.templateRootDirectory // FIXME: nasty config workaround for testing purposes

type Directory = {
  dirPath: string
  contents: {
    name: string
    path: string
  }[]
  checksum: string
}

const dirsCache = new NodeCache<Directory[]>()
const filesCache = new NodeCache<string>()

export const readDirsAtRoot = async (force: boolean = false) => {
  if(force) {
    dirsCache.del(rootDirPath)
  }
  const cachedResult = dirsCache.get(rootDirPath)
  if(cachedResult) {
    return cachedResult
  }

  const contents = await fs.readdir(rootDirPath)
  const result = contents
    .map(fileName => ({ path: fileName, fullPath: join(rootDirPath, fileName)}))
    .filter(file => fs.lstatSync(file.fullPath).isDirectory())
    .map(dir => {
      const innerContents = fs
        .readdirSync(dir.fullPath)
        .filter(fileName => {
          const fullPath = join(dir.fullPath, fileName)
          return fs.lstatSync(fullPath).isFile()
        })
        .map(fileName => ({ name: fileName, path: join(dir.path, fileName) }))
      
      const hash = crypto.createHash('md5')
      innerContents.forEach(({ path }) => {
        hash.update(readFileSync(path))
      })

      return { 
        dirPath: dir.path,
        contents: innerContents,
        checksum: hash.digest('hex')
      }
    })
  
    dirsCache.set(rootDirPath, result)
    return result
}

export const readFileSync = (path: string, force: boolean = false) => {
  const fullPath = join(rootDirPath, path)

  if(force) {
    filesCache.del(fullPath)
  }
  const cachedFile = filesCache.get(fullPath)
  if(cachedFile) {
    return cachedFile
  }

  return fs.readFileSync(fullPath, 'utf8')
}
