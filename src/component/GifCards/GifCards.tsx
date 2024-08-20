import style from "./GifCards.module.scss";
import { DownloadSvg } from "../../assets/svg/DownloadSvg";
import { Button } from "../../ui";
import GifCard from "../../assets/img/png/GifCard.png";
import { AddIntegrations } from "../AddIntegration";

interface gifProps {
  img: string;
  text: string;
}

const gif: gifProps[] = [
  {
    img: GifCard,
    text: "Download",
  },
  {
    img: GifCard,
    text: "Download",
  },
  {
    img: GifCard,
    text: "Download",
  },
  {
    img: GifCard,
    text: "Download",
  },
];

export const GifCards = () => {
  return (
    <>
      {gif.length === 0 ? (
        <AddIntegrations />
      ) : (
        <div className={`${style.gifBlock} max-w-[1140px] m-auto`}>
          {gif.map((item) => (
            <div className={style.gifCard}>
              <img className={style.gifImg} src={item.img} alt="gif" />
              <Button className={style.gifButton}>
                <DownloadSvg />
                {item.text}
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
