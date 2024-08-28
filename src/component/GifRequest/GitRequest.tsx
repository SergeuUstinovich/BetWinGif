import { gifGeneratedType } from "../../types/gifGeneratedType";
import { AddIntegrations } from "../AddIntegration";
import { GifCards } from "../GifCards";

function GitRequest({ svgContent, text }: gifGeneratedType) {
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
