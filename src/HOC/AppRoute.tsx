import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route } from 'react-router-dom';
import { RootState } from '../redux/configStore';


interface AppRouteProps {

    component: FC;
    isPrivate?: boolean;
    isAuth?: boolean;
    isAdmin?: boolean;
}

const AppRoute: FC<AppRouteProps> = ({
    component: Comp,
    isPrivate,
    isAuth,
    isAdmin,
}) => {
    const { profile } = useSelector((state: RootState) => state.userSlice);

    const token = localStorage.getItem('Token');

    if (isPrivate) {
        if (token) {
            return <Comp />;
        }
        return <Navigate to="/" replace />;
    }

    if (isAuth) {
        if (!profile) return <Comp />;
        return <Navigate to="/" replace />;
    }

    if (isAdmin) {
        if (profile) {

            return <Comp />;

        } else {
            return <Navigate to="/" replace />;
        }
    }

    return <Comp />;
};

export default AppRoute;