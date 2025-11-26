import { NextRequest, NextResponse } from 'next/server';
import { extractDataFromPdf } from '@/lib/extract';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const data = await extractDataFromPdf(buffer);

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error processing PDF:', error);
        return NextResponse.json({
            error: 'Failed to process PDF',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
