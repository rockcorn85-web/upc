import { NextRequest, NextResponse } from 'next/server';
import { generateExcel } from '@/lib/excel';
import { ExtractedData } from '@/lib/extract';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data: ExtractedData[] = body.data;

        if (!data || !Array.isArray(data)) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const arrayBuffer = await generateExcel(data);

        return new NextResponse(arrayBuffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="po_data.xlsx"',
            },
        });
    } catch (error) {
        console.error('Error generating Excel:', error);
        return NextResponse.json({ error: 'Failed to generate Excel' }, { status: 500 });
    }
}
