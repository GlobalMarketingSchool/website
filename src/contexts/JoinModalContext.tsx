import { createContext, useContext, useState, ReactNode } from "react";

interface JoinModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const JoinModalContext = createContext<JoinModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function JoinModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <JoinModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
    </JoinModalContext.Provider>
  );
}

export function useJoinModal() {
  return useContext(JoinModalContext);
}
