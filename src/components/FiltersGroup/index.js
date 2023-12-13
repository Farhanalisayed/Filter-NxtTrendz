import {IoIosSearch} from 'react-icons/io'

import './index.css'

const FiltersGroup = props => {
  const {
    updateSearchInput,
    updateCategory,
    updateRatings,
    onResetting,
    categoryOptions,
    ratingsList,
  } = props

  let searchInput
  const onInputChanged = event => {
    if (event.target.value !== '' && event.key === 'Enter') {
      updateSearchInput(event.target.value)
      searchInput = event.target.value
    }
    searchInput = ''
  }

  const onClicked = () => {
    const inputVal = document.getElementById('input').value
    updateSearchInput(inputVal)
  }

  const onCategoryChanged = event => {
    updateCategory(event.target.each.id)
  }

  const onRatingChanged = event => {
    updateRatings(event.target.each.id)
  }

  const onReset = () => {
    onResetting()
  }

  return (
    <div className="filters-group-container">
      <h1>Filters Group</h1>
      <div className="search-cont">
        <input
          type="search"
          id="input"
          placeholder="Search"
          onKeyDown={onInputChanged}
          value={searchInput}
          className="bar"
        />
        <IoIosSearch className="icon" onClick={onClicked} />
      </div>

      <div className="category-cont">
        <h1 className="category-header" value={0} onClick={onCategoryChanged}>
          Category
        </h1>
        <ul className="category-cont">
          {categoryOptions.map(each => (
            <li className="category" onClick={onCategoryChanged}>
              {each.name}
            </li>
          ))}
        </ul>
      </div>

      <ul className="ratings-cont">
        {ratingsList.map(each => (
          <li onClick={onRatingChanged} className="stars-cont">
            <img
              className="star"
              src={each.imageUrl}
              alt={`rating${each.ratingId}`}
            />
            <p className="up">& up</p>
          </li>
        ))}
      </ul>

      <button onClick={onReset} className="btn">
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
