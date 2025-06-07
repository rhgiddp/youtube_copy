import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubscriptionButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  isSubscribed: boolean;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | null;
}

export const SubscriptionButton = ({
  onClick,
  disabled,
  isSubscribed,
  className,
  size,
}: SubscriptionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size={size}
      className={cn(
        "w-full",
        isSubscribed && "bg-neutral-200 hover:bg-neutral-300 text-neutral-900",
        className
      )}
    >
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
};
