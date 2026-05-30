import { feedbacks } from "@/lib/data";

import { NextResponse } from "next/server";

//GET FEEDBACKS
export async function GET() {
  console.log("feedbacks", feedbacks)
   return NextResponse.json(
    {feedbacks},
    {status: 200}
   )
  
}
//CREATE -POST

export async function POST(req: Request){
  const body = await req.json();


  
  if(!body.email){
    return NextResponse.json(
      {error: 'Email is required'},
      {status: 400}
    )
  }
  if(!body.content){
    return NextResponse.json(
      {error : 'Feedback is required'},
      {status: 400}
    )
  }
   const NewFeedback = {
    id: Date.now(),
    email: body.email,
    content: body.content
   }
   console.log(NewFeedback)
   feedbacks.push(NewFeedback)
   return NextResponse.json(
    {message : "FeedBack was sent successfully"},
    {status : 201}
   )
   
}