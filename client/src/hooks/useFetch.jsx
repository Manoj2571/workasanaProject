import { useState, useEffect } from "react"
import axios from "axios"

const useFetch = (url, searchParams={}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(url, {params: searchParams})
        .then((response) => setData(response.data))
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false))
    }, [url, searchParams])


    return {data, error, loading}
}

export default useFetch