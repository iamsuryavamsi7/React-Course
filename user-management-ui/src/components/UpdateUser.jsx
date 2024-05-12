import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchUsers } from '../features/user/UserSlice';

const UpdateUser = () => {

    const USER_BASE_URL = "http://localhost:7777/api/v1/users";

    const {id} = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [user, setUser] = useState({
        id: id,
        firstName: "",
        lastName: "",
        email: ""
    })

    const updateValueFunction = (e) => {

        const value = e.target.value;

        setUser({...user, [e.target.name]: value})

    }

    const updateButtonFunction = (e) => {

        e.preventDefault();

        const response = fetch(USER_BASE_URL + "/" + id, {

            method: "PUT",
            headers: {

                'Content-Type': 'application/json'

            },
            body: JSON.stringify(user)

        }).then((response) => {

            console.log(response);

        }).catch((error) => {

            console.log(error);

        })

        dispatch(fetchUsers());

        navigate('/');

    }

    useEffect(() => {

        const fetchUser = async () => {

            try{

                const response = await fetch(USER_BASE_URL + "/" + id, {

                    method: "GET",
                    headers: {
    
                        'Content-Type': 'application/json'
    
                    }
    
                })

                if ( !response.ok ) {

                    throw new Error("Something Went Wrong");

                }

                const data = await response.json();

                setUser(data)

            }catch(error){

                throw error;

            }

        }

        fetchUser();

    }, [])

    return (

        <div className="w-full px-20 flex ">

            <div className="mx-auto bg-gray-500 px-20 py-10 my-10 rounded-2xl font-mono text-xl tracking-wider">

                <div 
                    className="text-[25px] mb-10 font-bold"
                >

                    Update User Form

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
                        className='px-3 py-2 mr-5 bg-green-500 rounded-xl font-bold hover:bg-green-700 cursor-pointer'
                        type='submit'
                        value={'Update'}
                        onClick={(e) => updateButtonFunction(e)}
                    />
                    <input
                        className='px-3 py-2 bg-red-500 rounded-xl font-bold hover:bg-red-700'
                        type='submit'
                        value={'Cancel'}
                        onClick={() => navigate('/')}
                    />

                </div>

            </div>

        </div>

    )

}

export default UpdateUser