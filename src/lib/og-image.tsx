export const ogImageSize = { width: 1200, height: 630 };

export const ogImageAlt =
  "Tarlaquena Catering — full-service catering for buffets, meal boxes, and events";

const CREAM = "#fbf3e9";
const GREEN = "#377d41";
const GREEN_DARK = "#27592e";
const TERRACOTTA = "#9f5738";
const INK = "#1a1a16";

export function ogImageJsx() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: CREAM,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -160,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: GREEN,
          opacity: 0.12,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          right: 120,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: TERRACOTTA,
          opacity: 0.16,
          display: "flex",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "100px 110px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 6,
            color: TERRACOTTA,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Catering &bull; Buffets &bull; Events
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          <span style={{ color: INK, marginRight: 24 }}>Tarlaquena</span>
          <span style={{ color: GREEN_DARK }}>Catering</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 36,
            color: INK,
            opacity: 0.75,
            maxWidth: 860,
          }}
        >
          Full-service catering for buffets, meal boxes, and events.
        </div>
      </div>
    </div>
  );
}
