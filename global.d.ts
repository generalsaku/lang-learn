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

declare module "@/assets/kana-to-romaji-hepburn-modified.json" {
  import { KanaToRomajiMap } from './src/types';
  const value: KanaToRomajiMap;
  export default value;
}


declare module "@/assets/data-additional.json" {
  import { LLRecordAdditional } from './src/types';
  const value: LLRecordAdditional[];
  export default value;
}

declare module "@/assets/particles.json" {
  import { LLRecordParticle } from './src/types';
  const value: LLRecordParticle[];
  export default value;
}

declare module "@/assets/meanings.json" {
  import { LLMeaning } from './src/types';
  const value: LLMeaning[];
  export default value;
}
