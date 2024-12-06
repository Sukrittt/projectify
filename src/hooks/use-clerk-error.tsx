import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

import { useToast } from "./use-toast";

import { z } from "zod";

export const useClerkError = () => {
  const { toast } = useToast();

  function catchClerkError(err: unknown) {
    const title = "Uh oh! Something went wrong.";
    const unknownErr = "There was a problem with your request.";

    if (err instanceof z.ZodError) {
      const errors = err.issues.map((issue) => {
        return issue.message;
      });
      return toast({
        title,
        description: errors.join("\n"),
      });
    } else if (isClerkAPIResponseError(err)) {
      return toast({
        title,
        description: err.errors[0]?.longMessage ?? unknownErr,
      });
    } else {
      return toast({
        title,
        description: unknownErr,
      });
    }
  }

  return { catchClerkError };
};
