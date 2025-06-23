"use client"
import React from 'react'
import { Switch } from './ui/switch'
import { useEnvState } from '@/hooks/env-state'
// import { useHealthCheck } from '@/hooks/health-check';
// import clsx from 'clsx';
// import { Badge } from '@/components/ui/badge';
const Header = () => {
    // const { isSuccess, isLoading } = useHealthCheck();
    const [isProxy, setIsProxy] = useEnvState();

    return (
        <div className='w-full !h-16 border-b flex items-center justify-between px-4 py-2'>
            <h1 className='text-2xl font-bold'>Loop Present v2</h1>
            {/* <Badge className={clsx('flex items-center gap-2', isLoading ? 'bg-yellow-500' : isSuccess ? 'bg-green-500' : 'bg-red-500')}>
                <p className='text-sm font-medium'>{isLoading ? 'Checking Connection...' : isSuccess ? 'Server Connected' : 'Server Not Found'}</p>
            </Badge> */}
            <div className='flex items-center gap-2'>
                <p className='text-sm font-medium'>Proxy? </p>
                <Switch checked={isProxy} onCheckedChange={setIsProxy} />
            </div>
        </div>
    )
}

export default Header