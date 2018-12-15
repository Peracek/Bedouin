import fs from 'fs-extra'
import { join } from 'path'
import NodeCache from 'node-cache'

type Directory = {
  dirPath: string
  contents: {
    name: string
    path: string
  }[]
}

const dirsCache = new NodeCache<Directory[]>()
const filesCache = new NodeCache<string>()

export const readDirsAt = async (root: string, force: boolean = false) => {
  if(force) {
    dirsCache.del(root)
  }
  const cachedResult = dirsCache.get(root)
  if(cachedResult) {
    return cachedResult
  }

  const contents = await fs.readdir(root)
  const result = contents
    .map(fileName => ({ path: fileName, fullPath: join(root, fileName)}))
    .filter(file => fs.lstatSync(file.fullPath).isDirectory())
    .map(dir => {
      const innerContents = fs
        .readdirSync(dir.fullPath)
        .filter(fileName => {
          const fullPath = join(dir.fullPath, fileName)
          return fs.lstatSync(fullPath).isFile()
        })
        .map(fileName => ({ name: fileName, path: join(dir.path, fileName) }))
      return { 
        dirPath: dir.path,
        contents: innerContents
      }
    })
  
    dirsCache.set(root, result)
    return result
}

export const readFileSync = (path: string, force: boolean = false) => {
  if(force) {
    filesCache.del(path)
  }
  const cachedFile = filesCache.get(path)
  if(cachedFile) {
    return cachedFile
  }

  return fs.readFileSync(path, 'utf8')
}
