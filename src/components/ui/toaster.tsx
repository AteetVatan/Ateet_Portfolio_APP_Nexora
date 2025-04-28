
/**
 * Toaster Component
 * 
 * This component provides a toast notification system for the application.
 * Toast notifications are temporary messages that appear and disappear automatically,
 * often used to inform users about successful operations or errors.
 * 
 * It uses the custom useToast hook to manage toast state and renders each active toast
 * with appropriate styling.
 * 
 * Usage example:
 * ```
 * import { useToast } from "@/hooks/use-toast"
 * 
 * function MyComponent() {
 *   const { toast } = useToast()
 *   
 *   const handleAction = () => {
 *     toast({
 *       title: "Success",
 *       description: "Operation completed successfully"
 *     })
 *   }
 *   
 *   return <button onClick={handleAction}>Click me</button>
 * }
 * ```
 */

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  // Get all active toasts from the toast hook
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {/* Map through and render each toast notification */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      {/* ToastViewport defines the position where toasts appear */}
      <ToastViewport />
    </ToastProvider>
  )
}
