import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import prisma from '@/app/lib/db';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { File } from 'lucide-react';

// 사용자 ID를 매개변수로 받아와서 해당 사용자의 노트 데이터를 가져오는 비동기 함수입니다.
async function getData(userId: string) {
    const data = await prisma.note.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return data;
}

export default async function Dashboard() {
    const {getUser} = getKindeServerSession(); // Kinde 서버 세션에서 사용자를 검색합니다.
    const user = await getUser(); // 사용자 정보를 가져옵니다.
    const data = await getData(user?.id as string); // 사용자 정보를 가져옵니다.
    return (
        <div className='grid items-start gap-y-8'>
            <div className="flex items-center justify-between px-2">
                <div className="grid gap-1">
                    <h1 className='text-3xl md:text-4xl'>Your Notes</h1>
                    <p className='text-lg text-muted-foreground'>Here you can see and create new notes</p>
                </div>

                <Button asChild>
                    <Link href="/dashboard/new">Create a new Note</Link>
                </Button>
            </div>

            {data.length < 1 ? (
                <div className='flex min-h-[400px] flex-col items-center justify-center border border-dashed p-8 text-center animate-in fade-in-50'>
                    <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
                        <File className='w-10 h-10 text-primary'/>
                    </div>

                    <h2 className='mt-6 text-xl font-semibold'>You dont have any notes created</h2>
                </div>
            ):(
                <div></div>
            )}
        </div>
    );
}

