import * as fs from 'fs';
import * as babylon from 'babylon';
import traverse from 'babel-traverse';
import { transformFromAst } from 'babel-core';
import { getDepAbsolutePath } from '../utils'
import { moduleObject } from './types'

/**
 * transform code to AST
 * @param filePath 
 * @returns 
 */
export function read (filePath: string): moduleObject {
  if (!filePath) {
    throw new Error('No entry file path')
  }

  const deps: string[] = []
  const content: string = fs.readFileSync(filePath, 'utf-8') 
  const ast = babylon.parse(content, { sourceType: 'module' })
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      deps.push(getDepAbsolutePath(filePath, node.source.value))
    }
  })

  const { code } = transformFromAst(ast, null, {
    presets: [ 'env' ]
  })

  return {
    filePath,
    deps,
    code
  }
}
