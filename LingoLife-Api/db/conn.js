import mongoose from "mongoose"; 

async function main() {
    try {
        await mongoose.connect(
            "mongodb+srv://hiroki:lingolifepassword@cluster1.kdfzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
        );
        console.log("Conectado ao banco");
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

export default main; 
