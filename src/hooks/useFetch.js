import { useState, useEffect } from "react";

export const useFetch = (url, method, headers, body) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            try {
                let response;
                if (method === "POST") {
                    response = await fetch(url, {
                        method: "POST",
                        headers: headers || {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body),
                        // body: JSON.stringify(data), // body data type must match "Content-Type" header
                    });
                } else {
                    response = await fetch(url, {
                        method: method || "GET",
                        headers: headers || {
                            "Content-Type": "application/json",
                        },
                    });
                }

                if (!response.ok) {
                    console.error(
                        `useFetch custom error msg: response statues ${response.status}`
                    );
                    throw new Error(response.statusText);
                }
                const json = await response.json();
                setData(json);
                setError(null);
            } catch (error) {
                setError(`${error} Could not Fetch Data`);
            } finally {
                setIsPending(false);
            }
        };
        fetchData();
    }, [url]);
    return { data, isPending, error };
};
/*
    import { useFetch } from "./hooks/useFetch";
    const { data, isPending, error } = useFetch(url);

    return (
        {isPending && <div>Loading....</div>}
        {error && <div>{error}</div>}
        {data && data.map((name) => <p key={name.id}>{name.name}</p>)}
    )
*/
