"use client";

import React, {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Modal = ({
  children,
  openModal,
  closeModal
}: {
  children: React.ReactNode;
  openModal: boolean;
  closeModal:  () => void
}) => {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        closeModal();
      }
    },
    [closeModal, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      {openModal && (
        <div
          ref={overlay}
          className="flex-center fixed inset-0 z-30 mx-auto max-h-screen overflow-auto bg-black/50 p-5"
          onClick={onClick}
        >
          <div
            ref={wrapper}
            className="absolute top-1/2  -translate-y-1/2  p-4 bg-white rounded-md max-w-xl m-5 overflow-auto"
          >
            {children}
          </div>

          <Image
            src="/assets/icons/close.svg"
            alt="close"
            width={48}
            height={48}
            onClick={closeModal}
            className="absolute right-10 top-10 cursor-pointer max-md:hidden"
          />
        </div>
      )}
    </>
  );
};
export default Modal;
