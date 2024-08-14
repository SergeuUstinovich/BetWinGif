import style from './Accordion.module.scss'

export const Accordion = () => {
  return (
    <div className={style.accordion} data-accordion="true">
      <div
        className="accordion-item active [&:not(:last-child)]:border-b border-b-gray-200"
        data-accordion-item="true"
        id="accordion_2_item_1"
      >
        <button
          className="accordion-toggle py-4 group"
          data-accordion-toggle="#accordion_2_content_1"
        >
          <span className="text-base text-gray-900 font-medium">
            How is pricing determined for each plan ?
          </span>
          <i className="ki-outline ki-plus text-gray-600 text-2sm accordion-active:hidden block"></i>
          <i className="ki-outline ki-minus text-gray-600 text-2sm accordion-active:block hidden"></i>
        </button>
        <div className="accordion-content" id="accordion_2_content_1">
          <div className="text-gray-700 text-md pb-4">
            Metronic embraces flexible licensing options that empower you to
            choose the perfect fit for your project's needs and budget.
            Understanding the factors influencing each plan's pricing helps you
            make an informed decision.
          </div>
        </div>
      </div>
    </div>
  )
}
