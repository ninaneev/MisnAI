export interface CloudStatus {
  enabled: boolean
  label: string
  reason: string
}

export interface CloudAdapter {
  status: () => CloudStatus
  syncNow: () => Promise<CloudStatus>
}
