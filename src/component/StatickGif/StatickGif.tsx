import { DownloadSvg } from "../../assets/svg/DownloadSvg";
import { adminImg } from "../../types/gifType";
import { Button } from "../../ui/Button";
import { AddIntegrations } from "../AddIntegration";
import style from "./StatickGif.module.scss";

function StatickGif({ url }) {
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

  return (
    <>
      {url ? (
        <div className={`${style.gifBlock} max-w-[1140px] m-auto`}>
          {url && url.map((item, index) => 
            (
              <div key={index} className={style.gifCard}>
                <img className={style.gifImg} src={item} alt="gif" />
                <Button onClick={downloadGif} className={`${style.gifButton} btn`}>
                  <DownloadSvg className={style.svgImg} />
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
