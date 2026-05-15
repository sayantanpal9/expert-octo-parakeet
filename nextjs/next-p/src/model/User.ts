import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        required: true,
        default:Date.now
        
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: number;
    codeExpiry: Date;
    verified: boolean;
    active: boolean;
    messages: Message[];
} 

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required:[true,'password is required']
    },
    verifyCode: {
        type: Number,
        required:[true,'verification code is required to log in']
    },
    codeExpiry: {
        type: Date,
        required:[true,'verification code expiry date is required']
    },
    verified: {
        type: Boolean,
        default:false,
    },
    active: {
        type: Boolean,
        default:true,
    },
    messages: [MessageSchema]

})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema))
const MessageModel = (mongoose.models.Message as mongoose.Model<Message>) || (mongoose.model<Message>('Message', MessageSchema))

export {UserModel, MessageModel}