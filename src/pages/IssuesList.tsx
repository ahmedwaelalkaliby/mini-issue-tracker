import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Issue } from '../types/types.ts';

export default function IssuesList() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                const data = response.data.map((item: Issue) => ({
                    id: item.id,
                    title: item.title,
                    body: item.body,
                }));
                setIssues(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch issues');
                console.error('Error fetching issues:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-gray-500">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    if (issues.length === 0) {
        return <div className="text-center mt-10 text-gray-500">No issues found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Issues List</h1>
                <button
                    onClick={() => navigate('/create-issue')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Create Issue
                </button>
            </div>

            <div className="grid gap-4">
                {issues.map((issue) => (
                    <div
                        key={issue.id}
                        className="p-4 bg-white rounded shadow hover:shadow-lg transition flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">{issue.title}</h2>
                            <p className="text-gray-600 mt-2">{issue.body}</p>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => navigate(`/issue-details/${issue.id}`)}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
