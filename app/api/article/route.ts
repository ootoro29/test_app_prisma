import { prisma } from "@/app/db"
import { zAirticle } from "@/app/type";
import { NextRequest, NextResponse } from "next/server"
export const GET = async(req:NextRequest) => {
    try{
        const article = await prisma.article.findMany();
        return new NextResponse(JSON.stringify(article),{status:200});
    } catch(e){
        return new NextResponse(JSON.stringify(e),{status:500});
    }
}
export const POST = async(req:NextRequest) => {
    const data = await req.json();
    const parsedData = zAirticle.parse(data);
    try{
        const article = await prisma.article.create({
            data:{
                title:parsedData.title,
                content:parsedData.content
            }
        })
        return new NextResponse(JSON.stringify(article),{status:201});
    } catch(e){
        return new NextResponse("error:",{status:500});
    }
}