// Import necessary modules from React
import React, { Children, FC, ReactNode } from 'react';

// Define the props for the Show component
interface ShowProps {
   children: ReactNode; // The children of the Show component
}

// Define the props for the When component
interface WhenProps {
   children: ReactNode; // The children of the When component
   condition: boolean; // The condition to check in the When component
}

// Define the props for the Else component
interface ElseProps {
   children: ReactNode; // The children of the Else component
   render?: ReactNode; // Optional render prop for the Else component
}

// Define the Show component
export const Show: FC<ShowProps> & {
   When: FC<WhenProps>; // Define the When sub-component
   Else: FC<ElseProps>; // Define the Else sub-component
} = ({ children }) => {
   let when: ReactNode = null; // Initialize the when variable
   let otherwise: ReactNode = null; // Initialize the otherwise variable

   // Iterate over the children of the Show component
   Children.forEach(children, child => {
      // Check if the child is a valid React element
      if (React.isValidElement(child)) {
         // If the child does not have the isTrue prop, it is the Else component
         if (child.props.condition === undefined) {
            otherwise = child;
         }
         // If the child has the isTrue prop and it is true, it is the When component
         else if (!when && child.props.condition === true) {
            when = child;
         }
      }
   });

   // Return the When component if it exists, otherwise return the Else component
   return when || otherwise;
};

// Define the When sub-component
Show.When = ({ condition, children }: WhenProps) => condition && children;

// Define the Else sub-component
Show.Else = ({ children, render }: ElseProps) => render || children;
