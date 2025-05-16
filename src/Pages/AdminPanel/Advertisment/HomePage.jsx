import React from 'react'
import { ToastContainer } from 'react-toastify';

const HomePage = () => {
    return (
        <div className="p-6">
            <ToastContainer />
            <div className='shadow bg-white p-6 rounded-lg'>
                <h1 className="text-2xl font-bold mb-6">User Management</h1>
                <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui atque iure reprehenderit harum tempora ex voluptas dolor recusandae aliquam nostrum mollitia totam deleniti reiciendis consequuntur odio, nam eaque voluptatibus eius maxime. Repellat alias quas distinctio voluptatem molestiae quasi nulla nemo!</span>
            </div>
        </div>
    )
}

export default HomePage;
