import  multer  from 'multer';

import path from 'path';

const storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,"uploads/");
    },
    filename:function (req,file,cb){
        cb(null,Date.now() + (file.originalname))
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de 2MB
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|pdf/; // Tipos de arquivo permitidos
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true); // Aceitar o arquivo
        } else {
            cb(new Error('Tipo de arquivo não permitido!'), false); // Rejeitar o arquivo
        }
    }
});

export default upload;