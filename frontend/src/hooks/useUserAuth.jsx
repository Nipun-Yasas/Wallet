import React, { useEffect } from 'react'
import { useContext } from 'react'

import { UserContext } from '../context/UserContext'

import {API_PATHS} from '../utils/apiPaths'
import axiosInstance  from '../utils/axiosInstance'

import { useNavigate } from 'react-router-dom'

export default function  () {

    const {user,updateUser,clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try{
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if(isMounted && response.data){
                    updateUser(response.data);
                }
            }
            catch(error){
                console.error("Error fetching user info:", error);
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        };
        fetchUserInfo();

        return () =>{
            isMounted = false;
        };

    },[updateUser,clearUser,navigate]);

}
