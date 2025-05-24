import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter.ts'

export type FilterModalType = {
	statusFilterModal: boolean
	openFilterModal: () => void
	closeFilterModal: () => void
}
export type FilterRecheckType = {
	statusFilterRecheck: boolean
	openFilterRecheck: () => void
	closeFilterRecheck: () => void
}
export type UseUnAppliedFilterSettingsTypes = {
	unAppliedFilterSettings: SearchRequestFilter
	setUnAppliedFilterSettings: (
		objId: string,
		optionId: string,
		checked: boolean
	) => void
	clearUnAppliedFilterSettings: () => void
}
export type useAppliedFilterSettingsTypes = {
	appliedFilterSettings: SearchRequestFilter
	setAppliedFilterSettings: (arr: SearchRequestFilter) => void
}
