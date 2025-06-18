import { ChatInterface } from "@/components/chat-interface";
import { Avatar3D } from "@/components/avatar-3d";

export default function Home() {
  return (
    <div className="container mx-auto p-4 h-screen flex flex-col md:flex-row gap-4">
      <div className="flex-1 flex flex-col">
        <ChatInterface />
      </div>
      <div className="w-full md:w-1/2 h-[400px] md:h-auto">
        <Avatar3D />
      </div>
    </div>
  );
} 