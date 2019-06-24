import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';

import PaginationItem from '../pagination-item';
import { MOVIES_STORE } from '../../mobx/stores/movies';
import MovieStorePropTypes from '../../mobx/stores/movies';

import './pagination-panel.css';

@inject(MOVIES_STORE)
@observer
class PaginationPanel extends Component {
  static propTypes = {
    MOVIES_STORE: PropTypes.shape({
      MovieStorePropTypes,
    }),
  };

  renderPagBegin = () => {
    const { [MOVIES_STORE]: { currentPage, changeCurrentPage } } = this.props;
    const style = classNames({
      invisible: currentPage === 1,
    });
    return (
      <Fragment>
        <PaginationItem
          title="First"
          btnStyle="active"
          onHandleChangePage={changeCurrentPage}
          pageItemStyle={style}
          currentPage={1}
        />

        <PaginationItem
          title="Prev"
          onHandleChangePage={changeCurrentPage}
          pageItemStyle={style}
          currentPage={currentPage - 1}
        />
      </Fragment>
    );
  };

  renderPages = () => {
    const { [MOVIES_STORE]: { currentPage, pagesCount, changeCurrentPage } } = this.props;
    const pageIndex = currentPage - 1;

    const PAGES_ARR = Array.from({ length: pagesCount }, (v, k) => k + 1);

    const prefPages = PAGES_ARR.slice(0, pageIndex);
    const afterPages = PAGES_ARR.slice(pageIndex + 1);
    const pageCount = 1;

    const pref = prefPages.length > pageCount ? prefPages.slice(-pageCount) : prefPages;
    const after = afterPages.length > pageCount
      ? afterPages.slice(0, pageCount)
      : afterPages;

    return (
      <Fragment>
        {prefPages.length > pageCount ? (
          <PaginationItem title="..." />
        ) : null}
        {this.renderPageNumbers(pref)}
        <PaginationItem
          key={`pagebutton-${currentPage}`}
          title={currentPage}
          btnStyle="active"
          onHandleChangePage={changeCurrentPage}
          currentPage={currentPage}
        />
        {this.renderPageNumbers(after)}
        {afterPages.length > pageCount ? (
          <PaginationItem title="..." />
        ) : null}
      </Fragment>
    );
  };

  renderPageNumbers = pages => (
    <Fragment>{pages.map(this.renderPageButton)}</Fragment>
  );

  renderPageButton = (pageNumber) => {
    const { [MOVIES_STORE]: { changeCurrentPage } } = this.props;
    return (
      <PaginationItem
        key={`pagebutton-${pageNumber}`}
        title={pageNumber}
        onHandleChangePage={changeCurrentPage}
        currentPage={pageNumber}
      />
    );
  };

  renderPagEnd = () => {
    const { [MOVIES_STORE]: { currentPage, pagesCount, changeCurrentPage } } = this.props;
    const style = classNames({
      invisible: currentPage === pagesCount,
    });

    return (
      <Fragment>
        <PaginationItem
          title="Next"
          onHandleChangePage={changeCurrentPage}
          pageItemStyle={style}
          currentPage={currentPage + 1}
        />

        <PaginationItem
          title="Last"
          btnStyle="active"
          onHandleChangePage={changeCurrentPage}
          pageItemStyle={style}
          currentPage={pagesCount}
        />
      </Fragment>
    );
  };

  render() {
    return (
      <div className="pagination-panel">
        <nav className="aria-label">
          <ul className="pagination justify-content-center">
            {this.renderPagBegin()}
            {this.renderPages()}
            {this.renderPagEnd()}
          </ul>
        </nav>
      </div>
    );
  }
}


export default PaginationPanel;
