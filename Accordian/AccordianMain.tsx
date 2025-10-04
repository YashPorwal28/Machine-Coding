import Accordian from "./Accordian";
import data from "./data";
import React, { useCallback, useState } from "react";
const AccordianMain = () => {
  const [activeAccordians, setActiveAccordians] = useState(new Set());
  const [multipleAllowed, setMultipleAllowed] = useState(true);
  
  const toggleAccordian = useCallback(
    (id) => {
      setActiveAccordians((prev)=>{
        const newSet = new Set(prev);
        if(newSet.has(id)){
          newSet.delete(id)
        }else {
          if(!multipleAllowed){
            return new Set([id])
          }else{
            newSet.add(id);
          }
        }
        return newSet;
      })
  
    },
    [multipleAllowed]
  );
  // const toggleAccordian = useCallback(
  //   (id) => {
  //         if (activeAccordians.has(id)) {
  //       const newSet = new Set(activeAccordians);
  //       newSet.delete(id);
  //       setActiveAccordians(newSet);
  //     } else {
  //       if (!multipleAllowed) {
  //         setActiveAccordians(new Set([id]));
  //       } else {
  //         setActiveAccordians((prev) => {
  //           const newSet = new Set(prev);
  //           newSet.add(id);
  //           return newSet;
  //         });
  //       }
  //     }
  
  //   },
  //   [multipleAllowed,]
  // );

  // added callback and react memo, so new function only created when mulitplec allowed is changed, and in the accordian added react memo, so , it only get re render when some new values comes
  // if we just add callback and memo, this wo break, so we would think adding activeaccordian in depdenecy array, but that would work, but we would go back to sequare 1 of optimization so use something like setstate 
 

//   Earlier, when you didn’t use React.memo and useCallback, here’s what happened:

// On every state change in AccordianMain, a new toggleAccordian function was created (new identity).

// React compared props in each child Accordian:

// toggleAccordian looked “different” every time (because function references are different).

// So React thought: props changed → re-render the child.

// Result → all accordions re-rendered on any click, even if only one was active.

// Now with React.memo + stable toggleAccordian:

// When you click one accordion, only that accordion’s isActive changes.

// Other accordions get the same props as before (isActive unchanged, toggleAccordian stable reference).

// React.memo says: props are the same → skip render.

// ✅ Only the clicked accordion re-renders.

  return (
    <>
      {data?.map((item) => {
        return (
          <Accordian
            key={item.id}
            isActive={activeAccordians.has(item.id)}
            title={item.title}
            description={item.info}
            id={item.id}
            toggleAccordian={toggleAccordian}
          />
        );
      })}
    </>
  );
};

export default AccordianMain;
