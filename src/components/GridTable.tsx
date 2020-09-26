import React from "react";
import styled from "styled-components";

import {
  DataType,
  WidthsType,
  HeightsType,
} from "../types";
import { Y_START, Y_END, X_START, X_END, DUMMY_IMG } from "../constants";

import {
  Cell,
} from "./Cell";
import {
  convertNtoA,
  convertArrayToTSV,
} from "../utils/converters";

interface Props {
  data: DataType;
  widths: WidthsType;
  heights: HeightsType;
  setWidths: (widths: WidthsType) => void;
  setHeights: (heights: HeightsType) => void;
};

const GridTableLayout = styled.div`
  .grid-table {
    table-layout: fixed;
    border-collapse: collapse;
    th, td {
      border: solid 1px #bbbbbb;
    }
    th {
      color: #777777;
      font-size: 13px;
      font-weight: normal;
      width: 80px;
      background-color: #eeeeee;

      &.col-number {
      }
      &.row-number {
      }

    }
    td {
      position: relative;
      padding: 0;
      margin: 0;
      width: 150px;
      background-color: #ffffff;
      border: solid 1px #cccccc;
      
      &.dragging {
        background-color: rgba(0, 128, 255, 0.2);
      }
      &.cutting {
        border: dotted 2px #0077ff;
        textarea:focus {
          outline: solid 1px #0077ff;
        }
      }
      &.copying {
        border: dashed 2px #0077ff;
        textarea:focus {
          outline: solid 1px #0077ff;
        }
      }
    }
  }
  .clipboard {
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
    color: transparent;
    background-color: transparent;
    position: absolute;
    top: -999999px;
    left: -999999px;
    margin-left: -9999px;
    margin-top: -9999px;
    z-index: -9999;
  }
`;

