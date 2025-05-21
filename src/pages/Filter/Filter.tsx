import React from 'react'
import { useTranslation } from 'react-i18next'

import Cross from '@/assets/Cross.png'
import styles from '@/pages/Filter/Filter.module.css'
import { useFilterModal } from '@/store/store.ts'

export const ModalFilter = () => {
	const { t } = useTranslation()
	const { closeModal } = useFilterModal()

	const modalHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeModal()
		}
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
							closeModal()
						}}
					/>
				</div>
				<hr className={'border-t-2 border-gray-500'} />
				{t('someText')}
			</div>
		</div>
	)
}
