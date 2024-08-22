import { AccordionArrProps } from "../../types/AccordionType";
import style from "./Accordion.module.scss";
import AccordionItem from "./AccordionItem";

export const Accordion = ({ arrAccord }: AccordionArrProps) => {
  return (
    <div
      className={`${style.accordion} m-auto max-w-[1140px]`}
      data-accordion="true"
    >
      <h2 className={style.accordionTitle}>FAQ</h2>
      <ul>
        {arrAccord.map((item) => (
          <li key={item.id}>
            <AccordionItem id={item.id} title={item.title} text={item.text} />
          </li>
        ))}
      </ul>
    </div>
  );
};
