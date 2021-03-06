import React from "react";
import { GridSheet, Renderer, aa2oa, MatrixType } from "./src";
// import { GridSheet, Renderer, aa2oa } from "../dist";

class KanjiRenderer extends Renderer {
  protected kanjiMap: { [s: string]: string } = {
    "0": "〇",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六",
    "7": "七",
    "8": "八",
    "9": "九",
    ".": ".",
  };
  number(value: number): string {
    let kanji = "";
    let [int, fraction] = String(value).split(".");
    for (let i = 0; i < int.length; i++) {
      const j = int.length - i;
      if (j % 3 === 0 && i !== 0) {
        kanji += ",";
      }
      kanji += this.kanjiMap[int[i]];
    }
    if (fraction == null) {
      return kanji;
    }
    kanji += ".";
    for (let i = 0; i < fraction.length; i++) {
      kanji += this.kanjiMap[fraction[i]];
    }
    return kanji;
  }
}

export default {
  title: "grid sheet",
};

const initialData = [
  [123456, "b", "c", "d", "e", "aa", "bb", "cc", [1, 2, 3], "ee"],
  ["a", "b", 789, "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [true, "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [false, "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [123456, "b", "c", "d", "e", "aa", "bb", "cc", [1, 2, 3], "ee"],
  ["a", "b", 789, "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [true, "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [false, "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [123456, "b", "c", "d", "e", "aa", "bb", "cc", [1, 2, 3], "ee"],
  ["a", "b", 789, "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [true, "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [false, "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [123456, "b", "c", "d", "e", "aa", "bb", "cc", [1, 2, 3], "ee"],
  ["a", "b", 789, "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [true, "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [false, "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [123456, "b", "c", "d", "e", "aa", "bb", "cc", [1, 2, 3], "ee"],
  ["a", "b", 789, "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  ["a", "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [true, "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
  [false, "b", "c", "d", "e", "aa", "bb", "cc", "dd", "ee"],
];

export const showIndex = () => {
  const [data, setData] = React.useState<MatrixType>(initialData);

  React.useEffect(() => {
    setData([...initialData]);
  }, []);

  return (
    <>
      <div>aaaaa</div>

      <GridSheet
        data={data}
        options={{
          // cellLabel: false,
          // headerWidth: 50,
          headerHeight: 40,
          historySize: 100,
          mode: "dark",
          //stickyHeaders: "horizontal",
          cells: {
            default: { style: { fontStyle: "italic" } },
            A1: { style: { color: "#008888" } },
            B: { fixed: true, label: "ビー" },
            D: { width: 300, style: { textAlign: "right" } },
            "2": {
              label: "二",
              style: { borderBottom: "double 4px #000000" },
              renderer: "kanji",
            },
            "3": {
              height: 100,
              style: {
                fontWeight: "bold",
                color: "#ff0000",
                backgroundColor: "rgba(255, 200, 200, 0.5)",
              },
            },
            "4": {
              fixed: true,
              label: "よん",
              height: 50,
              verticalAlign: "bottom",
            },
            "5": {
              height: 100,
              style: {
                fontWeight: "bold",
                color: "#000fff",
                backgroundColor: "rgba(0, 200, 200, 0.5)",
              },
            },
            "6": {
              height: 100,
              style: {
                fontWeight: "bold",
                color: "#ff0000",
                backgroundColor: "rgba(255, 200, 200, 0.5)",
              },
            },
          },
          onSave: (matrix, options) => {
            console.log(
              "matrix on save:",
              aa2oa(matrix || [], ["A", "B", "C", "D", "E", "F"])
            );
          },
          onChange: (matrix, options) => {
            if (typeof matrix !== "undefined") {
              console.log("matrix on change:", matrix);
            }
            if (typeof options !== "undefined") {
              console.log("options on change", options);
            }
          },
          renderers: {
            kanji: new KanjiRenderer(),
          },
        }}
      />
      <br />
      <br />
      <hr />

      {true && (
        <table style={{ width: "100%", tableLayout: "fixed" }}>
          <tbody>
            <tr>
              <td>
                {" "}
                <GridSheet
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                  data={[
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                    [9, 10, 11, "both"],
                  ]}
                  options={{ sheetResize: "both" }}
                />
              </td>
              <td>
                {" "}
                <GridSheet
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                  data={[
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                    [9, 10, 11, "vertical"],
                  ]}
                  options={{ sheetResize: "vertical" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <GridSheet
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                  data={[
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                    [9, 10, 11, "horizontal"],
                  ]}
                  options={{ sheetResize: "horizontal" }}
                />
              </td>
              <td>
                {" "}
                <GridSheet
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                  data={[
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                    [9, 10, 11, "none"],
                  ]}
                  options={{ sheetResize: "none" }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
