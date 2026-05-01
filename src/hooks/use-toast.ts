import { useCallback, useState } from "react"

export type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    (props: Toast) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newToast: Toast = { ...props, id }
      
      // Auto-dismiss after 4 seconds
      const timeout = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 4000)

      setToasts((prev) => [newToast, ...prev])
      
      return {
        id,
        dismiss: () => {
          clearTimeout(timeout)
          setToasts((prev) => prev.filter((t) => t.id !== id))
        },
      }
    },
    [],
  )

  return { toast, toasts }
}
