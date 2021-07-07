import * as React from "react";
import { Stack, VerticalDivider } from "@fluentui/react";

import * as data from "./items.json";

import * as style from "./Timeline.style";
import { TimelineItem } from "./TimelineItem";
import { EndEndcap, StartEndcap } from "./Endcaps";
import { useScrollData } from "scroll-data-hook";

const getImage = (item: string) => {
  return (
    <img
      className={style.imageStyle}
      alt={item}
      src={`https://www.randomlists.com/img/things/${item}.webp`}
    ></img>
  );
};

const loadSize = 10;

export const Timeline: React.FC = (props) => {
  const [numberOfItems, setNumberOfItems] = React.useState(data.items.length);

  // found a hook to try and use scroll speed to make lazy load more performant
  // still does not produce desired results
  // const { scrolling } = useScrollData();
  // const itemsShouldRender = !scrolling;
  const itemsShouldRender = true;

  return (
    <div className={style.timelineRoot}>
      {/* TODO: extract to debug component */}
      {/* <h1
        style={{
          position: "sticky",
          left: 200,
          top: 200,
          color: itemsShouldRender ? "green" : "red",
        }}
      >
        {itemsShouldRender ? "true" : "false"}
      </h1> */}
      <Stack
        horizontalAlign="center"
        tokens={{ childrenGap: 0 }}
        className={style.itemStack}
      >
        <StartEndcap />
        <VerticalDivider styles={style.dividerStyles} />
        {data.items.slice(0, numberOfItems).map((item, i) => (
          <>
            <TimelineItem index={i} shouldRender={itemsShouldRender} />
            <VerticalDivider styles={style.dividerStyles} />
          </>
        ))}
        <VerticalDivider styles={style.dividerStyles} />
        <EndEndcap />
      </Stack>
    </div>
  );
};
