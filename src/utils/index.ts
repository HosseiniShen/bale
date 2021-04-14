import * as path from 'path'

/**
 * get dependence file path according to main file dir
 * @param filePath 
 * @param depPath 
 * @returns 
 */
export function getDepAbsolutePath (filePath: string, depPath: string): string {
  if (path.isAbsolute(depPath)) return depPath;

  const dirname: string = path.dirname(filePath);
  return path.resolve(dirname, depPath);
}
