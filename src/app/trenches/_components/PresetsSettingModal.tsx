"use client"

import React, { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import usePresetsSettingStore, {
  type PresetSetting,
} from "@/stores/use-presets-setting.store"

const GAS_OPTIONS = ["fast", "standard", "economy"] as const
const SLIPPAGE_RE = /^[0-9]+(?:\.[0-9]+)?%?$/

const PresetsSettingModal: React.FC = () => {
  const { isSettingsOpen, setSettingsOpen, presets, updatePreset, resetPresets } =
    usePresetsSettingStore()

  const [local, setLocal] = useState<PresetSetting[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isSettingsOpen) setLocal(presets.map((p) => ({ ...p })))
  }, [isSettingsOpen, presets])

  const buildErrors = (rows: PresetSetting[]): Record<string, string> => {
    const errors: Record<string, string> = {}
    for (const r of rows) {
      const s = String(r.slippage ?? "").trim()
      if (!s || !SLIPPAGE_RE.test(s)) {
        errors[r.id] = "Use a numeric slippage (e.g. 0.5%)"
      }
    }
    return errors
  }

  const onSave = () => {
    const errors = buildErrors(local)
    setErrors(errors)
    if (Object.keys(errors).length > 0) return
    local.forEach((r) => {
      const raw = String(r.slippage ?? "").trim()
      const normalized = raw.endsWith("%") ? raw : `${raw}%`
      updatePreset(r.id, {
        slippage: normalized,
        gas: r.gas,
        autoApproval: r.autoApproval,
      })
    })
    setSettingsOpen(false)
  }

  const onReset = () => {
    resetPresets()
    setLocal(presets.map((p) => ({ ...p })))
  }

  return (
    <Dialog open={isSettingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Presets Buy Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Edit your quick buy presets for slippage, gas profile and auto-approval.
          </DialogDescription>
        </DialogHeader>

        <div className="flex w-full flex-col p-1.5">
          {local.map((p) => (
            <div
              key={p.id}
              className="bg-table-light-2 grid grid-cols-10 items-center gap-3 px-4 py-2"
            >
              <div className="text-primary col-span-12 font-medium sm:col-span-2">
                {p.label}
              </div>

              <div className="col-span-12 sm:col-span-3">
                <Label className="text-muted-foreground text-xs">Slippage</Label>
                <Input
                  aria-label={`${p.label} slippage`}
                  inputMode="decimal"
                  pattern="[0-9]+(\.[0-9]+)?%?"
                  maxLength={6}
                  value={String(p.slippage ?? "")}
                  onChange={(e) =>
                    setLocal((s) =>
                      s.map((x) =>
                        x.id === p.id ? { ...x, slippage: e.target.value } : x,
                      ),
                    )
                  }
                  className="mt-1"
                />
                {errors[p.id] && (
                  <div className="mt-1 text-xs text-rose-400">{errors[p.id]}</div>
                )}
              </div>

              <div className="col-span-12 sm:col-span-3">
                <Label className="text-muted-foreground text-xs">Gas profile</Label>
                <Select
                  value={p.gas}
                  onValueChange={(val) =>
                    setLocal((s) =>
                      s.map((x) => (x.id === p.id ? { ...x, gas: val } : x)),
                    )
                  }
                >
                  <SelectTrigger className="mt-1 h-9 w-full rounded-md border bg-transparent px-3 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GAS_OPTIONS.map((g) => (
                      <SelectItem key={g} value={g} className="text-sm">
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-12 flex items-center gap-2 sm:col-span-2">
                <div className="flex flex-col">
                  <Label className="text-muted-foreground text-xs">Auto-approval</Label>
                  <div className="mt-1">
                    <Switch
                      checked={p.autoApproval}
                      onCheckedChange={(v) =>
                        setLocal((s) =>
                          s.map((x) =>
                            x.id === p.id ? { ...x, autoApproval: Boolean(v) } : x,
                          ),
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="w-fit px-6" onClick={onReset}>
                Reset
              </Button>
              <Button onClick={onSave} className="w-fit px-6">
                Confirm
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PresetsSettingModal
