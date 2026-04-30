import { STORAGE_KEYS } from '../../utils/constants'

const BACKUP_VERSION = 1
const STORAGE_VALUES = Object.values(STORAGE_KEYS)

type BackupApp = 'misn-ai' | 'misn-ai'

export interface MisnBackup {
  app: BackupApp
  version: number
  exportedAt: string
  storage: Partial<Record<(typeof STORAGE_VALUES)[number], string>>
}

export function createMisnBackup(storage: Storage = localStorage): MisnBackup {
  return {
    app: 'misn-ai',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    storage: STORAGE_VALUES.reduce<MisnBackup['storage']>((acc, key) => {
      const value = storage.getItem(key)
      if (value !== null) acc[key] = value
      return acc
    }, {}),
  }
}

export function serializeMisnBackup(backup = createMisnBackup()): string {
  return JSON.stringify(backup, null, 2)
}

export function downloadMisnBackup(): void {
  const blob = new Blob([serializeMisnBackup()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `misn-ai-backup-${new Date().toISOString().slice(0, 10)}.json`
  anchor.click()
  URL.revokeObjectURL(url)
}

export function parseMisnBackup(raw: string): MisnBackup {
  const parsed = JSON.parse(raw) as Partial<MisnBackup>

  const validApp = parsed.app === 'misn-ai' || parsed.app === 'misn-ai'
  if (!validApp || typeof parsed.version !== 'number' || !parsed.storage) {
    throw new Error('This does not look like a Misn AI backup.')
  }

  const entries = Object.entries(parsed.storage)
  const hasInvalidKey = entries.some(([key]) => !STORAGE_VALUES.includes(key as (typeof STORAGE_VALUES)[number]))
  const hasInvalidValue = entries.some(([, value]) => typeof value !== 'string')

  if (hasInvalidKey || hasInvalidValue) {
    throw new Error('This backup contains data Misn AI cannot safely restore.')
  }

  return parsed as MisnBackup
}

export function restoreMisnBackup(raw: string, storage: Storage = localStorage): MisnBackup {
  const backup = parseMisnBackup(raw)

  STORAGE_VALUES.forEach((key) => storage.removeItem(key))
  Object.entries(backup.storage).forEach(([key, value]) => {
    storage.setItem(key, value)
  })

  return backup
}
