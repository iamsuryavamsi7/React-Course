import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddUserPage = () => {

    const USER_BASE_URL = "http://localhost:7777/api/v1/users";

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: ""
    });

    const updateValueFunction = (e) => {

        const value = e.target.value;

        setUser({...user, [e.target.name]: value})

    }

    const addUserFunction = async (e) => {

        e.preventDefault();

        const response = await fetch(USER_BASE_URL , {
        
            method: "POST",
            headers: {

                'Content-Type': 'application/json'

            },
            body: JSON.stringify(user)

        });

        if ( !response.ok ) {

            throw new Error("Something Went Wrong");

        }

        navigate('/');

    }

    const cancelButtonFunction = (e) => {

        e.preventDefault();

        setUser({
            id: "",
            firstName: "",
            lastName: "",
            email: "" 
        })

        navigate('/');

    }

    return (

        <div className="w-full px-20 flex ">

            <div className="mx-auto bg-gray-500 px-20 py-10 my-10 rounded-2xl font-mono text-xl tracking-wider">

                <div 
                    className="text-[25px] mb-10 font-bold"
                >

                    Add User Form

                </div>

                <div className="">

                    <label> First Name :- </label><br />

                    <input 
                        className='rounded-lg mt-5'
                        type='text'
                        value={user.firstName}
                        name='firstName'
                        onChange={(e) => updateValueFunction(e)}
                    /><br /><br />

                    <label> Last Name :- </label><br />
                    
                    <input 
                        className='rounded-lg mt-5'
                        type='text'
                        value={user.lastName}
                        onChange={(e) => updateValueFunction(e)}
                        name='lastName'
                    /><br /><br />

                    <label> Email </label><br />

                    <input 
                        className='rounded-lg mt-5'
                        type='text'
                        value={user.email}
                        onChange={(e) => updateValueFunction(e)}
                        name='email'
                    />

                </div>

                <div 
                    className="mt-10"
                >

                    <input 
                        className='px-3 py-2 mr-5 bg-green-500 rounded-xl font-bold hover:bg-green-700'
                        type='submit'
                        value={'Add'}
                        onClick={(e) => addUserFunction(e)}
                    />
                    <input
                        className='px-3 py-2 bg-red-500 rounded-xl font-bold hover:bg-red-700'
                        type='submit'
                        value={'Cancel'}
                        onClick={(e) => cancelButtonFunction(e)}
                    />

                </div>

            </div>

        </div>

    )

}

export default AddUserPage