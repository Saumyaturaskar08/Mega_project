import mongoose from "mongoose";
const MONGODB_URL = "mongodb+srv://saumyaturaskar:VQlMrH7WRhYGxTgg@cluster0.fjdl604.mongodb.net/Ecomm"
const connect = ()=>{
    mongoose.connect(MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log(`DB conncet`))
    .catch((error)=>{
        console.log("DB conncet failed");
        console.log(error)
        process.exit(1)
    })
}

export default connect