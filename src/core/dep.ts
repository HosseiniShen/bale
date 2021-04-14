import { read } from './parse'
import { moduleObject } from './types'

export function getDepModule (entry: string): {
  [ propName: string ]: string;
} {
  const modules = Object.create(null);
  const module = read(entry);
  const deps = module.deps.slice();

  for (let i = 0; i < deps.length; i++) {

  }

  return modules;
}
