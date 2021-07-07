import {
  Stack,
  TooltipHost,
  DirectionalHint,
  IconButton,
  mergeStyles,
  Depths,
  AnimationStyles,
} from "@fluentui/react";
import { NeutralColors } from "@fluentui/theme";
import * as React from "react";
import { useScrollPosition } from "./useScrollPosition";

const scale = 30;

const itemStyle = mergeStyles({
  color: NeutralColors.gray160,
  background: NeutralColors.gray20,
  overflow: "hidden",
  borderRadius: "50%",
  borderColor: NeutralColors.gray120,
  borderWidth: 1,
  borderStyle: "solid",
  boxShadow: Depths.depth16,
});

export const StickyFooter: React.FC = (props) => {
  const [sticky, setSticky] = React.useState(false);
  const [scrollPos, setScrollPos] = React.useState({ x: 0, y: 0 });
  useScrollPosition(
    ({ prevPos, currPos }: any) => {
      const isShow = currPos.y < prevPos.y;
      if (isShow !== sticky) setSticky(isShow);
      setScrollPos(currPos);
    },
    [sticky]
  );

  const divStyle = mergeStyles(
    sticky ? AnimationStyles.slideDownOut20 : AnimationStyles.slideUpIn20,
    {
      position: "sticky",
      // another way to do the animation
      //   transform: sticky ? "translateY(100%)" : "translateY(0)",
      //   transition: "transform 100ms ease-in",
      bottom: 0,
      left: 0,
      padding: scale / 2,
    }
  );
  return (
    <div className={divStyle}>
      <Stack
        horizontal
        verticalAlign="center"
        horizontalAlign="end"
        tokens={{ childrenGap: scale / 2 }}
      >
        <TooltipHost
          directionalHint={DirectionalHint.topAutoEdge}
          content={"dig this? Peek at my other work..."}
          calloutProps={{ gapSpace: scale / 4 }}
        >
          <IconButton
            style={{
              background: "black",
              borderColor: "black",
              padding: scale / 1.5,
              color: NeutralColors.gray20,
            }}
            className={itemStyle}
            iconProps={{
              iconName: "ContactHeart",
              style: { fontSize: scale / 1.5 },
            }}
            onClick={() => {
              openInNewTab("https://dilloncutaiar.com");
            }}
          />
        </TooltipHost>
        <TooltipHost
          directionalHint={DirectionalHint.topAutoEdge}
          content={"Scroll back to top"}
          calloutProps={{ gapSpace: scale / 4 }}
        >
          <IconButton
            style={{
              padding: scale / 1.5,
            }}
            className={itemStyle}
            iconProps={{
              iconName: "refresh",
              style: { fontSize: scale / 1.5 },
            }}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          />
        </TooltipHost>
      </Stack>
    </div>
  );
};

function openInNewTab(href: string) {
  window.open(href, "_blank");
}
