"use client"; 

import React, { useState, useEffect } from 'react';

import { Card, CardContent } from "@/components/ui/card"; 

import { MAX_FREE_COUNTS } from '@/constants';

import { Progress } from "./ui/progress"; 
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { useProModal } from '@/hooks/use-pro-modal';

interface FreeCounterProps { 
    apiLimitCount: number; 
    isPro:boolean; 
    limit:number; 
}; 


export const FreeCounter: React.FC<FreeCounterProps> = ({ apiLimitCount = 0, isPro = false, limit }) => {
    const proModal = useProModal(); 
    // console.log({
    //     apiLimitCount,
    //     isPro,
    //     limit,
    // })
    const [mounted, setMounted] = useState(false); 

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // if (isPro) { 
    //     return null; 
    // }
    let mainCount;
    let final;
    if(isPro){
        mainCount = limit
          final= mainCount -apiLimitCount
    }else{
        mainCount = MAX_FREE_COUNTS
        final = apiLimitCount
    }


    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>{limit ? final : apiLimitCount} / {limit ? limit : MAX_FREE_COUNTS} {isPro ? "" :"Free"} Generations</p>   
                        <Progress 
                        className="h-3"
                            value={( final / mainCount) * 100}
                        />
                    </div>
                    {
                        !isPro &&
                        <Button onClick={proModal.onOpen} className="w-full" variant="premium">
                            Upgrade
                            <Zap className="w-4, h-4, ml-2 , fill-white" />
                        </Button>
                    }
                </CardContent>
            </Card>
        </div>
    );
};