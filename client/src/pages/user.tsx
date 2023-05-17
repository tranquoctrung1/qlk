import User from '../components/user';

import { Navigate, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import jwt_decode from 'jwt-decode';

const UserPage = () => {
    const navigate = useNavigate();

    const getRoleAdmin = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return navigate('/login');
        } else {
            let decodeToken = jwt_decode(token);
            //@ts-ignore
            if (decodeToken.role !== 'admin') {
                return navigate('/login');
            }
        }
    };

    useEffect(() => {
        getRoleAdmin();
    }, []);

    return (
        <>
            <User />
        </>
    );
};

export default UserPage;
