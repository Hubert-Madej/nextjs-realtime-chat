import Button from "@/components/ui/Button";
import { FunctionComponent } from "react";

interface pageProps {
  
}
 
const page: FunctionComponent<pageProps> = () => {
  return ( <div className="p-8">
    <Button>Initial Application Template</Button>
  </div> );
}
 
export default page;