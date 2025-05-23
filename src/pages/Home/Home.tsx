import React from 'react'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'

import { ModalFilter } from '@/pages/Filter/Filter'
import FilterRecheck from '@/pages/Filter/FilterRecheck.tsx'
import {
	useAppliedFilterSettings,
	useFilterModal,
	useFilterRecheck
} from '@/store/store.ts'

const Home = () => {
	const { t } = useTranslation()
	const { statusFilterModal, openFilterModal } = useFilterModal()
	const { statusFilterRecheck } = useFilterRecheck()
	const { appliedFilterSettings } = useAppliedFilterSettings()
	const setOpenHandler = () => {
		openFilterModal()
	}

	return (
		<React.Fragment>
			<section className="w-full h-dvh flex items-center justify-center flex-col ">
				{/* eslint-disable-next-line i18next/no-literal-string */}
				<h1 className="text-6xl text-gray-600 mb-12 text-center">
					WinWinTravel frontend test task
				</h1>
				<button
					type="button"
					className={
						'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transform hover:scale-110 transition cursor-pointer'
					}
					onClick={() => {
						setOpenHandler()
					}}
				>
					{t('Filter')}
				</button>
				{Object.keys(appliedFilterSettings).length !== 0 && (
					<div>
						<h2>{t('Filter data:')}</h2>
						<pre>{JSON.stringify(appliedFilterSettings, null, 2)}</pre>
					</div>
				)}
			</section>

			{statusFilterModal &&
				document.getElementById('modal-main') !== null &&
				ReactDOM.createPortal(
					<ModalFilter />,
					document.getElementById('modal-main')!
				)}
			{statusFilterRecheck &&
				document.getElementById('modal-main') !== null &&
				ReactDOM.createPortal(
					<FilterRecheck />,
					document.getElementById('modal-main')!
				)}
		</React.Fragment>
	)
}
export default Home
