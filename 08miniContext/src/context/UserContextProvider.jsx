import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const [userOne, setUserOne] =useState(null);

    return (

        <UserContext.Provider
            value={{user, setUser, useState, userOne}}
        >

            {children}

        </UserContext.Provider>

    );

}

export default UserContextProvider;