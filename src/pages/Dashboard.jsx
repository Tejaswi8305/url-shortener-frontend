import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [originalUrl, setOriginalUrl] = useState("");
    const [expiryDays, setExpiryDays] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [urls, setUrls] = useState([]);

    const BASE_URL = "https://url-shortener-backend-92n5.onrender.com";

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    const loadUrls = async () => {

        try {

            const response = await api.get("/api/my-urls");

            setUrls(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadUrls();

    }, []);

    const createShortUrl = async () => {

        try {

            const response = await api.post("/api/url", {

                originalUrl,
                expiryDays: expiryDays === "" ? null : Number(expiryDays),
                customAlias

            });

            setShortUrl(response.data);

            setOriginalUrl("");
            setExpiryDays("");
            setCustomAlias("");

            loadUrls();

        } catch (error) {

            alert(error.response?.data || "Failed to create URL");

        }

    };

    const deleteUrl = async (id) => {

        try {

            await api.delete(`/api/url/${id}`);

            loadUrls();

        } catch (error) {

            alert("Delete Failed");

        }

    };

    const copyToClipboard = (shortCode) => {

        navigator.clipboard.writeText(
            `${BASE_URL}/${shortCode}`
        );

        alert("Copied to Clipboard!");

    };

    return (

        <div className="min-h-screen bg-slate-100">

            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold">

                    URL Shortener

                </h1>

                <button
                    onClick={logout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>

            </nav>

            <div className="max-w-6xl mx-auto p-8">

                <div className="grid grid-cols-2 gap-6 mb-8">

                    <div className="bg-white shadow rounded-xl p-6">

                        <h3 className="text-gray-500">

                            Total URLs

                        </h3>

                        <p className="text-4xl font-bold mt-2">

                            {urls.length}

                        </p>

                    </div>

                    <div className="bg-white shadow rounded-xl p-6">

                        <h3 className="text-gray-500">

                            Total Clicks

                        </h3>

                        <p className="text-4xl font-bold mt-2">

                            {urls.reduce(
                                (sum, url) => sum + url.clickCount,
                                0
                            )}

                        </p>

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow p-8">

                    <h2 className="text-3xl font-bold mb-6">

                        Create Short URL

                    </h2>

                    <input
                        className="w-full border p-3 rounded mb-4"
                        placeholder="Original URL"
                        value={originalUrl}
                        onChange={(e) => setOriginalUrl(e.target.value)}
                    />

                    <input
                        className="w-full border p-3 rounded mb-4"
                        placeholder="Expiry Days (Optional)"
                        value={expiryDays}
                        onChange={(e) => setExpiryDays(e.target.value)}
                    />

                    <input
                        className="w-full border p-3 rounded mb-6"
                        placeholder="Custom Alias (Optional)"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                    />

                    <button
                        onClick={createShortUrl}
                        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                    >
                        Create URL
                    </button>

                    {

                        shortUrl && (

                            <div className="mt-6">

                                <h3 className="font-bold mb-2">

                                    Short URL

                                </h3>

                                <input
                                    className="w-full border p-3 rounded bg-gray-100"
                                    value={shortUrl}
                                    readOnly
                                />

                            </div>

                        )

                    }

                </div>

                <div className="bg-white rounded-xl shadow mt-10 p-8">

                    <h2 className="text-3xl font-bold mb-6">

                        My URLs

                    </h2>

                    <table className="w-full border-collapse">

                        <thead>

                        <tr className="bg-gray-200">

                            <th className="border p-3">Short URL</th>

                            <th className="border p-3">Original URL</th>

                            <th className="border p-3">Clicks</th>

                            <th className="border p-3">Created</th>

                            <th className="border p-3">Actions</th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            urls.map((url) => (

                                <tr key={url.id}>

                                    <td className="border p-3">

                                        <a
                                            href={`${BASE_URL}/${url.shortCode}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            {`${BASE_URL}/${url.shortCode}`}
                                        </a>

                                    </td>

                                    <td className="border p-3">

                                        {url.originalUrl}

                                    </td>

                                    <td className="border p-3 text-center">

                                        {url.clickCount}

                                    </td>

                                    <td className="border p-3">

                                        {new Date(
                                            url.createdAt
                                        ).toLocaleString()}

                                    </td>

                                    <td className="border p-3">

                                        <div className="flex gap-2 justify-center">

                                            <button
                                                onClick={() => copyToClipboard(url.shortCode)}
                                                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                                            >
                                                Copy
                                            </button>

                                            <button
                                                onClick={() => deleteUrl(url.id)}
                                                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }

                        {

                            urls.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center p-6 text-gray-500"
                                    >

                                        No URLs Created Yet

                                    </td>

                                </tr>

                            )

                        }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;