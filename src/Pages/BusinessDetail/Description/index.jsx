import React from 'react'

const Description = ({ formData }) => {
    return (
        <React.Fragment>
            <div className="rounded-md border border-gray-200 p-4" id="services">
                <h1 className="font-semibold text-lg md:text-xl mb-3">
                    Description
                </h1>
                <p className="text-sm text-gray-700 mb-3">
                    {formData?.business.description}                </p>
            </div>
        </React.Fragment>
    )
}

export default Description