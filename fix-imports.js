import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixImportsInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Regex para encontrar imports relativos sin extensión
    const fixedContent = content.replace(
        /from\s+["'](\.\/.+?)["']/g,
        (match, importPath) => {
            // Si ya tiene extensión, no modificar
            if (importPath.endsWith('.js') || importPath.endsWith('.json')) {
                return match;
            }
            // Agregar .js a imports relativos
            return match.replace(importPath, importPath + '.js');
        }
    );
    
    if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent);
        console.log(`Fixed imports in: ${filePath}`);
    }
}

function fixImportsInDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            fixImportsInDirectory(filePath);
        } else if (file.endsWith('.js')) {
            fixImportsInFile(filePath);
        }
    });
}

const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    console.log('Fixing ES module imports...');
    fixImportsInDirectory(distPath);
    console.log('Import fixing completed!');
} else {
    console.log('Dist directory not found. Run build first.');
}
