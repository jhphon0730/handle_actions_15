import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TodoToolbar = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex-1 flex items-center gap-2 max-w-2xs">
        <Input 
          type="search"
          placeholder="Search todos..."
        />
        {/* Done */}
        <Button
          type="button"
          variant="outline"
        ></Button>
        <Button
          type="button"
          variant="outline"
        ></Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
        >Add Todo</Button>
      </div>
    </div>
  );
};