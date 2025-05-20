import { create } from 'zustand'

type FilterModal = {
	isOpen: boolean
	openModal: () => void
	closeModal: () => void
}

export const useFilterModal = create<FilterModal>(set => ({
	isOpen: false,
	openModal: () => set({ isOpen: true }),
	closeModal: () => set({ isOpen: false })
}))
