import { useEffect, useRef, useState } from "react";
import style from "./AccordionItem.module.scss";
import { AccordionProps } from "../../types/AccordionType";

function AccordionItem({ id, title, text }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(null);
  const contentRef = useRef(null);

  const handleOpenAccord = (id) => {
    if (id === isOpen) {
      setIsOpen(null);
    } else {
      setIsOpen(id);
    }
  };

  useEffect(() => {
    if (isOpen === id) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else {
      contentRef.current.style.maxHeight = "0px";
    }
  }, [isOpen, id]);

  return (
    <div
      className="accordion-item"
      data-accordion-item="true"
      id="accordion_1_item_1"
    >
      <button
        onClick={() => handleOpenAccord(id)}
        className="accordion-toggle py-4 group"
        data-accordion-toggle="#accordion_1_content_1"
      >
        <span className="text-base text-gray-900 font-medium">{title}</span>
        {id === isOpen ? (
          <i className="ki-outline ki-minus text-gray-600 text-2sm accordion-active:block block"></i>
        ) : (
          <i className="ki-outline ki-plus text-gray-600 text-2sm accordion-active:hidden block"></i>
        )}
      </button>
      <div
        ref={contentRef}
        className={`${style.accordion__content} ${
          id === isOpen ? `${style.open}` : ""
        }`}
        id="accordion_1_content_1"
      >
        <div className="text-gray-700 text-md pb-4">{text}</div>
      </div>
    </div>
  );
}

export default AccordionItem;
