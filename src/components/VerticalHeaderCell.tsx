import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { between } from "../api/arrays";
import { RootState } from "../store";
import {
  InsideState,
  drag,
  selectRows,

} from "../store/inside";
import {DUMMY_IMG} from "../constants";


import {OutsideState, setCellsOption} from "../store/outside";

interface Props {
  y: number;
};

export const VerticalHeaderCell: React.FC<Props> = React.memo(({
  y,
}) => {
  const rowId = `${ y + 1 }`;
  const dispatch = useDispatch();

  const {
    cellsOption,
    numRows,
    numCols,
    defaultHeight,
    headerWidth,
  } = useSelector<RootState, OutsideState>(state => state["outside"]);
  const {
    choosing,
    selecting,
    verticalHeadersSelecting,
  } = useSelector<RootState, InsideState>(
      state => state["inside"],
      (current, old) => {
        if (old.reactions[rowId] || current.reactions[rowId]) {
          return false;
        }
        return true;
      }
  );
  const rowOption = cellsOption[rowId] || {};
  const height = rowOption.height || defaultHeight;

  return (<th
    className={`row-number ${choosing[0] === y ? "choosing" : ""} ${between([selecting[0], selecting[2]], y) ? verticalHeadersSelecting ? "header-selecting" : "selecting" : ""}`}
    onClick={(e) => {
      let startY = e.shiftKey ? selecting[0] : y;
      if (startY === -1) {
        startY = choosing[0];
      }
      dispatch(selectRows({range: [startY, y], numCols}));
      return false;
    }}
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setDragImage(DUMMY_IMG, 0, 0);
      dispatch(selectRows({range: [y, y], numCols}));
      return false;
    }}
    onDragEnter={(e) => {
      dispatch(drag([y, numCols - 1]));
      return false;
    }}
  >
    <div
      className="resizer"
      style={{ height, width: headerWidth }}
      onMouseLeave={(e) => {
        const height = e.currentTarget.clientHeight;
        dispatch(setCellsOption({... cellsOption, [rowId]: {... rowOption, height: `${height}px`}}));
      }}
    >
      { rowOption.label ||  rowId }
    </div></th>);
});