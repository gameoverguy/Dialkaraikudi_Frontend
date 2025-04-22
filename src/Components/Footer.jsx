import React from 'react'

const Footer = () => {

    const footer = ["About Us", "Contact", "Testimonal", "Feedback"]

    return (
        <div className='w-full mx-auto p-8'>
            <div className='mb-5 border-t border-gray-200 p-3 flex gap-10'>
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
            <div className='text-center border-t border-gray-200 p-5'>
                Copyrights 2025-26.  All Rights Reserved. Digitaly Pvt ltd.
            </div>
        </div>
    )
}

export default Footer
