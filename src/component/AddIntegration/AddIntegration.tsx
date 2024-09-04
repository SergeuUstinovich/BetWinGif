import style from "./AddIntegrations.module.scss";
import Integration from "../../assets/img/png/addIntegrations.webp";

export const AddIntegrations = () => {
      return (
        <div className={`${style.integrationBlock}`}>
          <img className={style.integrationImg} src={Integration} alt="" />
          <h2 className={style.integrationTitle}>Add New Integration</h2>
          <p className={style.integrationLabel}>
            Explore New Integration: Expand Your Toolkit with Cutting-Edge,
            User-Friendly Solutions Tailored for Efficient and Innovative Project
            Management.
          </p>
        </div>
      );
};
