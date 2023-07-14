import classes from "./Pagination.module.css";
import { data } from "./Data";
import { Fragment, useState } from "react";

const Pagination = () => {
  let datax = data;

  //when the page renders, it should start on firstpage, current Page:
  const [currentPage, setCurrentPage] = useState(1);
  //how many items do you want displayed on a page:
  const [itemsPerPage, setItemsPerPage] = useState(5);

  //how many numbers do you want to show in the pagination
  const [pageNumberLimit, setPageNumberLimit] = useState(5);

  //max number value to show in the pagination:
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  //min number value to show in the pagination:
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //lets get out the numbers from the data and store them in an array:
  const array = [];
  for (let i = 1; i <= Math.ceil(datax.length / itemsPerPage); i++) {
    array.push(i);
    //by dividing datax.length by itemsperpage, we set our pagination to have 6 pages, 30/5.
  }
  console.log(array);
  const numbers = array;

  //to group the 5 items how they would appear per page:
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentItems = datax.slice(indexFirstItem, indexLastItem);
  //console.log(currentItems)

  //to configure the pagination buttons to be functional:
  const clickHandler = (numberId) => {
    setCurrentPage(Number (numberId));
  };

  datax = (
    <ul>
      {/* {datax.map((d) => { */}
      {currentItems.map((d) => {
        return (
          <div key={d.id}>
            <li>
              <div>
                {d.name}
                <p>{d.status}</p>
              </div>
            </li>
          </div>
        );
      })}
    </ul>
  );
  // const renderPagesNumber = numbers.map((number)=>{
  //     return(
  //         <li key={number} id={number}>{number}</li>
  //     )
  //   });

  

  return (
    <Fragment>
      <div className={classes.pagination}>{datax}</div>
      <ul className={classes.numbers}>
        {numbers.map((number) => {
          return (
            <li
              id={number}
              key={number}
              className={`${currentPage===number ? classes.active: ""}`}
              onClick={()=>clickHandler(number)}>
              {number}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default Pagination;
