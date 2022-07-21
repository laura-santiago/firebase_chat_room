import React from 'react';
import { AuthContext } from '../context/auth';

function useAuth() {
    const value = React.useContext(AuthContext);

    if (!value) {
        throw new Error("El valor de AuthContext no está definido.");
    }

    return value;
}

export { useAuth };