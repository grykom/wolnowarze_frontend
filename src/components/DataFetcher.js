import { useState, useEffect } from "react";

function DataFetcher(props){
    const [ apiData, setApiData ] = useState()
    const [ dataReady, setDataReady ] = useState(false)

    useEffect(() => {
        fetch(props.url)
            .then(res => res.json())
            .then(data => {
                setApiData(data)
                setDataReady(true)
            })
    }, [props.url])

    return (
        props.children(apiData, dataReady)
    )
}

export default DataFetcher