import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = ({ className, ...props }) => (
  <ToastPrimitives.Viewport
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
)

const Toast = ({ className, ...props }) => (
  <ToastPrimitives.Root
    className={cn(
      "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg",
      className
    )}
    {...props}
  />
)

const ToastTitle = ({ className, ...props }) => (
  <ToastPrimitives.Title className={cn("text-sm font-semibold", className)} {...props} />
)

const ToastDescription = ({ className, ...props }) => (
  <ToastPrimitives.Description className={cn("text-sm opacity-90", className)} {...props} />
)

const ToastClose = ({ className, ...props }) => (
  <ToastPrimitives.Close
    className={cn("absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100", className)}
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
)

export { Toast, ToastTitle, ToastDescription, ToastClose, ToastProvider, ToastViewport }

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}