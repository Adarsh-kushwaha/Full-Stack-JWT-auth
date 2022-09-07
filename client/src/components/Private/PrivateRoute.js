import React, { useState, useEffect } from 'react'
import axios from "axios";
import "./PrivateScreen.css";

const PrivateRoute = () => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                const { data } = await axios.get("/api/private", config);
                console.log(data);
                setPrivateData(data.data)
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        }

        fetchPrivateData();
    }, [])

    return error ? (
        <span className="error-message">{error}</span>
    ) : (
        <div className='privateMsg'>PrivateData - {privateData}</div>
    )
}

export default PrivateRoute