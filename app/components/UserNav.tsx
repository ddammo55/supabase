import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {  Button }  from "@/components/ui/button"
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function UserNav() {
    return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="" />
                </Avatar>
            </Button>
         </DropdownMenuTrigger>
      </DropdownMenu>
    );
}

