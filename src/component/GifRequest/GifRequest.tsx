import { gifGeneratedType } from "../../types/gifGeneratedType";
import { AddIntegrations } from "../AddIntegration";
import { GifCards } from "../GifCards";

function GifRequest({ svgContent, text }: gifGeneratedType) {
  return (
    <>
      {svgContent && text ? (
        <GifCards svgContent={svgContent} text={text} />
      ) : (
        <AddIntegrations />
      )}
    </>
  );
}

export default GifRequest;
