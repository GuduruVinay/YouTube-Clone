import { ErrorHandler, LoadingHandler } from "../components/Handler";
import VideoGrid from "../components/VideoGrid";
import useFetch from "../hooks/useFetch";

function Home() {
    const { data: videos, loading, error } = useFetch("http://localhost:5000/api/videos/random");
    if(loading) return <LoadingHandler />
    if(error) return <ErrorHandler error={error}/>

    return (
        <div>
            <VideoGrid videos={videos} />
        </div>
    );
}

export default Home;