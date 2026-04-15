import type { CloudAdapter, CloudStatus } from './types'

const localOnlyStatus: CloudStatus = {
  enabled: false,
  label: 'Local-only',
  reason: 'Cloud sync, hosted AI, accounts, billing, and teams belong in taskoona-cloud.',
}

export const noopCloudAdapter: CloudAdapter = {
  status() {
    return localOnlyStatus
  },
  async syncNow() {
    return localOnlyStatus
  },
}
