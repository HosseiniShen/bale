import * as fs from 'fs'
import { moduleObject } from './types'

const BaleRequireFunctionBody = `
  function bale_require (id) {
    const module = { exports : {} }
    modules[id](module, module.exports, bale_require)
    return module.exports
  }
`;

/**
 * generate bundle codes 
 * @param entry 
 * @param modules 
 * @returns 
 */
export function generate (entry: string, modules: Map<string, moduleObject>): string {
  let modulesCode: string;
  for (let [ path, target ] of modules) {
    modulesCode += `
       '${ path }': (function (module, exports, bale_require) {
        ${ target.code }
       }),
    `
  }

  return `
    (function (modules) {
      ${ BaleRequireFunctionBody }
      require('${ entry }')
    })({${ modulesCode }})
  `
}

/**
 * output result codes
 * @param content 
 * @param path 
 */
export function write (content: string, path: string) {
  try {
    fs.writeFileSync(content, path)
  } catch (error) {
    throw error
  }
}
