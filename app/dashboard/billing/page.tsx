import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import prisma from '@/app/lib/db';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { getStripeSession } from '@/app/lib/stripe';
import { redirect } from 'next/navigation';
import { StripeSubscriptionCreationButton } from '@/app/components/SubmitButton';

const  featureItems = [
    {name: "Lorem Ipsum something"},
    {name: "Lorem Ipsum something"},
    {name: "Lorem Ipsum something"},
    {name: "Lorem Ipsum something"},
    {name: "Lorem Ipsum something"},
]

async function getData(userId: string){
    const data = await prisma.subscription.findUnique({
        where:{
           userId:userId, 
        },
        select:{
            status : true,
            user : {
                select:{
                    stripeCustomerId : true,
                }
            }
        }
    })

    return data;
}

export default async function BillingPage() {
    /**
     * Retrieves the user from the Kinde server session.
     * Kinde 서버 세션에서 사용자를 검색합니다.
     * @returns The user object.
     */
    const {getUser} = getKindeServerSession(); // Kinde 서버 세션에서 사용자를 검색합니다.
    const user = await getUser(); // 사용자 정보를 가져옵니다.
    const data = await getData(user?.id as string); // 사용자 정보를 가져옵니다.

    async function  createSubscription(){// 구독 생성
        "use server";// 서버 사용

        const dbUser = await prisma.user.findUnique({
            where : {
                id : user?.id
            },
            select : {
                stripeCustomerId : true
            }
        })


        if(!dbUser?.stripeCustomerId){ // 고객 ID를 가져올 수 없습니다.
            throw new Error("Unable to get customer id");// 고객 ID를 가져올 수 없습니다.
        }

        const subscriptionUrl = await getStripeSession({
            customerId: dbUser.stripeCustomerId,
            domainUrl  :   'http://localhost:3000',
            priceId: process.env.STRIPE_PRICE_ID as string,
        });// 스트라이프 세션을 가져옵니다.

        return redirect(subscriptionUrl);// 구독 URL로 리디렉션합니다.
    }

    return (
        <div className='max-w-md mx-auto space-x-4'>
    
            <Card className="flex flex-col">
                <CardContent className="py-8">
                    <div>
                        <h3 className='inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary'>Monthly</h3>
                    </div>

                    <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                    $30<span className='ml-1 text-2xl text-muted-foreground'>/mo</span>
                    </div>
                    <p className='mt-5 text-lg text-muted-foreground'>Write as many notes as you want for $30 a Month</p>
                </CardContent>

                <div className='flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 ms:pt-6'>
                    <ul className='space-y-4'>
                        {featureItems.map((item, index) => (
                            <li key={index} className='flex items-center'>
                              <div className='flex-shrink-0'>
                                <CheckCircle2 className="h-6 w-6 text-green-500"></CheckCircle2>
                              </div>
                              <p className='ml-3 text-base'>{item.name}</p>
                            </li>
                        ))}
                    </ul>

                    <form className='w-full' action={createSubscription}>
                        <StripeSubscriptionCreationButton/>
                    </form>
                </div>

            </Card>
        </div>
    );
}

