import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InquiryModalContextType {
  isOpen: boolean;
  packageContext?: {
    packageName?: string;
    destination?: string;
    duration?: string;
    price?: number;
  };
  openInquiryModal: (options?: {
    packageName?: string;
    packageTitle?: string;
    destination?: string;
    duration?: string;
    price?: number;
    notes?: string;
  }) => void;
  openModal: (options?: {
    packageName?: string;
    packageTitle?: string;
    destination?: string;
    duration?: string;
    price?: number;
    notes?: string;
  }) => void;
  closeInquiryModal: () => void;
  closeModal: () => void;
}

const InquiryModalContext = createContext<InquiryModalContextType | undefined>(undefined);

export const InquiryModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [packageContext, setPackageContext] = useState<{
    packageName?: string;
    destination?: string;
    duration?: string;
    price?: number;
  } | undefined>(undefined);

  const openInquiryModal = (options?: {
    packageName?: string;
    destination?: string;
    duration?: string;
    price?: number;
  }) => {
    setPackageContext(options);
    setIsOpen(true);
  };

  const closeInquiryModal = () => {
    setIsOpen(false);
  };

  return (
    <InquiryModalContext.Provider value={{ 
      isOpen, 
      packageContext, 
      openInquiryModal, 
      openModal: openInquiryModal,
      closeInquiryModal,
      closeModal: closeInquiryModal
    }}>
      {children}
    </InquiryModalContext.Provider>
  );
};

export const useInquiryModal = () => {
  const context = useContext(InquiryModalContext);
  if (!context) {
    throw new Error('useInquiryModal must be used within an InquiryModalProvider');
  }
  return context;
};
