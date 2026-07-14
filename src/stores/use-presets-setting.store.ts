import { create } from "zustand"

export type PresetSetting = {
  id: string
  label: string
  slippage: string
  gas: string
  autoApproval: boolean
}

type PresetsState = {
  presets: PresetSetting[]
  activePresetId: string | null
  setActivePreset: (id: string | null) => void
  updatePreset: (id: string, next: Partial<PresetSetting>) => void
  resetPresets: () => void
  isSettingsOpen: boolean
  setSettingsOpen: (open: boolean) => void
}

const DEFAULT_PRESETS: PresetSetting[] = [
  { id: "p1", label: "P1", slippage: "0.5%", gas: "fast", autoApproval: true },
  { id: "p2", label: "P2", slippage: "1%", gas: "standard", autoApproval: false },
  { id: "p3", label: "P3", slippage: "2%", gas: "economy", autoApproval: false },
]

export const usePresetsSettingStore = create<PresetsState>((set) => ({
  presets: DEFAULT_PRESETS,
  activePresetId: DEFAULT_PRESETS[0].id,
  isSettingsOpen: false,
  setActivePreset: (id) => set({ activePresetId: id }),
  setSettingsOpen: (open: boolean) => set({ isSettingsOpen: open }),
  updatePreset: (id, next) =>
    set((state) => ({
      presets: state.presets.map((p) => (p.id === id ? { ...p, ...next } : p)),
    })),
  resetPresets: () =>
    set({ presets: DEFAULT_PRESETS, activePresetId: DEFAULT_PRESETS[0].id }),
}))

export default usePresetsSettingStore
