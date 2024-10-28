import { Forum } from "../models/Forum.js";
import fs from 'fs';
import multer from '../configMulter/multer.js';


const forumController = {

    create: async (req, res) => {
        try {
            const file = req.file;  
            const forum = {
                title: req.body.title,  
                content: req.body.content,  
                fileSrc: file ? file.path : null,
                language : req.body.language,
            };

            const response = await Forum.create(forum);
            res.status(201).json({ response, msg: "Publicação Postada no Fórum!" });

        } catch (error) {
            if (error instanceof multer.MulterError) {
                if (error.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({ msg: "Erro: O tamanho do arquivo não é permitido!" });
                }
            }
            console.log(error);
            res.status(500).json({ msg: "Erro ao criar a publicação!" });
        }
    },
    getAll: async(req,res) =>{
        try{
            const forumPublications = await Forum.find();

            res.json(forumPublications);
        }catch(error){
            console.log(error);
        }
    },

    get: async(req,res)=>{
        try {
            //id => URL == GET
            const id = req.params.id;
            const forumPublications = await Forum.findById(id);

            if(!forumPublications)
                {
                  res.status(404).json({msg:"Publicação não encontrada"});
                  return;
                }
            res.json(forumPublications);
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(req,res) => {
        try {
            
            const id = req.params.id;
            const forumPublications = await Forum.findById(id);

            if(!forumPublications)
                {
                  res.status(404).json({msg:"Publicação não encontrada"});
                  return;
                }
                
            if(forumPublications.fileSrc){
                fs.unlinkSync(forumPublications.fileSrc)
                const deletedPublication = await Forum.findByIdAndDelete(id);
                res.status(200).json({deletedPublication,msg:"Publicação deleteda com sucesso"});
            }
            else{
                const deletedPublication = await Forum.findByIdAndDelete(id);
                res.status(200).json({deletedPublication,msg:"Publicação deleteda com sucesso"});
            }
           
           
        } catch (error) {
            console.log(error);
        }
    },

    update: async(req,res)=>{
        const id = req.params.id;
        const existingPublication = await Forum.findById(id);

        if (!existingPublication) {
            return res.status(404).json({ msg: "Publicação não encontrada" });
        }

        const updatedPublication = {
        title: req.body.title || existingPublication.title,
        content: req.body.content || existingPublication.content,
        language:req.body.language || existingPublication.language,
    };

        const updatePublication = await Forum.findByIdAndUpdate(id,updatedPublication);

        res.status(200).json({updatePublication,msg:"Publicação Atualizada com sucesso"})
    }
};

export default forumController;