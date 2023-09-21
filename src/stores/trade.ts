import { defineStore } from 'pinia'

const ID = 'tradeStore'
const VERSION = 'v0.1'
const STORAGE_KEY = 'trade'

function loadFromStorage() {
  const t = JSON.parse(window.localStorage.getItem(ID) || JSON.stringify({}))
  return t
}
function saveToStorage(t) {
  window.localStorage.setItem(ID, JSON.stringify(t))
}
function removeFromStorage() {
  window.localStorage.removeItem('user')
}

export const useTradeStore = defineStore(ID, {
  state: () => {
    const t = loadFromStorage()
    if ('version' in t && t.version === VERSION) {
      return { ...t }
    }
    removeFromStorage()
    return {}
  },
  actions: {
    reset() {
      removeFromStorage()
      Object.assign(this, loadFromStorage())
    },
  },
})
