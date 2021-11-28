import React from 'react'
import SearchResult from './SearchResult';

export default function SearchView(props) {
  return (
    <div>
        {
          props.items.map(item => <SearchResult key={item.idrestaurants} {...item} onChangePage= { props.onChangePage }/>)
        }
    </div>
  )
}
