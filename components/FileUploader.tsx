'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface FileUploaderProps {
    onUpload: (file: File) => Promise<void>;
    isUploading: boolean;
}

export function FileUploader({ onUpload, isUploading }: FileUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selectedFile = e.dataTransfer.files[0];
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
                onUpload(selectedFile);
            } else {
                alert('Please upload a PDF file.');
            }
        }
    }, [onUpload]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            onUpload(selectedFile);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto mb-8">
            <div
                className={twMerge(
                    "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden group",
                    dragActive ? "border-blue-500 bg-blue-50/50 scale-[1.02]" : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400",
                    isUploading && "pointer-events-none opacity-80"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept=".pdf"
                    onChange={handleChange}
                    disabled={isUploading}
                />

                <div className="flex flex-col items-center justify-center pt-5 pb-6 z-0 pointer-events-none">
                    {isUploading ? (
                        <>
                            <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin" />
                            <p className="mb-2 text-sm text-gray-500 font-medium">Processing PDF...</p>
                        </>
                    ) : (
                        <>
                            <div className="p-4 rounded-full bg-blue-50 mb-4 group-hover:bg-blue-100 transition-colors">
                                {file ? <FileText className="w-8 h-8 text-blue-500" /> : <Upload className="w-8 h-8 text-blue-500" />}
                            </div>
                            <p className="mb-2 text-sm text-gray-700 font-semibold">
                                {file ? file.name : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-xs text-gray-500">PDF files only</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
