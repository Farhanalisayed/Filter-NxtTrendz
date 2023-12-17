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
    activeRatingID,
    activeCategoryID,
    searchInput,
  } = props

  const onInputChanged = event => {
    if (event.key === 'Enter') {
      updateSearchInput(event.target.value)
    }
  }

  const onClicked = () => {
    let input = document.getElementById('input').value
    updateSearchInput(inputVal)
  }

  const renderCategories = () => (
    <div className="category-cont">
      <h1 className="category-header">Category</h1>
      <ul className="category-cont">
        {categoryOptions.map(each => {
          const onCategoryChanged = () => {
            updateCategory(each.categoryId)
          }
          const isActive = activeCategoryID === each.id
          const catClass = isActive ? 'clicked-category' : 'category'

          return (
            <li onClick={onCategoryChanged}>
              <button className={catClass} type="button">
                <p>{each.name}</p>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const rendeRatings = () => (
    <div>
      <h1 className="rating-heading">Rating</h1>
      <ul className="ratings-cont">
        {ratingsList.map(each => {
          const onRatingChanged = () => {
            updateRatings(each.ratingId)
          }
          const ratingClass = activeRatingID === each.id ? 'clicked-up' : 'up'

          return (
            <li className="stars-cont" onClick={onRatingChanged}>
              <img
                className="star"
                src={each.imageUrl}
                alt={`rating ${each.ratingId}`}
              />
              <p className={ratingClass}>& up</p>
            </li>
          )
        })}
      </ul>
    </div>
  )

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
          className="bar"
        />
        <IoIosSearch className="icon" onClick={onClicked} />
      </div>

      {renderCategories()}
      {rendeRatings()}

      <button onClick={onReset} className="btn">
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
