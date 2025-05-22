import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import {
	AppliedFilterSettingsState,
	FilterModal,
	FilterRecheck,
	FilterSettings,
	UnAppliedFilterSettingsState
} from '@/store/type.ts'

export const useFilterModal = create<FilterModal>(set => ({
	statusFilterModal: false,
	openFilterModal: () => set({ statusFilterModal: true }),
	closeFilterModal: () => set({ statusFilterModal: false })
}))

export const useFilterRecheck = create<FilterRecheck>(set => ({
	statusFilterRecheck: false,
	openFilterRecheck: () => set({ statusFilterRecheck: true }),
	closeFilterRecheck: () => set({ statusFilterRecheck: false })
}))

export const useUnAppliedFilterSettings =
	create<UnAppliedFilterSettingsState>()(
		immer(set => ({
			unAppliedFilterSettings: {} as FilterSettings,
			setUnAppliedFilterSettings: (id: string, checked: boolean) =>
				set(state => {
					if (checked) {
						state.unAppliedFilterSettings[id] = checked
					} else {
						delete state.unAppliedFilterSettings[id]
					}
				}),
			clearUnAppliedFilterSettings: () => set({ unAppliedFilterSettings: {} })
		}))
	)

export const useAppliedFilterSettings = create<AppliedFilterSettingsState>()(
	immer(set => ({
		appliedFilterSettings: {} as FilterSettings,
		setAppliedFilterSettings: (obj: FilterSettings) =>
			set({ appliedFilterSettings: obj })
	}))
)
