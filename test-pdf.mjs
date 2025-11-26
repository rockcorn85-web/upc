import fs from 'fs';
import pdfParse from 'pdf-parse';

async function testPDF() {
    try {
        const pdfPath = './file/6000892522.pdf';
        const dataBuffer = fs.readFileSync(pdfPath);

        const data = await pdfParse(dataBuffer);

        console.log('=== PDF TEXT CONTENT ===');
        console.log(data.text);
        console.log('\n=== TOTAL PAGES:', data.numpages);

        // Save to file for easier reading
        fs.writeFileSync('./pdf-output.txt', data.text);
        console.log('\nText saved to pdf-output.txt');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testPDF();
