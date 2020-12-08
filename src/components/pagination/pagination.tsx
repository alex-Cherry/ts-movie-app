import React from 'react';
// Bootstrap
import { Pagination as BPagination } from 'react-bootstrap';
// CSS
import './pagination.scss';


type PaginationRenderParameters = {
  mostLeftPageInMainGroup: number,
  mostRightPageInMainGroup: number,
  displayFirstPage: boolean,
  displayLastPage: boolean,
  displayLeftEllipsis: boolean,
  displayRightEllipsis: boolean
};

// PROPS TYPE
type MoviesPaginationProps = {
  currentPage: number,
  totalItems: number,
  perPage: number,

  // => Events
  onPageChanged?: (page: number) => void
};


////////////////////////////////////////////////////////////////////////////////
// 
// COMPONENT
// 
////////////////////////////////////////////////////////////////////////////////

const Pagination = (props: MoviesPaginationProps) => {

  // ===< PROPS >===
  // 
  const { currentPage } = props;

  // ===< UTILS >===
  // 
  /**
   * Launches the "onPageChanged" handler from the props
   *  with the specified page
   * 
   * @param page - the page where to go
   */
  const runPageChanged = (page: number) => {
    const { onPageChanged = (page: number) => {} } = props;
    onPageChanged(page);
  }
  const amountPagesInMainGroup = (): number => {
    return 5;
  }
  /**
   * Computes and returns total number of pages 
   */
  const computeTotalPages = (): number => {
    const { totalItems, perPage } = props;
    return Math.ceil(totalItems / perPage);
  }
  /**
   * Compute the parameters required for rendering the component
   */
  const computeParametersOfRendering = (): PaginationRenderParameters => {

    const totalPages: number = computeTotalPages();
    const amountPagesInGroup = amountPagesInMainGroup();
    const amountPagesOnEachSideOfCurrentPage = Math.floor((amountPagesInGroup - 1) / 2);
    let mostLeftPageInMainGroup = 1;
    let mostRightPageInMainGroup = 1;
    let displayFirstPage = false;
    let displayLastPage = false;
    let displayLeftEllipsis = false;
    let displayRightEllipsis = false;

    // If the first page is active
    // 
    if (currentPage === 1) {

      // The most left page
      mostLeftPageInMainGroup = 1;
      // The most right page
      mostRightPageInMainGroup = mostLeftPageInMainGroup + amountPagesInGroup - 1;
      mostRightPageInMainGroup = (mostRightPageInMainGroup > totalPages)
        ? totalPages
        : mostRightPageInMainGroup;

    // If the last page is active
    // 
    } else if (currentPage === totalPages) {

      // The most right page
      mostRightPageInMainGroup = totalPages;
      // The most left page
      mostLeftPageInMainGroup = mostRightPageInMainGroup - amountPagesInGroup + 1;
      mostLeftPageInMainGroup = (mostLeftPageInMainGroup < 1)
        ? 1
        : mostLeftPageInMainGroup;

    // If active page is between the first and the last
    } else {

      // The most left page
      mostLeftPageInMainGroup = currentPage - amountPagesOnEachSideOfCurrentPage;
      mostLeftPageInMainGroup = (mostLeftPageInMainGroup < 1)
        ? 1
        : mostLeftPageInMainGroup;
      // The most right page
      mostRightPageInMainGroup = currentPage + amountPagesOnEachSideOfCurrentPage;
      mostRightPageInMainGroup = (mostRightPageInMainGroup > totalPages)
        ? totalPages
        : mostRightPageInMainGroup;

      const diff = amountPagesInGroup - (mostRightPageInMainGroup - mostLeftPageInMainGroup + 1);
      if (diff) {
        if (mostLeftPageInMainGroup === 1) {
          mostRightPageInMainGroup += diff;
        } else {
          mostLeftPageInMainGroup -= diff;
        }
      }

    }

    // Display the first page
    displayFirstPage = mostLeftPageInMainGroup > 1;
    // Display the last page
    displayLastPage = mostRightPageInMainGroup < totalPages;

    // Display the left ellipsis
    displayLeftEllipsis = (mostLeftPageInMainGroup - 1) > 1;
    // Display the right ellipsis
    displayRightEllipsis = (mostRightPageInMainGroup + 1) < totalPages;

    return {
      mostLeftPageInMainGroup,
      mostRightPageInMainGroup,
      displayFirstPage,
      displayLastPage,
      displayLeftEllipsis,
      displayRightEllipsis
    };
  }


  // ===< HOOKS >===
  // 
  React.useEffect(() => {
    // console.log('Pagination - creation')
  }, []);


  // ===< EVENT HANDLERS >===
  // 
  const onClickItemHandler = (page: number) => {
    runPageChanged(page);
  }
  const onClickPrevHandler = () => {
    if (currentPage === 1) {
      return;
    }
    runPageChanged(currentPage - 1);
  }
  const onClickNextHandler = () => {
    if (currentPage === computeTotalPages()) {
      return;
    }
    runPageChanged(currentPage + 1);
  }


  // ===< RENDER FUNCTIONS >===
  const renderItems = () => {

    const totalPages = computeTotalPages();
    const items = [];
    
    const {
      displayFirstPage,
      displayLeftEllipsis,
      mostLeftPageInMainGroup,
      mostRightPageInMainGroup,
      displayRightEllipsis,
      displayLastPage
    } = computeParametersOfRendering();
    
    // The first page
    if (displayFirstPage) {
      items.push(
        <BPagination.Item
          key={ 1 }
          active={ currentPage === 1 }
          onClick={ () => onClickItemHandler(1) }
        >
          { 1 }
        </BPagination.Item>
      );
    }
    // The left ellipsis
    if (displayLeftEllipsis) {
      items.push(
        <BPagination.Ellipsis key="leftEllipsis" className="page-ellipsis" />
      );
    }
    // The main group
    for (let i = mostLeftPageInMainGroup; i <= mostRightPageInMainGroup; i++) {
      items.push(
        <BPagination.Item
          key={ i }
          active={ currentPage === i }
          onClick={ () => onClickItemHandler(i) }
        >
          { i }
        </BPagination.Item>
      );
    }
    // The right ellipsis
    if (displayRightEllipsis) {
      items.push(
        <BPagination.Ellipsis key="rightEllipsis" className="page-ellipsis" />
      );
    }
    // The last page
    if (displayLastPage) {
      items.push(
        <BPagination.Item
          key={ totalPages }
          active={ currentPage === totalPages }
          onClick={ () => onClickItemHandler(totalPages) }
        >
          { totalPages }
        </BPagination.Item>
      );
    }

    return items;
  }


  // ===< RENDER >===
  // 
  return (
    <BPagination className="d-flex justify-content-center movies-pagination">
      <BPagination.Prev
        disabled={ currentPage === 1 }
        onClick={ onClickPrevHandler }
      />
      { renderItems() }
      <BPagination.Next
        disabled={ currentPage === computeTotalPages() }
        onClick={ onClickNextHandler }
      />
    </BPagination>
  );
};

export default Pagination;