export const GridTable: React.FC<Props> = ({data, widths, heights}) => {
  const [rows, setRows] = React.useState(data);
  const [selecting, select] = React.useState<[number, number]>([0, 0]);
  const [cutting, setCutting] = React.useState(false);

  const [dragging, drag] = React.useState<[number, number, number, number]>([-1, -1, -1, -1]); // (y, x) -> (y, x)
  const [draggingTop, draggingBottom] = dragging[Y_START] < dragging[Y_END] ? [dragging[Y_START], dragging[Y_END]] : [dragging[Y_END], dragging[Y_START]];
  const [draggingLeft, draggingRight] = dragging[X_START] < dragging[X_END] ? [dragging[X_START], dragging[X_END]] : [dragging[X_END], dragging[X_START]];
  const [copying, copy] = React.useState<[number, number, number, number]>([-1, -1, -1, -1]); // (y, x) -> (y, x)
  const [copyingTop, copyingBottom] = copying[Y_START] < copying[Y_END] ? [copying[Y_START], copying[Y_END]] : [copying[Y_END], copying[Y_START]];
  const [copyingLeft, copyingRight] = copying[X_START] < copying[X_END] ? [copying[X_START], copying[X_END]] : [copying[X_END], copying[X_START]];

  const isDragging = (y: number, x: number) => draggingTop !== -1 && (draggingTop <= y && y <= draggingBottom && draggingLeft <= x && x <= draggingRight);
  const isCopying = (y: number, x: number) => (copyingTop <= y && y <= copyingBottom && copyingLeft <= x && x <= copyingRight);

  const clipboardRef = React.createRef<HTMLTextAreaElement>();

  return (<GridTableLayout>
    <textarea className="clipboard" ref={clipboardRef}></textarea>
    <table className="grid-table">
      <thead>
        <tr>
          <th></th>
          {widths.map((width, x) => (<th 
            key={x}
            className="col-number"
            style={{ width }}
            onClick={(e) => {
              drag([0, x, heights.length - 1, x]);
              select([0, x]);
            }}
          >
          {convertNtoA(x + 1)}
          </th>))
          }
        </tr>
      </thead>
      <tbody>{heights.map((height, y) => (<tr key={y}>
        <th
          className="row-number" 
          style={{ height }}
          onClick={(e) => {
            drag([y, 0, y, widths.length - 1]);
            select([y, 0]);
            return false;
          }}
        >{y + 1}</th>
        {widths.map((width, x) => {
          const value = rows[y][x];
          return (<td
            key={x}
            className={`${isDragging(y, x) ? "dragging": ""} ${isCopying(y, x) ? cutting ? "cutting" : "copying" : ""}`}
            style={{
              borderTop: copyingTop < y && y <= copyingBottom ? "solid 1px #dddddd" : undefined,
              borderBottom: copyingTop <= y && y < copyingBottom ? "solid 1px #dddddd" : undefined,
              borderLeft: copyingLeft < x && x <= copyingRight ? "solid 1px #dddddd" : undefined,
              borderRight: copyingLeft <= x && x < copyingRight ? "solid 1px #dddddd" : undefined,
            }}
            draggable
            onClick={(e) => {
              select([y, x]);
              drag([-1, -1, -1, -1]);
            }}
            onDragStart={(e) => {
              e.dataTransfer.setDragImage(DUMMY_IMG, 0, 0);
              select([y, x]);
              drag([y, x, -1, -1]);
            }}
            onDragEnd={() => {
              if (dragging[0] === dragging[2] && dragging[1] === dragging[3]) {
                drag([-1, -1, -1, -1]);
              }
            }}
            onDragEnter={(e) => {
              drag([dragging[0], dragging[1], y, x])
            }}
          ><Cell
            value={value}
            x={x}
            y={y}
            setValue={(value: string) => {
              rows[y][x] = value;
              setRows([...rows]);
            }}
            copy={(copying: boolean, cutting=false) => {
              const input = clipboardRef.current;
              let tsv = "";
              if (copying) {
                if (dragging[0] === -1) {
                  copy([y, x, y, x]);
                  tsv = rows[y][x];
                } else {
                  copy(dragging);
                  const copyingArea = rows.slice(draggingTop, draggingBottom + 1).map((cols) => cols.slice(draggingLeft, draggingRight + 1));
                  tsv = convertArrayToTSV(copyingArea)
                }
                if (input != null) {
                  input.value = tsv;
                  input.focus();
                  input.select();
                  document.execCommand("copy");
                  input.value = "";
                  input.blur();
                  setTimeout(() => select([y, x]), 100); // refocus
                }
              } else {
                copy([-1, -1, -1, -1]);
              }
              setCutting(cutting);
            }}
            clear={() => {
              if (dragging[0] === -1) {
                rows[y][x] = "";
              } else {
                for (let y = draggingTop; y <= draggingBottom; y++) {
                  for (let x = draggingLeft; x <= draggingRight; x++) {
                    rows[y][x] = "";
                  }
                }
              }
              setRows([... rows]);
            }}
            paste={(text: string) => {
              if (dragging[0] === -1) {
                if (copying[0] === -1) {
                  rows[y][x] = text;
                } else {
                  const [copyingHeight, copyingWidth] = [copyingBottom - copyingTop, copyingRight - copyingLeft];
                  for (let _y = 0; _y <= copyingHeight; _y++) {
                    for (let _x = 0; _x <= copyingWidth; _x++) {
                      const [dstY, dstX, srcY, srcX] = [y + _y, x + _x, copyingTop + _y, copyingLeft + _x];
                      if (dstY < heights.length && dstX < widths.length) {
                        rows[dstY][dstX] = rows[srcY][srcX];
                      }
                      if (cutting) {
                        rows[srcY][srcX] = "";
                      }
                    }
                  }
                  if (copyingHeight > 0 || copyingWidth > 0) {
                    drag([y, x, y + copyingHeight, x + copyingWidth]);
                  }
                }
              } else {
                if (copying[0] === -1) {
                  for (let y = draggingTop; y <= draggingBottom; y++) {
                    for (let x = draggingLeft; x <= draggingRight; x++) {
                      rows[y][x] = text;
                    }
                  }
                } else {
                  const [draggingHeight, draggingWidth] = [draggingBottom - draggingTop, draggingRight - draggingLeft];
                  const [copyingHeight, copyingWidth] = [copyingBottom - copyingTop, copyingRight - copyingLeft];
                  const [biggerHeight, biggerWidth] = [draggingHeight > copyingHeight ? draggingHeight : copyingHeight, draggingWidth > copyingWidth ? draggingWidth : copyingWidth]
                  for (let _y = 0; _y <= biggerHeight; _y++) {
                    for (let _x = 0; _x <= biggerWidth; _x++) {
                      const [dstY, dstX, srcY, srcX] = [y + _y, x + _x, copyingTop + (_y % (copyingHeight + 1)), copyingLeft + (_x % (copyingWidth + 1))];
                      if (dstY < heights.length && dstX < widths.length) {
                        rows[dstY][dstX] = rows[srcY][srcX];
                      }
                    }
                  }
                  drag([y, x, y + biggerHeight, x + biggerWidth]);
                }
              }
              setRows([...rows]);
              copy([-1, -1, -1, -1]);
            }}
            drag={(deltaY: number, deltaX: number) => {
              let [dragEndY, dragEndX] = [dragging[2] === -1 ? y : dragging[2], dragging[3] === -1 ? x : dragging[3]];
              let [nextY, nextX] = [dragEndY + deltaY, dragEndX + deltaX];
              if (nextY < 0 || heights.length <= nextY || nextX < 0 || widths.length <= nextX) {
                return;
              }
              y === nextY && x === nextX ? drag([-1, -1, -1, -1]) : drag([y, x, nextY, nextX]);
            }}
            blur={() => {
              select([-1, -1]);
              drag([-1, -1, -1, -1]);
              setCutting(false);
            }}
            select={(nextY: number, nextX: number, breaking: boolean) => {
              if (nextY < draggingTop && draggingTop !== -1 && !breaking) {
                nextY = draggingBottom;
                nextX = nextX > draggingLeft ? nextX - 1 : draggingRight;
              }
              if (nextY > draggingBottom && draggingBottom !== -1 && !breaking) {
                nextY = draggingTop;
                nextX = nextX < draggingRight ? nextX + 1 : draggingLeft;
              }
              if (nextX < draggingLeft && draggingLeft !== -1 && !breaking) {
                nextX = draggingRight;
                nextY = nextY > draggingTop ? nextY - 1 : draggingBottom;
              }
              if (nextX > draggingRight && draggingRight !== -1 && !breaking) {
                nextX = draggingLeft;
                nextY = nextY < draggingBottom ? nextY + 1 : draggingTop;
              }
              if (breaking) {
                drag([-1, -1, -1, -1]);
              }
              if (nextY < 0 || heights.length <= nextY || nextX < 0 || widths.length <= nextX) {
                return;
              }
              select([nextY, nextX]);
            }}
            selecting={selecting[0] === y && selecting[1] === x}
          /></td>);
        })}
      </tr>))
      }</tbody>
    </table>
  </GridTableLayout>);
};

