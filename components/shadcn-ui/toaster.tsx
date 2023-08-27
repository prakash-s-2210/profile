"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/shadcn-ui/toast";
import { useToast } from "@/components/shadcn-ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="p-4 pr-10 sm:p-6 sm:pr-12 data-[state=open]:sm:slide-in-from-top-full"
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport className="sm:bottom-auto sm:left-1/2 sm:top-0 sm:-translate-x-1/2  md:w-fit md:max-w-none" />
    </ToastProvider>
  );
}
