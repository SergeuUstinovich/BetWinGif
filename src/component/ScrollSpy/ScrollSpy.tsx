import style from "./ScrollSpy.module.scss";
import { scrollItems } from "../../types/ScrollSpyArr";

export interface scrollSpyProps {
  id: number;
  label: string;
  link?: string;
}

export const ScrollSpy = () => {
  return (
    <div className="flex w-full">
      <div
        className="flex flex-col grow relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:border-l before:border-gray-200 gap-1 shrink-0 w-[125px]"
        data-scrollspy="true"
        data-scrollspy-offset="30px|lg:50px"
        data-scrollspy-target="#scrollable_1"
      >
        {scrollItems.map((item) => (
          <a
            key={item.id}
            className={`${style.scrollLink} flex items-center rounded-lg pl-2.5 pr-2.5 py-2.5 gap-1.5 border border-transparent text-2sm font-medium text-gray-700 hover:text-primary scrollspy-active:bg-secondary-active scrollspy-active:text-primary`}
            data-scrollspy-anchor="true"
            href="#item_1"
          >
            <span className="flex w-1.5 relative before:absolute before:top-0 before:left-px before:size-1.5 before:rounded-full before:-translate-x-2/4 before:-translate-y-2/4 scrollspy-active:before:bg-primary"></span>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};
