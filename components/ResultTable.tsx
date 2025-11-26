'use client';

import { ExtractedData } from '@/lib/extract';
import { Download, Table as TableIcon } from 'lucide-react';
import { useState } from 'react';

interface ResultTableProps {
    data: ExtractedData[];
}

export function ResultTable({ data }: ResultTableProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const response = await fetch('/api/generate-excel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate Excel');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'po_data.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download Excel file.');
        } finally {
            setIsDownloading(false);
        }
    };

    if (data.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <TableIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Extracted Data</h2>
                    <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">
                        {data.length} rows
                    </span>
                </div>
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                    <Download className="w-4 h-4" />
                    {isDownloading ? 'Generating...' : 'Download Excel'}
                </button>
            </div>

            <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Order #</th>
                                <th className="px-6 py-3 font-semibold">Buyer Item</th>
                                <th className="px-6 py-3 font-semibold">Description</th>
                                <th className="px-6 py-3 font-semibold">Color</th>
                                <th className="px-6 py-3 font-semibold">Size</th>
                                <th className="px-6 py-3 font-semibold">SKU</th>
                                <th className="px-6 py-3 font-semibold">UPC</th>
                                <th className="px-6 py-3 font-semibold">Unique</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.map((row, index) => (
                                <tr
                                    key={index}
                                    className="bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-3 font-medium text-gray-900">{row.orderNumber}</td>
                                    <td className="px-6 py-3 text-gray-600">{row.buyerItem}</td>
                                    <td className="px-6 py-3 text-gray-600 max-w-xs truncate" title={row.description}>{row.description}</td>
                                    <td className="px-6 py-3 text-gray-600">{row.color}</td>
                                    <td className="px-6 py-3 text-gray-600">{row.size}</td>
                                    <td className="px-6 py-3 font-mono text-xs text-gray-500">{row.sku}</td>
                                    <td className="px-6 py-3 font-mono text-xs text-gray-500">{row.upc}</td>
                                    <td className="px-6 py-3 font-mono text-xs text-gray-500">{row.unique}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
