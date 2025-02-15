// global.d.ts
declare module "@/assets/data.json" {
  import { LLRecord } from './src/types';
  const value: LLRecord[];
  export default value;
}

declare module "@/assets/kana-to-romaji.json" {
  import { KanaToRomajiMap } from './src/types';
  const value: KanaToRomajiMap;
  export default value;
}

declare module "@/assets/data-additional.json" {
  import { LLRecordAdditional } from './src/types';
  const value: LLRecordAdditional[];
  export default value;
}
