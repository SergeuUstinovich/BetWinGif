import { useEffect } from "react";
import { DownloadSvg } from "../../assets/svg/DownloadSvg";
import { gifType } from "../../types/gifType";
import { Button } from "../../ui/Button";
import { AddIntegrations } from "../AddIntegration";
import style from "./StatickGif.module.scss";

function StatickGif({ url }: gifType) {
  const downloadGif = () => {
    if (url) {
      url.map((item, index) => {
        const link = document.createElement("a");
        link.href = item;
        link.download = `downloaded${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    }
  };

  useEffect(() => {
    if(url){
      console.log(url)
    }
  }, [url])
  return (
    <>
      {url ? (
        <div className={`${style.gifBlock} max-w-[1140px] m-auto`}>
          {url && url.map((item) => 
            (
              <div className={style.gifCard}>
                <img className={style.gifImg} src={item} alt="gif" />
                <Button onClick={downloadGif} className={style.gifButton}>
                  <DownloadSvg />
                  Download
                </Button>
              </div>
            )
          )}
        </div>
      ) : (
        <AddIntegrations />
      )}
    </>
  );
}

export default StatickGif;
