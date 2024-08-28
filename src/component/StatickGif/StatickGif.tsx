import { DownloadSvg } from "../../assets/svg/DownloadSvg";
import { gifType } from "../../types/gifType";
import { Button } from "../../ui/Button";
import { AddIntegrations } from "../AddIntegration";
import style from "./StatickGif.module.scss";

function StatickGif({ gif }: gifType) {
  const downloadGif = () => {
    if (gif) {
      const link = document.createElement("a");
      link.href = gif;
      link.download = "downloaded.gif";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <>
      {gif ? (
        <div className={`${style.gifBlock} max-w-[1140px] m-auto`}>
          {gif && (
            <div className={style.gifCard}>
              <img className={style.gifImg} src={gif} alt="gif" />
              <Button onClick={downloadGif} className={style.gifButton}>
                <DownloadSvg />
                Download
              </Button>
            </div>
          )}
        </div>
      ) : (
        <AddIntegrations />
      )}
    </>
  );
}

export default StatickGif;
