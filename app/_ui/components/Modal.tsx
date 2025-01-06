"use client";

import { useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  overlayClassName: string
}

export default function Modal({ isOpen, onClose, children, overlayClassName }: ModalProps) {
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
      className={`fixed inset-0 z-[10000] flex ${overlayClassName}`}
      role="dialog"
      aria-modal="true"
    >
      <div className="max-w-[1040px] w-full m-auto py-24 px-1 relative">
        <Button onClick={onClose} className="absolute top-6 left-0 p-0" variant={"mediumLike"}>
          <ArrowLeft className="!h-8 !w-8" />
        </Button>
        {children}
      </div>
    </div>
  );
}
