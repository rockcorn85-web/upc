const fs = require('fs');

async function testExtraction() {
    try {
        const pdfParse = require('pdf-parse');
        const pdfPath = './file/6000842997.pdf';
        const dataBuffer = fs.readFileSync(pdfPath);

        const data = await pdfParse(dataBuffer);
        const text = data.text;

        const lines = text.split('\n').map(l => l.trim());

        console.log('=== Looking for UPC patterns ===');
        let count = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const upcMatch = line.match(/^(\d{12})/);
            if (upcMatch) {
                count++;
                console.log(`\n${count}. Found UPC at line ${i}:`);
                console.log(`   UPC: ${upcMatch[1]}`);
                console.log(`   Full line: "${line}"`);

                // Show next 8 lines
                for (let j = i + 1; j < Math.min(i + 9, lines.length); j++) {
                    console.log(`   +${j - i}: "${lines[j]}"`);
                }
            }
        }

        console.log(`\n\nTotal UPC found: ${count}`);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

testExtraction();
