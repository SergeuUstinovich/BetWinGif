import style from "./TopbarStatic.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { gifAdd, staticBanner } from "../../api/gifAdd";
import { queryClient } from "../../api/queryClient";
import { useDispatch, useSelector } from "react-redux";
import { gifActions } from "../../providers/StoreProvider";
import { getTokenUser } from "../../providers/StoreProvider/selectors/getTokenUser";
import { gifGenActions } from "../../providers/StoreProvider/slice/gifGenSlice";

export const TopbarStatic = () => {
  const { t, i18n } = useTranslation(); // можно передать подгружаемый файл 'main.json'
  const dispatch = useDispatch()
  const token = useSelector(getTokenUser)

  const toggle = (lng) => {
    i18n.changeLanguage(lng);
  };

  const mutateStaticAdd = useMutation({
    mutationFn: (data:{token:string}) => staticBanner(data.token),
    onSuccess: (data) => {
      dispatch(gifActions.gifAdd(data))
    }
  },queryClient)

  const handleGifAdd = () => {
    mutateStaticAdd.mutate({token})
  }

  return (
    <div className={`${style.topBar} flex items-center max-w-[1140px] m-auto`}>
      <select className={`${style.select} select`}>
        <option defaultValue='Страна'>
          Страна
        </option>
        <option value="en">England</option>
        <option value="ru">Россия</option>
        <option value="es">España</option>
        <option value="fr">France</option>
        <option value="de">Deutschland</option>
        <option value="zh">中文</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
        <option value="ar">العربية</option>
        <option value="pt">Portugal</option>
        <option value="it">Italia</option>
      </select>

      <select
        className={`${style.select} select`}
        onChange={(e) => toggle(e.target.value)}
      >
        <option defaultValue={'Язык'}>
          Язык
        </option>
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="zh">中文</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
        <option value="ar">العربية</option>
        <option value="pt">Português</option>
        <option value="it">Italiano</option>
      </select>

      <select className={`${style.select} select`}>
        <option defaultValue="Валюта">
          Валюта
        </option>
      </select>

      <select className={`${style.select} select`}>
        <option defaultValue="Формат">
          Формат
        </option>
      </select>

      <select className={`${style.select} select mr-auto`}>
        <option defaultValue="Тематика">
          Тематика
        </option>
      </select>
      <Button isLoading={mutateStaticAdd.isPending} onClick={handleGifAdd} className={style.topBtn}>Generare Now</Button>
    </div>
  );
};
