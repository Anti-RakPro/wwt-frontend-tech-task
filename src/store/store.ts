import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { FilterType } from '@/shared/api/types/Filter/index.ts'
import { SearchRequestOptions } from '@/shared/api/types/SearchRequest/SearchRequestFilter.ts'
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
		immer(set => {
			return {
				unAppliedFilterSettings: [],
				setUnAppliedFilterSettings: (objId, optionId, checked) => {
					set(state => {
						const existingFilter = state.unAppliedFilterSettings.find(
							filter => filter.id === objId
						)

						let updatedFilters = state.unAppliedFilterSettings
							.map(filter => {
								if (filter.id !== objId) {
									return filter
								}
								const alreadySelected = filter.optionsIds.includes(optionId)
								let updatedOptions

								if (checked) {
									if (alreadySelected) {
										updatedOptions = filter.optionsIds
									} else {
										updatedOptions = [...filter.optionsIds, optionId]
									}
								} else {
									updatedOptions = filter.optionsIds.filter(
										id => id !== optionId
									)
								}

								return { ...filter, optionsIds: updatedOptions }
							})
							.filter(filter => filter.optionsIds.length > 0)

						const isFilterMissing = !existingFilter && checked

						if (isFilterMissing) {
							const newFilter: SearchRequestOptions = {
								id: objId,
								type: FilterType.OPTION,
								optionsIds: [optionId]
							}
							updatedFilters = [...updatedFilters, newFilter]
						}

						state.unAppliedFilterSettings = updatedFilters
					})
				},
				clearUnAppliedFilterSettings: () => {
					set(state => {
						state.unAppliedFilterSettings = []
					})
				}
			}
		})
	)

export const useAppliedFilterSettings = create<useAppliedFilterSettingsTypes>()(
	immer(set => ({
		appliedFilterSettings: [],
		setAppliedFilterSettings: arr => set({ appliedFilterSettings: arr })
	}))
)
