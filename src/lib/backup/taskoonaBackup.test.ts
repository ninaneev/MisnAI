import { describe, expect, it } from 'vitest'
import { STORAGE_KEYS } from '../../utils/constants'
import { createTaskoonaBackup, parseTaskoonaBackup, restoreTaskoonaBackup } from './taskoonaBackup'

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
  }
}

describe('Taskoona backup', () => {
  it('exports only Taskoona storage keys', () => {
    const storage = createMemoryStorage()
    storage.setItem(STORAGE_KEYS.USER_PROFILE, '{"state":{"profile":{"name":"Alex"}}}')
    storage.setItem('unrelated:key', 'ignore me')

    const backup = createTaskoonaBackup(storage)

    expect(backup.app).toBe('taskoona')
    expect(backup.storage[STORAGE_KEYS.USER_PROFILE]).toContain('Alex')
    expect(backup.storage).not.toHaveProperty('unrelated:key')
  })

  it('rejects non-Taskoona backups', () => {
    expect(() => parseTaskoonaBackup('{"app":"other","version":1,"storage":{}}')).toThrow(/Taskoona/)
  })

  it('restores valid backup data', () => {
    const storage = createMemoryStorage()
    const raw = JSON.stringify({
      app: 'taskoona',
      version: 1,
      exportedAt: new Date().toISOString(),
      storage: {
        [STORAGE_KEYS.USER_PROFILE]: '{"state":{"profile":{"name":"Nina"}}}',
      },
    })

    restoreTaskoonaBackup(raw, storage)

    expect(storage.getItem(STORAGE_KEYS.USER_PROFILE)).toContain('Nina')
  })
})
