import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url, { signal });
                setData(res.data);
                setError(null);
            } catch(err) {
                if(err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                if(!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => controller.abort();

    }, [url]);

    return { data, loading, error };
};

export default useFetch;