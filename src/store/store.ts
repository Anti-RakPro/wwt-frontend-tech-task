import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { FilterType } from '@/shared/api/types/Filter/index.ts'
import {
	SearchRequestFilter,
	SearchRequestOptions
} from '@/shared/api/types/SearchRequest/SearchRequestFilter.ts'
import {
	FilterModalType,
	FilterRecheckType,
	UseUnAppliedFilterSettingsTypes,
	useAppliedFilterSettingsTypes
} from '@/store/type.ts'

export const useFilterModal = create<FilterModalType>()(set => ({
	statusFilterModal: false,
	openFilterModal: () => set({ statusFilterModal: true }),
	closeFilterModal: () => set({ statusFilterModal: false })
}))

export const useFilterRecheck = create<FilterRecheckType>()(set => ({
	statusFilterRecheck: false,
	openFilterRecheck: () => set({ statusFilterRecheck: true }),
	closeFilterRecheck: () => set({ statusFilterRecheck: false })
}))

export const useUnAppliedFilterSettings =
	create<UseUnAppliedFilterSettingsTypes>()(
		immer<UseUnAppliedFilterSettingsTypes>(set => ({
			unAppliedFilterSettings: [] as SearchRequestFilter,
			setUnAppliedFilterSettings: (
				objId: string,
				optionId: string,
				checked: boolean
			) => {
				set(state => {
					const updatedFilters = state.unAppliedFilterSettings
						.map(filter => {
							if (filter.id === objId) {
								const updatedOptions = checked
									? filter.optionsIds.includes(optionId)
										? filter.optionsIds
										: [...filter.optionsIds, optionId]
									: filter.optionsIds.filter(
											optionIdItem => optionIdItem !== optionId
										)

								return { ...filter, optionsIds: updatedOptions }
							}
							return filter
						})
						.filter(filter => filter.optionsIds.length > 0) // Remove filters with empty optionsIds

					if (
						!state.unAppliedFilterSettings.some(
							filter => filter.id === objId
						) &&
						checked
					) {
						state.unAppliedFilterSettings = [
							...updatedFilters,
							{
								id: objId,
								type: FilterType.OPTION,
								optionsIds: [optionId]
							} as SearchRequestOptions
						]
					} else {
						state.unAppliedFilterSettings = updatedFilters
					}
					console.log(state.unAppliedFilterSettings)
				})
			},
			clearUnAppliedFilterSettings: () => {
				set(state => {
					state.unAppliedFilterSettings = []
				})
			}
		}))
	)

export const useAppliedFilterSettings = create<useAppliedFilterSettingsTypes>()(
	immer(set => ({
		appliedFilterSettings: [] as SearchRequestFilter,
		setAppliedFilterSettings: (obj: SearchRequestFilter) =>
			set({ appliedFilterSettings: obj })
	}))
)
