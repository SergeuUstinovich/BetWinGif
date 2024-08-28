import { gifGeneratedType } from "../../types/gifGeneratedType";
import { AddIntegrations } from "../AddIntegration";
import { GifCards } from "../GifCards";

function GitRequest({ svgContent, text }: gifGeneratedType) {
    console.log(text)
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

export default GitRequest;
