import { Route, Routes } from 'react-router-dom'

import Home from './Home/Home.tsx'
import NotFound from './NotFound/NotFound.tsx'

export const App = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="*"
				element={<NotFound />}
			/>
		</Routes>
	)
}
