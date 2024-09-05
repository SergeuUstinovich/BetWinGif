import { useState } from "react";
import style from "./MenegerArr.module.scss";



function MenegerArr({ arr } ) {
  return (
    <>
      {arr && arr.map((area) => (
          <div
            className={style.boxInfo}
            key={area.id}
            style={{
              position: "absolute",
              left: area.x,
              top: area.y,
              width: area.width,
              height: area.height,
              fontSize: `${area.fontSize}px`,
              color: area.color,
            }}
          >
            {area.text}
          </div>
      ))}
    </>
  );
}

export default MenegerArr;
