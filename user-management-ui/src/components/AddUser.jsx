import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {

    const navigate = useNavigate();

    return (

        <div className="">

            <input 
                className='px-3 py-1 bg-gray-500 text-white font-bold my-5 rounded-lg text-xl hover:bg-gray-700 '
                type='submit'
                value={'Add User'}
                onClick={() => navigate('/addUser')}
            />

        </div>

    )

}

export default AddUser