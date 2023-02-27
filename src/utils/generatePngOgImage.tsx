import { Resvg } from "@resvg/resvg-js";
import { SITE } from "@config";
import generateOgImage from "./generateOgImage";

const generatePngOgImage = async (mytext = SITE.title) => {
  const svg = await generateOgImage(mytext);
  const resvg = new Resvg(svg);

  return resvg.render().asPng();
};

export default generatePngOgImage;
