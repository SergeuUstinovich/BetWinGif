import style from "./GifCards.module.scss";
import { DownloadSvg } from "../../assets/svg/DownloadSvg";
import { Button } from "../../ui";
import GifCard from "../../assets/img/png/GifCard.png";
import { AddIntegrations } from "../AddIntegration";

interface gifProps {
  id: string
  img: string;
  text: string;
}

const gif: gifProps[] = [
  {
    id: '1',
    img: GifCard,
    text: "Download",
  },
  {
    id: '2',
    img: GifCard,
    text: "Download",
  },
  {
    id: '3',
    img: GifCard,
    text: "Download",
  },
  {
    id: '4',
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
            <div key={item.id} className={style.gifCard}>
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
