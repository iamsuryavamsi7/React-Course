import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

	const [length, setLength] = useState(8);

	const [numberAllowed, setNumberAllowed] = useState(false);

	const [charAllowed, setCharAllowed] = useState(false);

	const [password, setPassword] = useState('');

	const passwordRef = useRef(null);

	const generatePassword = useCallback(() => {

		let pass = "";

		let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

		if ( numberAllowed ){

			str += "1234567890";

		}

		if ( charAllowed ) {

			str += "!@#$%^&*()+=-_"

		}

		for ( let i = 1; i < length; i++ ) {

			const char = Math.floor(Math.random() * str.length + 1)

			pass += str.charAt(char);

		}

		setPassword(pass);

	}, [length, numberAllowed, charAllowed]);

	useEffect(() => {

		generatePassword();

	}, [length, numberAllowed, charAllowed])

	const copyPasswordToClipBoard = (e) => {
		
		e.preventDefault();
		
		passwordRef.current?.select();
		
		window.navigator.clipboard.writeText(password);
	}
	

	return (
		
		<div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">

			<h1
				className='text-white text-center my-3'
			> Password Generator </h1>

			<div className="flex shadow rounded-lg overflow-hidden mb-4">

				<input 
					type='text'
					value={password}
					className='outline-none w-full py-1 px-3'
					placeholder='Password'
					readOnly
				/>

				<input 
					className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-grabbing'
					type='submit'
					value={'Copy'}
					onClick={(e) => copyPasswordToClipBoard(e)}
					ref={passwordRef}
				/>

			</div>

			<div
				className="flex text-sm gap-x-2 w-full flex-grow"
			>

				<div 
					className="flex items-center gap-x-1 flex-grow ml-2"
				>

					<input 
						type='range'
						min={6}
						max={30}
						value={length}
						className='cursor-pointer'
						onChange={(e) => setLength(e.target.value)}
						name=''
						id=''
					/>

					<label htmlFor='length'> length: {length}</label>

				</div>

				<div 
					className="flex items-center gap-x-1 flex-grow"
				>

					<input 
						type='checkbox'
						defaultChecked={numberAllowed}
						onChange={() => {
							setNumberAllowed((prev) => !prev)
						}}
						name=''
						id=''
					/>

					<label htmlFor='number'> Numbers </label>

				</div>

				<div 
					className="flex items-center gap-x-1 flex-grow"
				>

					<input 
						type='checkbox'
						defaultChecked={charAllowed}
						onChange={() => {
							setCharAllowed((prev) => !prev)
						}}
						name=''
						id=''
					/>

					<label htmlFor='charInput'> Characters </label>

				</div>

			</div>

		</div>
	
	)

}

export default App
