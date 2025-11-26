'use client';

import { useState } from 'react';
import { FileUploader } from '@/components/FileUploader';
import { ResultTable } from '@/components/ResultTable';
import { ExtractedData } from '@/lib/extract';
import { FileSpreadsheet } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<ExtractedData[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to process PDF');
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Upload failed:', error);
      alert(`Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-6">
            <FileSpreadsheet className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Infornexus Generate UPC Numbers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Upload your Purchase Order PDF to extract data and download as Excel.
          </p>
        </div>

        <FileUploader onUpload={handleUpload} isUploading={isUploading} />

        {data.length > 0 && (
          <div className="mt-12">
            <ResultTable data={data} />
          </div>
        )}
      </div>
    </main>
  );
}
