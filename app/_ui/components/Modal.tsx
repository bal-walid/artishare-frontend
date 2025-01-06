"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex bg-white"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-w-[1040px] w-full m-auto py-24 px-1 relative">
        <Button onClick={onClose} className="absolute top-0 right-0 p-0" variant={"mediumLike"}>
          <X className="!h-8 !w-8" />
        </Button>
        {children}
      </div>
    </div>
  );
}
