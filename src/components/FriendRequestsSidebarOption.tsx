'use client'

import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { User } from 'lucide-react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

interface FriendRequestsSidebarOptionProps {
  sessionId: string,
  initialUnseenRequestsCount: number
  
}

const FriendRequestsSidebarOption: FC<FriendRequestsSidebarOptionProps> = ({ sessionId, initialUnseenRequestsCount }) => {
  const [unseenRequestsCount, setunseenRequestsCount] = useState<number>(initialUnseenRequestsCount);
  
  useEffect(()=>{
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`));

    const firendRequestsHandler = () => {
      setunseenRequestsCount((prev) => prev + 1)
    }

    pusherClient.bind('incoming_friend_requests', firendRequestsHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`));
      pusherClient.unbind('incoming_friend_requests', firendRequestsHandler);
    }    
  })

  return <Link href='/dashboard/requests' className='text-gray-700 duration-200 hover:text-blue-400 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
    <div className='text-gray-400 border-gray-200 duration-200 group-hover:border-blue-400 group-hover:text-blue-400 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
      <User className='w-4 h-4' />
    </div>
    <p className='trunkcate'>Friend requests {!!unseenRequestsCount && <span className='bg-red-400 p-1 px-2 ml-1 rounded-md text-white'>{unseenRequestsCount}</span>}</p>
  </Link>
}

export default FriendRequestsSidebarOption