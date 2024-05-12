import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EmployeeList from './components/EmployeeList'
import NavBar from './components/NavBar'
import AddUserPage from './components/AddUserPage'
import UpdateUser from './components/UpdateUser'

function App() {

	return (

		<>

			<NavBar />
		
			<BrowserRouter>
				
				<Routes>

					<Route index element={<EmployeeList />} />
					<Route path='/' element={<EmployeeList />} />
					<Route path='/addUser' element={<AddUserPage />} />
					<Route path='/updateuser/:id' element={<UpdateUser />} />

				</Routes>

			</BrowserRouter>

		</>

	)

}

export default App
