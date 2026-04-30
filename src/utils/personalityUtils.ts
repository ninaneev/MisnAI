import { personalityAdaptations } from '../data/personalityMaps'
import type { MBTIType, PersonalityAdaptation } from '../types/personality'

export function getAdaptation(mbti: MBTIType | null): PersonalityAdaptation | null {
  if (!mbti) return null
  return personalityAdaptations.find((a) => a.mbti === mbti) ?? null
}
