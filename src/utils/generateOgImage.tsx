import satori, { SatoriOptions } from "satori";
import { SITE } from "@config";

const fetchFonts = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    "https://raw.githubusercontent.com/googlefonts/zen-marugothic/main/fonts/ttf/ZenMaruGothic-Regular.ttf"
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  const fontFileBold = await fetch(
    "https://raw.githubusercontent.com/googlefonts/zen-marugothic/main/fonts/ttf/ZenMaruGothic-Bold.ttf"
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

const ogImage = (text: string) => {
  return (
    <div
      style={{
        backgroundImage:
          'url(\'data:image/svg+xml;utf8,<svg id="visual" viewBox="0 0 1200 630" width="1200" height="630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><g stroke-width="1" stroke-linejoin="bevel"><path d="M627.7 246L549.3 145L536.3 225Z" fill="#73cdf7" stroke="#73cdf7"></path><path d="M627.7 246L642.7 91L549.3 145Z" fill="#54b5f8" stroke="#54b5f8"></path><path d="M627.7 246L761 131L642.7 91Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M496.3 0L439 89L549.3 145Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M549.3 145L439 89L536.3 225Z" fill="#73cdf7" stroke="#73cdf7"></path><path d="M439 89L427 280L536.3 225Z" fill="#7ad1f7" stroke="#7ad1f7"></path><path d="M511.3 413L654.7 404L627.7 246Z" fill="#81d5f7" stroke="#81d5f7"></path><path d="M761 131L676.7 0L642.7 91Z" fill="#73cdf7" stroke="#73cdf7"></path><path d="M642.7 91L496.3 0L549.3 145Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M817 358L802 237L627.7 246Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M627.7 246L802 237L761 131Z" fill="#5cbdf8" stroke="#5cbdf8"></path><path d="M676.7 0L496.3 0L642.7 91Z" fill="#81d5f7" stroke="#81d5f7"></path><path d="M511.3 413L627.7 246L536.3 225Z" fill="#51b0f7" stroke="#51b0f7"></path><path d="M427 280L511.3 413L536.3 225Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M496.3 0L412 0L439 89Z" fill="#73cdf7" stroke="#73cdf7"></path><path d="M303.7 288L367 340L427 280Z" fill="#73cdf7" stroke="#73cdf7"></path><path d="M294.7 165L427 280L439 89Z" fill="#67c5f8" stroke="#67c5f8"></path><path d="M427 280L367 340L511.3 413Z" fill="#51b0f7" stroke="#51b0f7"></path><path d="M895.3 0L787 0L761 131Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M761 131L787 0L676.7 0Z" fill="#7ad1f7" stroke="#7ad1f7"></path><path d="M654.7 404L817 358L627.7 246Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M802 237L927.3 164L761 131Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M369 484L557.3 483L511.3 413Z" fill="#54b5f8" stroke="#54b5f8"></path><path d="M511.3 413L557.3 483L654.7 404Z" fill="#5cbdf8" stroke="#5cbdf8"></path><path d="M654.7 404L690.7 469L817 358Z" fill="#7ad1f7" stroke="#7ad1f7"></path><path d="M557.3 483L690.7 469L654.7 404Z" fill="#58b9f8" stroke="#58b9f8"></path><path d="M412 0L294.7 165L439 89Z" fill="#51b0f7" stroke="#51b0f7"></path><path d="M294.7 165L303.7 288L427 280Z" fill="#5cbdf8" stroke="#5cbdf8"></path><path d="M964.3 247L927.3 164L802 237Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M116.3 219L288.7 347L303.7 288Z" fill="#58b9f8" stroke="#58b9f8"></path><path d="M303.7 288L288.7 347L367 340Z" fill="#67c5f8" stroke="#67c5f8"></path><path d="M367 340L369 484L511.3 413Z" fill="#54b5f8" stroke="#54b5f8"></path><path d="M927.3 164L895.3 0L761 131Z" fill="#54b5f8" stroke="#54b5f8"></path><path d="M288.7 347L369 484L367 340Z" fill="#51b0f7" stroke="#51b0f7"></path><path d="M946.3 372L964.3 247L817 358Z" fill="#73cdf7" stroke="#73cdf7"></path><path d="M817 358L964.3 247L802 237Z" fill="#81d5f7" stroke="#81d5f7"></path><path d="M927.3 164L1080.7 0L895.3 0Z" fill="#81d5f7" stroke="#81d5f7"></path><path d="M768 630L818 501L690.7 469Z" fill="#5cbdf8" stroke="#5cbdf8"></path><path d="M690.7 469L818 501L817 358Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M674.7 630L690.7 469L557.3 483Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M818 501L946.3 372L817 358Z" fill="#5cbdf8" stroke="#5cbdf8"></path><path d="M412 0L233.7 0L294.7 165Z" fill="#4facf7" stroke="#4facf7"></path><path d="M294.7 165L116.3 219L303.7 288Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M369 484L538.3 630L557.3 483Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M233.7 0L155.3 124L294.7 165Z" fill="#7ad1f7" stroke="#7ad1f7"></path><path d="M288.7 347L258.7 512L369 484Z" fill="#67c5f8" stroke="#67c5f8"></path><path d="M538.3 630L674.7 630L557.3 483Z" fill="#58b9f8" stroke="#58b9f8"></path><path d="M1043.7 391L1038.7 225L964.3 247Z" fill="#73cdf7" stroke="#73cdf7"></path><path d="M964.3 247L1038.7 225L927.3 164Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M132.3 393L258.7 512L288.7 347Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M369 484L371 630L538.3 630Z" fill="#58b9f8" stroke="#58b9f8"></path><path d="M674.7 630L768 630L690.7 469Z" fill="#5cbdf8" stroke="#5cbdf8"></path><path d="M818 501L969.3 490L946.3 372Z" fill="#4facf7" stroke="#4facf7"></path><path d="M155.3 124L116.3 219L294.7 165Z" fill="#67c5f8" stroke="#67c5f8"></path><path d="M894.3 630L969.3 490L818 501Z" fill="#4facf7" stroke="#4facf7"></path><path d="M946.3 372L1043.7 391L964.3 247Z" fill="#4facf7" stroke="#4facf7"></path><path d="M292.7 630L371 630L369 484Z" fill="#81d5f7" stroke="#81d5f7"></path><path d="M969.3 490L1043.7 391L946.3 372Z" fill="#58b9f8" stroke="#58b9f8"></path><path d="M1200 158L1087.7 147L1200 263Z" fill="#67c5f8" stroke="#67c5f8"></path><path d="M1038.7 225L1087.7 147L927.3 164Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M116.3 219L132.3 393L288.7 347Z" fill="#51b0f7" stroke="#51b0f7"></path><path d="M258.7 512L292.7 630L369 484Z" fill="#54b5f8" stroke="#54b5f8"></path><path d="M1087.7 147L1080.7 0L927.3 164Z" fill="#54b5f8" stroke="#54b5f8"></path><path d="M162.3 543L292.7 630L258.7 512Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M233.7 0L98.3 0L155.3 124Z" fill="#67c5f8" stroke="#67c5f8"></path><path d="M155.3 124L0 141L116.3 219Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M768 630L894.3 630L818 501Z" fill="#7ad1f7" stroke="#7ad1f7"></path><path d="M969.3 490L1041.7 521L1043.7 391Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M132.3 393L162.3 543L258.7 512Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M894.3 630L1041.7 521L969.3 490Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M1200 263L1087.7 147L1038.7 225Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M98.3 0L0 141L155.3 124Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M116.3 219L0 283L132.3 393Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M132.3 393L0 483L162.3 543Z" fill="#4facf7" stroke="#4facf7"></path><path d="M0 141L0 283L116.3 219Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M1200 263L1038.7 225L1200 348Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M1087.7 147L1200 0L1080.7 0Z" fill="#67c5f8" stroke="#67c5f8"></path><path d="M1200 348L1038.7 225L1043.7 391Z" fill="#7ad1f7" stroke="#7ad1f7"></path><path d="M0 630L152.3 630L162.3 543Z" fill="#7ad1f7" stroke="#7ad1f7"></path><path d="M162.3 543L152.3 630L292.7 630Z" fill="#6dc9f8" stroke="#6dc9f8"></path><path d="M98.3 0L0 0L0 141Z" fill="#51b0f7" stroke="#51b0f7"></path><path d="M0 283L0 402L132.3 393Z" fill="#5cbdf8" stroke="#5cbdf8"></path><path d="M1200 527L1200 348L1043.7 391Z" fill="#81d5f7" stroke="#81d5f7"></path><path d="M1200 158L1200 0L1087.7 147Z" fill="#73cdf7" stroke="#73cdf7"></path><path d="M894.3 630L1082.7 630L1041.7 521Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M1041.7 521L1200 527L1043.7 391Z" fill="#58b9f8" stroke="#58b9f8"></path><path d="M0 402L0 483L132.3 393Z" fill="#51b0f7" stroke="#51b0f7"></path><path d="M1082.7 630L1200 527L1041.7 521Z" fill="#51b0f7" stroke="#51b0f7"></path><path d="M0 483L0 630L162.3 543Z" fill="#61c1f8" stroke="#61c1f8"></path><path d="M1082.7 630L1200 630L1200 527Z" fill="#51b0f7" stroke="#51b0f7"></path></g></svg>\')',
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        letterSpacing: "-.02em",
        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div
        style={{
          border: "4px solid #000",
          backgroundColor: "#fefbfb75",
          borderRadius: "6px",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          width: "88%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "20px",
            width: "90%",
            height: "90%",
          }}
        >
          <p
            style={{
              fontSize: 55,
              fontWeight: "bold",
              maxWidth: 800,
              maxHeight: "84%",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {text}
          </p>
          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: "8px",
              fontSize: 32,
            }}
          >
            <div
              style={{
                right: -20,
                bottom: -20,
                position: "absolute",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ overflow: "hidden", fontWeight: "bold" }}>
                {SITE.title}
              </span>
              <img
                src={`https://tuka.dev/assets/tuka.svg`}
                width={80}
                height={80}
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "Zen Maru Gothic",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "Zen Maru Gothic",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

const generateOgImage = async (mytext = SITE.title) =>
  await satori(ogImage(mytext), options);

export default generateOgImage;
