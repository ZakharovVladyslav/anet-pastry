'use client';

import { Dialog, Transition } from '@headlessui/react';

import clsx from 'clsx';
import { Fragment, ReactNode } from 'react';

import './Modal.scss';

type TProps = {
   children?: ReactNode;
   size?: 'm' | 'l';
};

export const Modal = ({
   isOpened,
   onClose,
   children,
   size = 'm',
}: TProps & TModalProps) => {
   return (
      <Transition show={isOpened} as={Fragment}>
         <Dialog
            as="section"
            className="modalWrapper"
            open={isOpened}
            onClose={onClose}
            static
         >
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="backdrop" />
            </Transition.Child>

            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0 scale-95"
               enterTo="opacity-100 scale-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100 scale-100"
               leaveTo="opacity-0 scale-95"
            >
               <Dialog.Panel className={clsx('modal', size)}>{children}</Dialog.Panel>
            </Transition.Child>
         </Dialog>
      </Transition>
   );
};

export * from './products';
export * from './parameter';
