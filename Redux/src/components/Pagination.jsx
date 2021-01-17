import React from "react";

export default function Pagination(props) {
  console.log(`props `, props);
  let indents = [];
  for (var i = 0; i < this.props.level; i++) {
    indents.push(
      <button
        className="indent"
        onClick={() => this.props.changePage(page)}
        key={i}
      >
        {i + 1}
      </button>
    );
  }
  return (
    <div>
      {/* {props.total.map((page) => {
        return (
          <button
            key={page}
            id={page}
            onClick={() => this.props.changePage(page)}
          >
            {page}
          </button>
        );
      })} */}
    </div>
  );
}
