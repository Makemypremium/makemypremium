import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-muted z-50 flex items-center justify-center">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </div>
  );
};

export default Loading;
