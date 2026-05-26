import { cn } from "@/lib/utils"

const styles = {
  default: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  destructive: "border-transparent bg-destructive text-destructive-foreground",
  outline: "text-foreground border border-gray-200 bg-transparent",
}

function Badge({ className, variant = "default", ...props }) {
  const variantStyle = styles[variant] || styles.default
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold",
        variantStyle,
        className
      )}
      {...props}
    />
  )
}

export { Badge }