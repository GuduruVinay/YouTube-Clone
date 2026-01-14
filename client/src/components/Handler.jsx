export const LoadingHandler = () => {
    return (
        <div className="flex justify-center items-center h-dvh">
            <div className="w-12 h-12 border-4 border-[#ff0033] border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}

export const ErrorHandler = ({ error }) =>  {
    return (
        <div className="flex justify-center items-center h-dvh">
            <p>{error}</p>   
        </div>
    )
}