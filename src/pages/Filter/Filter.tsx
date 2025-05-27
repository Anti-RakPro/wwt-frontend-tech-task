import React from 'react'
import { useTranslation } from 'react-i18next'

import Cross from '@/assets/Cross.png'
import styles from '@/pages/Modal.module.css'
import rawData from '@/shared/temp/filterData.json'
import {
	useFilterModal,
	useFilterRecheck,
	useUnAppliedFilterSettings
} from '@/store/store.ts'

export const ModalFilter = () => {
	const { t } = useTranslation()
	const { closeFilterModal } = useFilterModal()
	const { openFilterRecheck } = useFilterRecheck()

	const {
		unAppliedFilterSettings,
		setUnAppliedFilterSettings,
		clearUnAppliedFilterSettings
	} = useUnAppliedFilterSettings()

	const modalHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeFilterModal()
		}
	}

	const data = rawData.filterItems

	const applyHandler = () => {
		closeFilterModal()
		openFilterRecheck()
	}

	const handleCheckboxChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		parentId: string
	) => {
		const { id: optionId, checked } = e.target
		setUnAppliedFilterSettings(parentId, optionId, checked)
	}

	const handleCheck = (parentId: string, optionId: string): boolean => {
		const parent = unAppliedFilterSettings.find(item => item.id === parentId)
		return parent ? parent.optionsIds.includes(optionId) : false
	}

	return (
		<div
			className={styles.modalShadow}
			onClick={modalHandleClick}
		>
			<div className={styles.modalBody}>
				<div className={'flex items-center mb-5'}>
					<h2 className={'text-center text-4xl mx-auto'}>{t('Filter')}</h2>
					<img
						className={'max-w-[20px] max-h-[20px] cursor-pointer m-1'}
						src={Cross}
						alt={'Close'}
						onClick={() => {
							closeFilterModal()
						}}
					/>
				</div>
				<div className={'flex flex-col'}>
					{data.map(item => {
						return (
							<div key={item.id}>
								<hr
									className={'border-t-2 border-gray-500 pb-8 max-[600px]:pb-3'}
								/>
								<h2 className={'mb-24px'}>{t(item.name)}</h2>
								<div
									className={
										'mb-8 flex flex-wrap max-[600px]:flex-col max-[600px]:mb-4'
									}
								>
									{item.options.map(option => {
										return (
											<div
												key={option.id}
												className={
													'w-1/3 mb-4 max-[600px]:w-full max-[600px]:mb-2'
												}
											>
												<input
													className={
														'w-20px h-20px border-4 border-gray-600 rounded mr-1'
													}
													type="checkbox"
													id={option.id}
													name={option.name}
													onChange={e => {
														handleCheckboxChange(e, item.id)
													}}
													checked={handleCheck(item.id, option.id)}
												/>
												<label htmlFor={option.id}>{option.name}</label>
											</div>
										)
									})}
								</div>
							</div>
						)
					})}
				</div>
				<div className={'flex justify-between items-center pt-4'}>
					<hr className={'border-t-2 border-gray-500 pb-8'} />
					<button
						className={
							'bg-orange-500 text-white rounded-[10px] px-[60px] py-[20px] mx-[16px] transform hover:scale-110 transition cursor-pointer'
						}
						onClick={() => {
							applyHandler()
						}}
					>
						{t('Apply')}
					</button>
					<span
						className={'underline text-black cursor-pointer'}
						onClick={() => {
							clearUnAppliedFilterSettings()
						}}
					>
						{t('Clear all parameters')}
					</span>
				</div>
			</div>
		</div>
	)
}
