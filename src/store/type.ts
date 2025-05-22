export type FilterModal = {
	statusFilterModal: boolean
	openFilterModal: () => void
	closeFilterModal: () => void
}
export type FilterRecheck = {
	statusFilterRecheck: boolean
	openFilterRecheck: () => void
	closeFilterRecheck: () => void
}
export type FilterSettings = Record<string, boolean>
export type UnAppliedFilterSettingsState = {
	unAppliedFilterSettings: FilterSettings
	setUnAppliedFilterSettings: (id: string, checked: boolean) => void
	clearUnAppliedFilterSettings: () => void
}
export type AppliedFilterSettingsState = {
	appliedFilterSettings: FilterSettings
	setAppliedFilterSettings: (obj: FilterSettings) => void
}
