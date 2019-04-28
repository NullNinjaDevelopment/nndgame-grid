import { Geometry } from "nndgame-common";
import * as React from "react";

export interface TileContainerProps {
  position: Geometry.Point;
  children: React.ReactNode;
}

export const TileContainer = (props: TileContainerProps) => {
  return (
    <div className="cell" data-x={props.position.x} data-y={props.position.y}>
      {props.children}
    </div>
  );
};
