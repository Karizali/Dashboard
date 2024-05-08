import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import axios from 'axios';
import { limits } from 'chroma-js';

export default function PaginationControlled({ paginationData }) {


  const [page, setPage] = React.useState(paginationData.pageAndLimit.page);

  useEffect(() => {
    setPage(paginationData.pageAndLimit.page);
  }, [paginationData.pageAndLimit.page]);

  const handleChange = (event, value) => {

    let limit;
    limit = 10;

    paginationData.SetPageAndLimit(
      {
        page: value,
        limit
      })
    
    console.log("Value " + value)
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={paginationData.totalPages} page={page} onChange={handleChange} />
    </Stack>
  );
}

PaginationControlled.propTypes = {
  paginationData: PropTypes.object.isRequired
};
