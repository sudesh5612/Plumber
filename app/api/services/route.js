import connectDB from "@/app/config/database";
import Service from "@/app/models/service";

export const GET= async()=>{
     try{
        await connectDB();
        const services = await Service.find({});
        return new Response(services,
      {status:200} );
     } catch(error){
        return new Response("something went wrong",{status:500});  
     }
    };