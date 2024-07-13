import { RefObject } from 'react';

export const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
   const boundingBox = ref.current?.getBoundingClientRect();

   window.addEventListener('click', e => {
      if (!boundingBox) return;

      const clickWithin =
         e.clientX >= boundingBox?.left &&
         e.clientX <= boundingBox?.right &&
         e.clientY >= boundingBox?.top &&
         e.clientY <= boundingBox?.top + boundingBox?.height;

      console.log({ clickWithin });

      if (!clickWithin) callback();
   });
};
