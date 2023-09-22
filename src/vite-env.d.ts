/// <reference types="vite/client" />

import { IpcRenderer } from 'electron'

export type PlaceOasis = 'oasis'
export type PlaceKaruForest = 'karuForest'
export type PlaceKalidaLake = 'kalidaLake'
export type PlacePeraVolcano = 'peraVolcano'

export type Place =
  | PlaceOasis
  | PlaceKaruForest
  | PlaceKalidaLake
  | PlacePeraVolcano

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}
