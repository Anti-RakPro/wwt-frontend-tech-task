import React from 'react'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'

import Cross from '@/assets/Cross.png'
import styles from '@/pages/Home/Home.module.css'
import { useFilterModal } from '@/store/store.ts'

const Home = () => {
	const { t } = useTranslation()
	const { isOpen, openModal, closeModal } = useFilterModal()

	const modalHandlClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeModal()
		}
	}

	const ModalWrapper = () => {
		return (
			<div
				className={styles.modalShadow}
				onClick={modalHandlClick}
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
					<hr className={'border-t-2'} />
					{t('someText')}
				</div>
			</div>
		)
	}

	const setOpenHandler = () => {
		openModal()
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
					className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
					onClick={() => {
						setOpenHandler()
					}}
				>
					{t('Filter')}
				</button>
			</section>
			{isOpen &&
				document.getElementById('modal-main') !== null &&
				ReactDOM.createPortal(
					<ModalWrapper />,
					document.getElementById('modal-main')!
				)}
		</React.Fragment>
	)
}

export default Home
