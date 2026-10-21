export type TomatoMood = "neutral" | "focused" | "relaxed";

interface TomatoCharacterProps {
  mood: TomatoMood;
}

export function TomatoCharacter({ mood }: TomatoCharacterProps) {
  const isFocused = mood === "focused";
  const isRelaxed = mood === "relaxed";

  return (
    <div className={`tomato tomato--${mood}`} aria-hidden="true">
      <svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="tomato-body-gradient"
            x1="45"
            y1="45"
            x2="170"
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ff6b62" />
            <stop offset="1" stopColor="#d93645" />
          </linearGradient>
        </defs>

        <path
          d="M110 43C158 38 190 70 188 119C186 164 154 187 110 184C66 187 34 164 32 119C30 72 63 40 110 43Z"
          fill="url(#tomato-body-gradient)"
        />

        <ellipse
          cx="74"
          cy="75"
          rx="22"
          ry="13"
          fill="#ffffff"
          opacity="0.18"
          transform="rotate(-28 74 75)"
        />

        <g className="tomato__leaf">
          <path
            d="M110 50C100 35 100 24 108 15C119 25 121 37 116 49Z"
            fill="#347a4a"
          />
          <path
            d="M109 51C91 40 76 39 62 47C77 54 91 57 108 55Z"
            fill="#3d9256"
          />
          <path
            d="M112 51C129 38 145 38 160 46C145 55 130 58 112 55Z"
            fill="#3d9256"
          />
        </g>

        {isRelaxed ? (
          <g>
            <path
              d="M68 107Q80 119 92 107"
              fill="none"
              stroke="#4e2932"
              strokeLinecap="round"
              strokeWidth="6"
            />
            <path
              d="M128 107Q140 119 152 107"
              fill="none"
              stroke="#4e2932"
              strokeLinecap="round"
              strokeWidth="6"
            />
            <circle className="tomato__cheek" cx="65" cy="132" r="10" />
            <circle className="tomato__cheek" cx="155" cy="132" r="10" />
            <path
              d="M88 139Q110 160 132 139"
              fill="none"
              stroke="#692d39"
              strokeLinecap="round"
              strokeWidth="7"
            />
          </g>
        ) : (
          <g>
            {isFocused && (
              <>
                <path
                  d="M67 88Q80 80 94 87"
                  fill="none"
                  stroke="#692d39"
                  strokeLinecap="round"
                  strokeWidth="5"
                />
                <path
                  d="M126 84Q141 76 154 85"
                  fill="none"
                  stroke="#692d39"
                  strokeLinecap="round"
                  strokeWidth="5"
                />
              </>
            )}

            <g className="tomato__eye tomato__eye--left">
              <ellipse cx="80" cy="108" rx="12" ry="14" fill="#ffffff" />
              <circle
                cx={isFocused ? 76 : 83}
                cy={isFocused ? 104 : 109}
                r="5"
                fill="#332b38"
              />
            </g>

            <g className="tomato__eye tomato__eye--right">
              <ellipse cx="140" cy="108" rx="12" ry="14" fill="#ffffff" />
              <circle
                cx={isFocused ? 136 : 137}
                cy={isFocused ? 104 : 109}
                r="5"
                fill="#332b38"
              />
            </g>

            <path
              d={
                isFocused
                  ? "M101 143Q110 137 119 143"
                  : "M92 140Q110 151 128 140"
              }
              fill="none"
              stroke="#692d39"
              strokeLinecap="round"
              strokeWidth="6"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
