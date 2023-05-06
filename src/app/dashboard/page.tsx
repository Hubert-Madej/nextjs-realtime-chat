import Button from '@/components/ui/Button';
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return ( <div className="p-8">
    <Button type="button">Initial Application Template</Button>
  </div> );
}

export default page