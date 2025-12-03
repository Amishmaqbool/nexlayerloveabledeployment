import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(174_100%_50%/0.3)] hover:shadow-[0_0_30px_hsl(174_100%_50%/0.5)] hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary/60 bg-transparent text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_20px_hsl(174_100%_50%/0.3)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: 
          "text-foreground hover:bg-primary/10 hover:text-primary",
        link: 
          "text-primary underline-offset-4 hover:underline",
        neon:
          "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(174_100%_50%/0.4),0_0_40px_hsl(174_100%_50%/0.2)] hover:shadow-[0_0_30px_hsl(174_100%_50%/0.6),0_0_60px_hsl(174_100%_50%/0.4)] hover:scale-105",
        "neon-outline":
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_15px_hsl(174_100%_50%/0.3)] hover:shadow-[0_0_25px_hsl(174_100%_50%/0.5)]",
        gold:
          "bg-accent text-accent-foreground shadow-[0_0_20px_hsl(45_100%_60%/0.3)] hover:shadow-[0_0_30px_hsl(45_100%_60%/0.5)] hover:scale-105",
        "gold-outline":
          "border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base",
        xl: "h-16 rounded-2xl px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
