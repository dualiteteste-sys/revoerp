const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const maxFileNumber = 458;
let deletedCount = 0;
let errorCount = 0;

console.log('Iniciando limpeza de arquivos desnecessários...');

for (let i = 0; i <= maxFileNumber; i++) {
  const fileName = String(i);
  const filePath = path.join(projectRoot, fileName);

  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      deletedCount++;
    } catch (err) {
      console.error(`Erro ao remover o arquivo ${fileName}:`, err.message);
      errorCount++;
    }
  }
}

console.log('--------------------');
console.log('Limpeza concluída.');
console.log(`Total de arquivos removidos: ${deletedCount}`);
if (errorCount > 0) {
  console.log(`Arquivos com erro: ${errorCount}`);
}
console.log('--------------------');
