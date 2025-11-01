import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TodoToolbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <Input 
          placeholder="Search todos..."
        />
        {/* Done */}
        <Button></Button>
        <Button></Button>
      </div>
      <div></div>
    </div>
  );
};