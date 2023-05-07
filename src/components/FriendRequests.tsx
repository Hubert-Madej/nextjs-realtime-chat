'use client'

import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import axios, { AxiosError } from 'axios';
import { Check, UserPlus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

interface FriendRequestsProps {
  sessionId: string;
  incomingFriendRequests: IncomingFriendRequest[]
}

const FriendRequests: FC<FriendRequestsProps> = ( {sessionId, incomingFriendRequests} ) => {
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(incomingFriendRequests);

  useEffect(()=>{
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`));

    const firendRequestsHandler = (incomingFriendRequest :IncomingFriendRequest) => {
      setFriendRequests((prev) => [...prev, incomingFriendRequest])
    }

    pusherClient.bind('incoming_friend_requests', firendRequestsHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`));
      pusherClient.unbind('incoming_friend_requests', firendRequestsHandler);
    }    
  })

  const acceptFriend = async (senderId: string) => {
    try {
      await axios.post('/api/friends/accept', {id: senderId})

      setFriendRequests((prev) => 
        prev.filter((request) => request.senderId !== senderId)  
      )

      router.refresh();

      toast.success(`Successffuly accepted friend request!`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data)
        return;
      }

      toast.error('Something went wrong.')
    }
  }

  const rejectFriend = async (senderId: string) => {
    try {
      await axios.post('/api/friends/reject', {id: senderId})

      setFriendRequests((prev) => 
        prev.filter((request) => request.senderId !== senderId)  
      )

      router.refresh();

      toast.success(`Successffuly rejected friend request`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data)
        return;
      }

      toast.error('Something went wrong.')
    }
  }

  return <>
    {friendRequests.length === 0 ? (
      <p className='text-sm text-zinc-500'>Nothing to show here...</p>
    ) : (
        friendRequests.map((friendRequest: IncomingFriendRequest) => 
          <div key={friendRequest.senderId} className='flex gap-4 items-center'>
            <UserPlus className='text-black' />
            <p className='font-medium text-lg'>{friendRequest.senderEmail}</p>
            <button onClick={() => acceptFriend(friendRequest.senderId)} aria-label='accept friend' className='w-8 bg-green-400 hover:bg-green-500 grid place-items-center rounded-full transition hover:shadow-md'>
              <Check className='font-semibold text-white w-3/4 h-3/4' />
            </button>
            <button onClick={() => rejectFriend(friendRequest.senderId)} aria-label='reject friend' className='w-8 bg-red-400 hover:bg-red-500 grid place-items-center rounded-full transition hover:shadow-md'>
              <X className='font-semibold text-white w-3/4 h-3/4' />
            </button>
          </div>
        )
    )}
  </>
}

export default FriendRequests 