export {
  Root as Dialog,
  Trigger as DialogTrigger,
  Portal as DialogPortal,
  Overlay as DialogOverlay,
  Content as DialogContent,
  Title as DialogTitle,
  Description as DialogDescription
} from "@radix-ui/react-dialog";

export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 pt-4">{children}</div>
);

export const DialogFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 pb-4 flex justify-end gap-2">{children}</div>
);
