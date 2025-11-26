import ExcelJS from 'exceljs';
import { ExtractedData } from './extract';

export async function generateExcel(data: ExtractedData[]): Promise<ArrayBuffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('PO Data');

    worksheet.columns = [
        { header: 'Order Number', key: 'orderNumber', width: 15 },
        { header: 'Buyer Item', key: 'buyerItem', width: 15 },
        { header: 'Short Description', key: 'description', width: 30 },
        { header: 'Color', key: 'color', width: 10 },
        { header: 'Size', key: 'size', width: 10 },
        { header: 'SKU Number', key: 'sku', width: 15 },
        { header: 'UPC Number', key: 'upc', width: 15 },
        { header: 'Unique Number', key: 'unique', width: 12 },
    ];

    worksheet.addRows(data);

    // Style the header
    worksheet.getRow(1).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}
