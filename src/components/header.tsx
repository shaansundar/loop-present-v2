"use client"
import React from 'react'
import { Switch } from './ui/switch'
import { useEnvState } from '@/hooks/env-state'
import { useHealthCheck } from '@/hooks/health-check'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge';
import { Separator } from './ui/separator';
const Header = () => {
    const [isProxy, setIsProxy] = useEnvState();
    const { data: isHealthCheck, isLoading } = useHealthCheck({ isProxy });


    return (
        <div className='w-full !h-16 border-b flex items-center justify-between px-4 py-2'>
            <h1 className='text-2xl font-bold'>Loop Present v2</h1>
            <div className='flex items-center gap-4'>
                <Badge className={clsx('flex items-center gap-2', isLoading ? 'bg-yellow-500' : isHealthCheck ? 'bg-green-500' : 'bg-red-500')}>
                    <p className='text-sm font-medium'>{isLoading ? 'Checking Connection...' : isHealthCheck ? 'Server Connected' : 'Server Not Found'}</p>
                </Badge>
                <Separator orientation='vertical' className='h-4' />
                <p className='text-sm font-medium -mr-2'>Proxy? </p>
                <Switch checked={isProxy} onCheckedChange={setIsProxy} />
            </div>
        </div>
    )
}

export default Header