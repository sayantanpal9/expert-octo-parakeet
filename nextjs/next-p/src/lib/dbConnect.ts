import mongoose, { Connection } from "mongoose";
import { promise } from "zod";

type ConnectionObject = {
    isConnected?:number
}

const connection : ConnectionObject={}

async function dbConnect():Promise<void> {
    if (connection.isConnected) {
        console.log('database already connected')
        return;
    }
    
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')
        console.log(db)
        connection.isConnected = db.connections[0].readyState;
        console.log('db connection succesful!')

    }
    catch (error) {
        console.log('error in db connection', error);
        process.exit(1);
    }
}

export default dbConnect;

