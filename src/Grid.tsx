import * as React from "react";

export type GridProps<Tile> = {

}

/**
 * Renders a grid of tiles
 */
export const Grid = <Tile extends any>(props: GridProps<Tile>) => {
  return (
    <>
      <div className="grid">Grid</div>
    </>
  )
}
