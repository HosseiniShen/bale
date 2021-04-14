import { getDepModule } from './core/dep'
import { generate, write } from './core/generate'
import { BaleConfig } from './core/types'

function bale (config: BaleConfig) {
  const { entry, output } = config;
  const modules = getDepModule(entry);
  const retCode = generate(entry, modules);
  write(retCode, output);
}

export default bale
 