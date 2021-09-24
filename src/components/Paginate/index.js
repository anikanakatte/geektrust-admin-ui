import React, { useEffect } from "react";
import styles from "./Paginate.module.css";
import {
  IoChevronBack as PrevIcon,
  IoChevronForward as NextIcon,
} from "react-icons/io5";
import {
  BiFirstPage as StartIcon,
  BiLastPage as EndIcon,
} from "react-icons/bi";
import paginate from "./paginate";

export default function PaginateBar(props) {
  const [paginateProps, setPaginateProps] = React.useState({});

  useEffect(() => {
    const { totalItems } = props;
    const data = paginate(totalItems);
    props.onPageChange(data.startItemIndex, data.endItemIndex);
    setPaginateProps(data);
  }, []);

  useEffect(() => {
    const { totalItems } = props;
    const data = paginate(totalItems);
    props.onPageChange(data.startItemIndex, data.endItemIndex);
    setPaginateProps(data);
  }, [props.totalItems]);

  const onPageChangeHandler = (source) => {
    let { totalPages, currentPage } = paginateProps;
    switch (source) {
      case "END":
        currentPage = totalPages;
        break;
      case "START":
        currentPage = 1;
        break;
      case "NEXT":
        currentPage += 1;
        break;
      case "PREV":
        currentPage -= 1;
        break;
      default:
        currentPage = source;
    }
    const data = paginate(props.totalItems, currentPage, 10);
    props.onPageChange(data.startItemIndex, data.endItemIndex);
    setPaginateProps(data);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem auto",
        }}
      >
        <div style={{ display: "flex" }}>
          <button
            className={styles.controlBtn}
            onClick={() => onPageChangeHandler("START")}
            disabled={paginateProps.currentPage === 1}
          >
            <StartIcon />
          </button>
          <button
            className={styles.controlBtn}
            onClick={() => onPageChangeHandler("PREV")}
            disabled={paginateProps.currentPage === 1}
          >
            <PrevIcon />
          </button>
        </div>
        {paginateProps.pages?.map((val) => (
          <button
            className={styles.pageBtn}
            key={val}
            onClick={() =>
              paginateProps.currentPage !== val && onPageChangeHandler(val)
            }
            disabled={paginateProps.currentPage === val}
            style={
              paginateProps.currentPage === val
                ? { backgroundColor: "#2196f3", color: "white" }
                : { backgroundColor: "#fff", color: "#2196f3" }
            }
          >
            {val}
          </button>
        ))}
        <div style={{ display: "flex" }}>
          <button
            className={styles.controlBtn}
            onClick={() => onPageChangeHandler("NEXT")}
            disabled={paginateProps.currentPage === paginateProps.endPageNumber}
          >
            <NextIcon />
          </button>
          <button
            className={styles.controlBtn}
            onClick={() => onPageChangeHandler("END")}
            disabled={paginateProps.currentPage === paginateProps.totalPages}
          >
            <EndIcon />
          </button>
        </div>
      </div>
    </>
  );
}
