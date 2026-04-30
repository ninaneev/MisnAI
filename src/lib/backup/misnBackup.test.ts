import { describe, expect, it } from 'vitest'
import { STORAGE_KEYS } from '../../utils/constants'
import { createMisnBackup, parseMisnBackup, restoreMisnBackup } from './misnBackup'

function createMemoryStorage(): Storage {
  const data = new Map<string, string>()

  return {
    get length() {
      return data.size
    },
    clear() {
      data.clear()
    },
    getItem(key) {
      return data.get(key) ?? null
    },
    key(index) {
      return Array.from(data.keys())[index] ?? null
    },
    removeItem(key) {
      data.delete(key)
    },
    setItem(key, value) {
      data.set(key, value)
    },
  } as Storage
}

describe('Misn AI backup', () => {
  it('exports only app storage keys', () => {
    const storage = createMemoryStorage()
    storage.setItem(STORAGE_KEYS.USER_PROFILE, '{"state":{"profile":{"name":"Alex"}}}')
    storage.setItem(STORAGE_KEYS.DAILY_WORK, '{"state":{"notes":{"today:habit:step":"Draft"}}}')
    storage.setItem('unrelated:key', 'ignore me')

    const backup = createMisnBackup(storage)

    expect(backup.app).toBe('misn-ai')
    expect(backup.storage[STORAGE_KEYS.USER_PROFILE]).toContain('Alex')
    expect(backup.storage[STORAGE_KEYS.DAILY_WORK]).toContain('Draft')
    expect(backup.storage).not.toHaveProperty('unrelated:key')
  })

  it('rejects unrelated backups', () => {
    expect(() => parseMisnBackup('{"app":"other","version":1,"storage":{}}')).toThrow(/Misn AI/)
  })

  it('restores valid legacy Misn AI backup data', () => {
    const storage = createMemoryStorage()
    const raw = JSON.stringify({
      app: 'misn-ai',
      version: 1,
      exportedAt: new Date().toISOString(),
      storage: {
        [STORAGE_KEYS.USER_PROFILE]: '{"state":{"profile":{"name":"Nina"}}}',
      },
    })

    restoreMisnBackup(raw, storage)

    expect(storage.getItem(STORAGE_KEYS.USER_PROFILE)).toContain('Nina')
  })
})
