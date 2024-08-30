import style from "./Cards.module.scss";
import CardOne from "../../assets/img/jpg/staticCardOne.jpg";
import CardTwo from "../../assets/img/jpg/staticCardTwo.jpg";

export const Cards = () => {
  return (
    <div className={`${style.cards}`}>
      <div className="card">
        <div className="card-body flex gap-10 justify-center">
          <div className="flex flex-col justify-center">
            <h3 className={style.cardsTitle}>Questions?</h3>
            <p className={style.cardsText}>
              Visit our Help Center for detailed assistance on billing,
              payments, and subscriptions.
            </p>
          </div>
          <img src={CardOne} alt="Questions?" />
        </div>
        <div className="card-footer justify-center">
          <a className={`${style.cardLink} btn btn-link`} href="#">
            Go to Help Center
          </a>
        </div>
      </div>

      <div className="card">
        <div className="card-body flex gap-10 justify-center">
          <div className="flex flex-col justify-center">
            <h3 className={style.cardsTitle}>Contact Support</h3>
            <p className={style.cardsText}>
              Need assistance? Contact our support team for prompt, personalized
              help your queries & concerns.
            </p>
          </div>
          <img src={CardTwo} alt="Contact Support" />
        </div>
        <div className="card-footer justify-center">
          <a className={`${style.cardLink} btn btn-link`} href="#">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};
