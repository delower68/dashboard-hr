import { NextResponse } from 'next/server'

export default function middleware(req){
    let verify = req?.localStorage?.get("user");
    let url = req?.url
    if(verify && url?.includes('/')){
        return NextResponse?.redirect('http://localhost:3000/')
    }
}

