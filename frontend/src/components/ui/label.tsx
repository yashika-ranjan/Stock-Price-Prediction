// components/ui/label.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  asChild?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "label";
    return (
      <Comp
        ref={ref}
        className={cn("text-sm font-medium text-zinc-700 dark:text-zinc-300", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Label.displayName = "Label";

export { Label };
