'use client';

import React from 'react';

interface Article {
    title: string;
    source: string;
    url: string;
    publishedAt: string;
    description?: string;
}

interface Props {
    articles: Article[];
}

const LatestArticles: React.FC<Props> = ({ articles }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2 text-left">Article Title</th>
                    <th className="border border-gray-300 p-2 text-left">Summary</th>
                    <th className="border border-gray-300 p-2 text-left">Source</th>
                    <th className="border border-gray-300 p-2 text-left">Published On</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article, idx) => (
                    <tr key={idx}>
                        <td
                            className="border border-gray-300 p-2 max-w-[600px] overflow-hidden whitespace-nowrap text-ellipsis"
                            style={{ maxWidth: '600px' }}
                        >
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline font-medium"
                            >
                                {article.title}
                            </a>
                        </td>
                        <td className="border border-gray-300 p-2 max-w-xs truncate" title={article.description}>
                            {article.description || 'N/A'}
                        </td>
                        <td className="border border-gray-300 p-2">{article.source || 'N/A'}</td>
                        <td className="border border-gray-300 p-2">
                            {new Date(article.publishedAt).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LatestArticles;
