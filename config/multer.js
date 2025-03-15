// Importando as bibliotecas necessárias para manipulação de arquivos
const multer = require("multer");
const path = require("path");

// Configuração do local e nome do arquivo que será salvo
const storage = multer.diskStorage({
  // Define a pasta onde os arquivos serão armazenados
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // A pasta onde as imagens serão salvas é "uploads/"
  },
  // Define o nome do arquivo. Usamos a data atual para garantir que o nome seja único
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único com a extensão do arquivo (ex: .jpg, .png)
  }
});

// Filtro que verifica se o tipo de arquivo é permitido
const fileFilter = (req, file, cb) => {
  // Tipos de arquivos permitidos: jpeg, png e jpg
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  
  // Se o arquivo for de um tipo permitido, o callback continua com a operação
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Arquivo aceito
  } else {
    // Caso o arquivo não seja permitido, retorna um erro
    cb(new Error("Tipo de arquivo não suportado"), false); // Arquivo não aceito
  }
};

// Configuração final do multer usando as opções de armazenamento e filtro de arquivos
const upload = multer({ storage, fileFilter });

// Expondo a configuração de upload para ser usada em outras partes do código
module.exports = upload;
