import { STORAGE_KEYS } from '../../utils/constants'

const BACKUP_VERSION = 1

const STORAGE_VALUES = Object.values(STORAGE_KEYS)

export interface TaskoonaBackup {
  app: 'taskoona'
  version: number
  exportedAt: string
  storage: Partial<Record<(typeof STORAGE_VALUES)[number], string>>
}

export function createTaskoonaBackup(storage: Storage = localStorage): TaskoonaBackup {
  return {
    app: 'taskoona',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    storage: STORAGE_VALUES.reduce<TaskoonaBackup['storage']>((acc, key) => {
      const value = storage.getItem(key)
      if (value !== null) acc[key] = value
      return acc
    }, {}),
  }
}

export function serializeTaskoonaBackup(backup = createTaskoonaBackup()): string {
  return JSON.stringify(backup, null, 2)
}

export function downloadTaskoonaBackup(): void {
  const blob = new Blob([serializeTaskoonaBackup()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `taskoona-backup-${new Date().toISOString().slice(0, 10)}.json`
  anchor.click()
  URL.revokeObjectURL(url)
}

export function parseTaskoonaBackup(raw: string): TaskoonaBackup {
  const parsed = JSON.parse(raw) as Partial<TaskoonaBackup>

  if (parsed.app !== 'taskoona' || typeof parsed.version !== 'number' || !parsed.storage) {
    throw new Error('This does not look like a Taskoona backup.')
  }

  const entries = Object.entries(parsed.storage)
  const hasInvalidKey = entries.some(([key]) => !STORAGE_VALUES.includes(key as (typeof STORAGE_VALUES)[number]))
  const hasInvalidValue = entries.some(([, value]) => typeof value !== 'string')

  if (hasInvalidKey || hasInvalidValue) {
    throw new Error('This backup contains data Taskoona cannot safely restore.')
  }

  return parsed as TaskoonaBackup
}

export function restoreTaskoonaBackup(raw: string, storage: Storage = localStorage): TaskoonaBackup {
  const backup = parseTaskoonaBackup(raw)

  STORAGE_VALUES.forEach((key) => storage.removeItem(key))
  Object.entries(backup.storage).forEach(([key, value]) => {
    storage.setItem(key, value)
  })

  return backup
}
