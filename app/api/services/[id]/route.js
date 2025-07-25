import connectDB from "@/app/config/database";
import Service from "@/app/models/service";

export const GET= async(request,{params})=>{
     try{
        await connectDB();
        const service = await Service.findById(params.id);
        if(!service) return Response('service not found',{status:404});
        return new Response(service,
      {status:200} );
     } catch(error){
        return new Response("something went wrong",{status:500});  
     }
    };