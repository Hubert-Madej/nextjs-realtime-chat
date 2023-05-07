'use client'

import { pusherClient } from '@/lib/pusher'
import { chatHrefConstructor, toPusherKey } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import NewMessageToast from './NewMessageToast'

interface SidebarChatsListProps {
  sessionId: string,
  friends: User[] 
}

interface ExtendedMessage extends Message {
  senderImage: string;
  senderName: string;
}

const SidebarChatsList: FC<SidebarChatsListProps> = ({sessionId, friends}) => {
  const router = useRouter();
  const pathName = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(()=>{
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`))

    const chatHandler = (newMessage: ExtendedMessage) => {
      const shouldNotify = pathName !== `/dashboard/chat/${chatHrefConstructor(sessionId, newMessage.senderId)}`;
      if (!shouldNotify) return;
      
      toast.custom((t) => (
        <NewMessageToast t={t} sessionId={sessionId} senderId={newMessage.senderId} senderImage={newMessage.senderImage} senderName={newMessage.senderName} senderMessage={newMessage.text} />
      ))


      setUnseenMessages((prev) => [newMessage, ...prev]);
    }

    const friendHandler = () => {
      router.refresh();
    }

    pusherClient.bind('new_message', chatHandler);
    pusherClient.bind('new_friend', friendHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`))

      pusherClient.unbind('new_message', chatHandler);
      pusherClient.unbind('new_friend', friendHandler);
    }    
  }, [pathName, sessionId, router])

  useEffect(() => {
    if(pathName?.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev.filter((message) => !pathName.includes(message.senderId));
      })
    }
  }, [pathName]);

  return <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
    {friends.sort().map((friend) => {
      const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
        return unseenMessage.senderId === friend.id;
      }).length;

      return <li key={friend.id}>
        <a className='text-gray-700 hover:text-blue-40 duration-200 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold' href={`/dashboard/chat/${chatHrefConstructor(sessionId, friend.id)}`}>
          {friend.name}
          {unseenMessagesCount > 0 && (
            <div className='bg-blue-600 font-medium text-xs text-white w-5 h-5 rounded-full flex justify-center items-center'>
              {unseenMessagesCount}
            </div>
          )}
          </a>
      </li>
    })}
  </ul>
}
 
export default SidebarChatsList