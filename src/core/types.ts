export interface moduleObject {
  filePath: string;
  deps: string[];
  code: string;
}

export interface BaleConfig {
  entry: string;
  output: string;
}
