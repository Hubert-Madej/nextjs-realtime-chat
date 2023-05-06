import FriendRequestsSidebarOption from '@/components/FriendRequestsSidebarOption'
import { Icon, Icons } from '@/components/ui/Icons'
import SignOutButton from '@/components/SignOutButton'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { fetchRedis } from '../../helpers/redis'
import { getFriendsByUserId } from '@/helpers/get-friends-by-user-id'
import SidebarChatsList from '@/components/SidebarChatsList'

interface LayoutProps {
 children: ReactNode
}

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  icon: Icon
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: 'Add friend',
    href: '/dashboard/add',
    icon: 'UserPlus'
  }
]

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions)

  if (!session) notFound()

  const friends = await getFriendsByUserId(session.user.id);

  const unseenRequestsCount = (await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_requests`) as User[]).length;

  return <div className='w-full flex h-screen'>
      <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6'>
        <Link href='/dashboard' className='flex h-16 shrink-0 items-center'>
          <h1 className='font-semibold text-3xl leading-6 tracking-wider text-gray-400'>Chat<span className='ml-2 font-medium text-indigo-600'>App</span></h1>
        </Link>
          {friends.length > 0 && <div className='text-xs font-semibold leading-6 text-gray-400'>Your chats</div>}

          <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
              {friends.length > 0 && 
                <li>
                    <SidebarChatsList friends={friends} sessionId={session.user.id} />
                </li>
              }
              <li>
                <div className='text-xs font-semibold leading-6 text-gray-400'>
                  Activity
                </div>

                <ul role='list' className='-mx-2 mt-2 space-y-1'>
                  {sidebarOptions.map((option) => {
                      const Icon = Icons[option.icon]
                      return (
                        <li key={option.id}>
                          <Link href={option.href} className='text-gray-700 duration-200 hover:text-blue-400 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
                            <span className='text-gray-400 border-gray-200 duration-200 group-hover:border-blue-400 group-hover:text-blue-400 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
                              <Icon className='h-4 w-4' />
                            </span>
                            <span className='trunkcate'>{option.name}</span>
                          </Link>
                        </li>
                      )
                  })}
                  <li>
                    <FriendRequestsSidebarOption sessionId={session.user.id} initialUnseenRequestsCount={unseenRequestsCount} />
                  </li>
                </ul>
              </li>

              <li className='-mx-6 mt-auto flex items-center border-t border-gray-200'>
                  <div className='flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900'>
                    <div className='relative h-8 w-8 bg-gray-50'>
                      <Image 
                      fill
                      referrerPolicy='no-referrer'
                      className='rounded-full'
                      src={session.user.image || ''} 
                      alt='Your profile picture' />
                    </div>

                    {/* Accesebility feature for screen readers */}
                    <span className='sr-only'>Your profile</span>
                    <div className='flex flex-col'>
                      <span aria-hidden='true'>{session.user.name}</span>
                      <span className='text-xs text-zinc-400 w-36 truncate' aria-hidden="true">{session.user.email}</span>
                    </div>
                  </div>

                  <SignOutButton className='h-full aspect-square'></SignOutButton>
              </li>
            </ul>
          </nav>
        </div>
        {children}
    </div>
}

export default Layout 