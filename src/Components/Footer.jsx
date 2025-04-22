import React from 'react'

const Footer = () => {

    const footer = ["About Us", "Contact", "Testimonal", "Feedback"]

    return (
        <div className='w-full mx-auto shadow-inner '>
            <div className='w-11/12 mx-auto'>
                <div className='mb-5 border-gray-200 p-3 flex gap-10'>
                    <div>
                        <h1 className='text-xl mb-6'>Quick Links</h1>
                        {footer.map((data, i) => (
                            <li className='list-none '>{data}</li>
                        ))}
                    </div>
                    <div>
                        <h1 className='text-xl mb-6'>Quick Links</h1>
                        {footer.map((data, i) => (
                            <li className='list-none '>{data}</li>
                        ))}
                    </div>
                </div>

            </div>
            <div className='text-center shadow-inner py-4'>
                Copyrights 2025-26.  All Rights Reserved. Digitaly Pvt ltd.
            </div>
        </div>
    )
}

export default Footer
