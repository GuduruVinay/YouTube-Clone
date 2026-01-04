function VideoCard() {
    return (
        <div className="flex flex-col gap-2 px-1">
            <img src="" alt="Thumbnail" className='rounded-xl h-48 w-full lg:h-64 bg-blue-400'/>
            <div>
                <p className="font-bold">Title</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Channel Name</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Views</p>
            </div>
        </div>
    )
}

export default VideoCard;