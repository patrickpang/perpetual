export function getSettings() {
  return JSON.parse(window.localStorage.getItem('perpetual/settings')) || {}
}

export function saveSettings(settings) {
  window.localStorage.setItem('perpetual/settings', JSON.stringify(settings))
}
