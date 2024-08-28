import style from "./GifCards.module.scss";
import { DownloadSvg } from "../../assets/svg/DownloadSvg";
import { Button } from "../../ui";
import GifCard from "../../assets/img/png/GifCard.png";
import { AddIntegrations } from "../AddIntegration";
import { useSelector } from "react-redux";
import { getGifGenerated } from "../../providers/StoreProvider/selectors/getGifGenerated";
import { useEffect } from "react";

interface gifProps {
  id: string
  img: string;
  text: string;
}

// const gif: gifProps[] = [
//   {
//     id: '1',
//     img: GifCard,
//     text: "Download",
//   },
//   {
//     id: '2',
//     img: GifCard,
//     text: "Download",
//   },
//   {
//     id: '3',
//     img: GifCard,
//     text: "Download",
//   },
//   {
//     id: '4',
//     img: GifCard,
//     text: "Download",
//   },
// ];

export const GifCards = () => {

  const gif = useSelector(getGifGenerated)

  useEffect(() => {
    console.log(gif)
  }, [gif])

  const downloadGif = () => {
    if (gif) {
        const link = document.createElement('a');
        link.href = gif;
        link.download = 'downloaded.gif';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

  return (
    <>
    {!gif ? (<AddIntegrations />): (
      <>
      <div className={`${style.gifBlock} max-w-[1140px] m-auto`}>
        <div  className={style.gifCard}>
            <img className={style.gifImg} src={gif} alt="gif" />
            <Button onClick={downloadGif} className={style.gifButton}>
              <DownloadSvg />
              Download
            </Button>
        </div>
      </div>
      </>
    )}
      
      {/* {gif.length === 0 ? (
        
      ) : (
        
          {gif.map((item) => (
            <div key={item.id} className={style.gifCard}>
              <img className={style.gifImg} src={gif} alt="gif" />
              <Button onClick={downloadGif} className={style.gifButton}>
                <DownloadSvg />
                {item.text}
              </Button>
            </div>
          ))}
        </div>
      )} */}
    </>
  );
};
