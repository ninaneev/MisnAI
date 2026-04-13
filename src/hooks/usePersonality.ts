import { useUserStore } from '../stores/userStore'
import { getAdaptation } from '../utils/personalityUtils'

export function usePersonality() {
  const mbti = useUserStore((s) => s.profile.mbti)
  const adaptation = getAdaptation(mbti)
  return { mbti, adaptation }
}
