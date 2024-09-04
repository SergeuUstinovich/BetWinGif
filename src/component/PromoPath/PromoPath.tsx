import { useSelector } from "react-redux";
import { getUser } from "../../providers/StoreProvider/selectors/getUser";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { useState } from "react";
import style from "./PromoPath.module.scss";
import { useMutation } from "@tanstack/react-query";
import { pathPromocode } from "../../api/authUser";
import { queryClient } from "../../api/queryClient";
import toast from "react-hot-toast";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";

function PromoPath() {
  const promo = useSelector(getUser);
  const token = useSelector(getTokenUser)
  const { t } = useTranslation();
  const [promoCode, setPromoCode] = useState("");
  const [inputHidden, setInputHidden] = useState(false);
  const handleInputHidden = () => {
    setInputHidden((prev) => !prev);
  };

  const mutatePathPromo = useMutation({
    mutationFn: (data: { token: string; promocode: string }) =>
      pathPromocode(data.token, data.promocode),
    onSuccess: (data) => {
        toast.success(data)
        queryClient.invalidateQueries({queryKey: ['user']})
    }
  }, queryClient);

  const handlePath = () => {
    mutatePathPromo.mutate({token, promocode: promoCode})
  }

  return (
    <div>
      <p>{`${t("My promo code")}: ${promo?.promocode}`}</p>
      <Button
        className={inputHidden ? style.change : style.btn}
        onClick={handleInputHidden}
      >
        {!inputHidden ? t("Change promo code") : "Отмена"}
      </Button>
      {inputHidden && (
        <div>
          <label className={style.label} htmlFor="">
            <span>Promocode</span>
            <div className={`input max-w-72`} data-toggle-password="true">
              <input
                autoComplete="promo"
                placeholder="Promocode"
                type={"text"}
                onChange={(e) => setPromoCode(e.target.value)}
                maxLength={15}
              />
            </div>
          </label>
          <Button onClick={handlePath} className={style.btn}>{t("Change promo code")}</Button>
        </div>
      )}
      {mutatePathPromo.error && <span className={style.error}>{mutatePathPromo.error.message}</span>}
    </div>
  );
}

export default PromoPath;
