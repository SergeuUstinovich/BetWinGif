import { useMutation } from "@tanstack/react-query";
import { DownloadSvg } from "../../assets/svg/DownloadSvg";
import { Button } from "../../ui/Button";
import { AddIntegrations } from "../AddIntegration";
import style from "./StatickGif.module.scss";
import { downloadImg } from "../../api/clientGif";
import { queryClient } from "../../api/queryClient";
import { useEffect, useState } from "react";

function StatickGif({ url }) {
   const [downImg, setDownImg] = useState<string>()

  const mutateDownload = useMutation(
    {
      mutationFn: (data: { file_name: string }) => downloadImg(data.file_name),
      onSuccess: (data) => {
        setDownImg(data)
      },
      onError: (err) => {
        console.log(err)
      }
    },

    queryClient
  );

  const handleDownload = (url) => {
    const fileName = url.substring(url.lastIndexOf('/') + 1);
    mutateDownload.mutate({file_name: fileName})
  }

  useEffect(()=>{
    if(downImg) {
      const fileName = downImg.substring(downImg.lastIndexOf('/') + 1);
      const link = document.createElement("a");
      link.href = downImg;
      link.download = `download${fileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownImg(undefined);
    }
  }, [downImg])

  return (
    <>
      {url ? (
        <div className={`${style.gifBlock} max-w-[1140px] m-auto`}>
          {url &&
            url.map((item, index) => (
              <div key={index} className={style.gifCard}>
                <img className={style.gifImg} src={item} alt="gif" />
                <Button
                  onClick={() => handleDownload(item)}
                  className={`${style.gifButton} btn`}
                >
                  <DownloadSvg className={style.svgImg} />
                  Download
                </Button>
              </div>
            ))}
        </div>
      ) : (
        <AddIntegrations />
      )}
    </>
  );
}

export default StatickGif;
