import React from 'react';
import { useLoaderData } from 'react-router';

const Gardeners = () => {
     const users = useLoaderData();
     console.log(users)
    return (
        <div>
            Hi
        </div>
    );
};

export default Gardeners;