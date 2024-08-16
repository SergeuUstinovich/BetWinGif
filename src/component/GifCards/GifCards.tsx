import style from "./GifCards.module.scss";
import { DownloadSvg } from "../../assets/svg/DownloadSvg";
import { Button } from "../../ui";
import GifCard from "../../assets/img/png/GifCard.png";

export const GifCards = () => {
  return (
    <div className={`${style.gifBlock} max-w-[1140px] m-auto`}>
      <div className={style.gifCard}>
        <img className={style.gifImg} src={GifCard} alt="gif" />
        <Button className={style.gifButton}>
          <DownloadSvg />
          Download
        </Button>
      </div>
      <div className={style.gifCard}>
        <img className={style.gifImg} src={GifCard} alt="gif" />
        <Button className={style.gifButton}>
          <DownloadSvg />
          Download
        </Button>
      </div>
      <div className={style.gifCard}>
        <img className={style.gifImg} src={GifCard} alt="gif" />
        <Button className={style.gifButton}>
          <DownloadSvg />
          Download
        </Button>
      </div>
      <div className={style.gifCard}>
        <img className={style.gifImg} src={GifCard} alt="gif" />
        <Button className={style.gifButton}>
          <DownloadSvg />
          Download
        </Button>
      </div>
    </div>
  );
};
