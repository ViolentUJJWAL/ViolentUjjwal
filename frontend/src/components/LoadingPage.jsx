import React from 'react'

function LoadingPage() {
    return (
        <div className="text-center m-auto">
            <div
                className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
            ></div>
            <h2 className="text-zinc-900 mt-4">Loading...</h2>
            <p className="text-zinc-600">
                Your adventure is about to begin
            </p>
        </div>
    )
}

export default LoadingPage
