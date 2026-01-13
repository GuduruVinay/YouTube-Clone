import { ErrorHandler, LoadingHandler } from "../components/Handler";
import Grid from "../components/Grid";
import useFetch from "../hooks/useFetch";

function Home() {
    const { data: videos, loading, error } = useFetch("http://localhost:5000/api/videos/random");
    if(loading) return <LoadingHandler />
    if(error) return <ErrorHandler error={error}/>

    return (
        <div>
            <Grid videos={videos} />
        </div>
    );
}

export default Home;