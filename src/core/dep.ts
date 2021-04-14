import { read } from './parse'
import { moduleObject } from './types'

/**
 * find all dependence from the entry 
 * @param entry 
 * @returns 
 */
export function getDepModule (entry: string): Map<string, moduleObject> {
  const modules: Map<string, moduleObject> = new Map();
  const deps: string[] = [ entry ];

  let dep: string;
  let subDeps: string[];
  let target: moduleObject;
  for (let i = 0; i < deps.length; i++) {
    dep = deps[i];
    target = read(dep);
    modules.set(dep, target);
    subDeps = target.deps;

    for (let j = 0; j < subDeps.length; j++) {
      if (modules.has(subDeps[j])) continue;
      deps.push(subDeps[j]);
    }
    
  }

  return modules;
}
