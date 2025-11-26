const fs = require('fs');

async function readPDF() {
    try {
        const pdfParse = require('pdf-parse');
        const pdfPath = './file/6000892522.pdf';
        const dataBuffer = fs.readFileSync(pdfPath);

        const data = await pdfParse(dataBuffer);

        console.log('=== PDF Content ===');
        console.log(data.text);

        console.log('\n=== Lines (first 100 lines) ===');
        const lines = data.text.split('\n');
        lines.slice(0, 100).forEach((line, i) => {
            if (line.trim()) {
                console.log(`Line ${i}: "${line}"`);
            }
        });

        // Save to file
        fs.writeFileSync('./pdf-content.txt', data.text);
        console.log('\n✓ Full content saved to pdf-content.txt');

    } catch (error) {
        console.error('Error:', error.message);
    }
}

readPDF();
