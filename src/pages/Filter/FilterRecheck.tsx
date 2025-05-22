import React from 'react'
import { useTranslation } from 'react-i18next'

import Cross from '@/assets/Cross.png'
import styles from '@/pages/Modal.module.css'
import {
	useAppliedFilterSettings,
	useFilterRecheck,
	useUnAppliedFilterSettings
} from '@/store/store.ts'

export const FilterRecheck = () => {
	const { t } = useTranslation()
	const { closeFilterRecheck } = useFilterRecheck()
	const { unAppliedFilterSettings } = useUnAppliedFilterSettings()
	const { setAppliedFilterSettings } = useAppliedFilterSettings()

	const modalHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeFilterRecheck()
		}
	}

	const oldFilterHandler = () => {
		closeFilterRecheck()
	}
	const applyHandler = () => {
		setAppliedFilterSettings(unAppliedFilterSettings)
		closeFilterRecheck()
	}

	return (
		<div
			className={styles.modalShadow}
			onClick={modalHandleClick}
		>
			<div className={styles.modalBody}>
				<div className={'flex items-center mb-8'}>
					<h3 className="text-lg text-center mx-auto">
						{t('Do you want to apply new filter ?')}
					</h3>
					<img
						className={'max-w-[20px] max-h-[20px] cursor-pointer m-1'}
						src={Cross}
						alt={'Close'}
						onClick={() => {
							closeFilterRecheck()
						}}
					/>
				</div>

				<div className="flex items-center mb-5 justify-center max-[600px]:flex-col">
					<button
						onClick={() => {
							oldFilterHandler()
						}}
						className="bg-none text-black border border-gray-500 rounded-[10px] px-[60px] py-[20px] mx-[16px] my-[5px] transform hover:scale-110 transition cursor-pointer"
					>
						{t('Use old filter')}
					</button>
					<button
						onClick={() => {
							applyHandler()
						}}
						className="bg-orange-500 text-white rounded-[10px] px-[60px] py-[20px] mx-[16px] my-[5px] transform hover:scale-110 transition cursor-pointer"
					>
						{t('Apply new filter')}
					</button>
				</div>
			</div>
		</div>
	)
}

export default FilterRecheck
