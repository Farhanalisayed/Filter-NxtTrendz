import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'
import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const constants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  noProducts: 'INO_PRODUCTS',
}

class AllProductsSection extends Component {
  state = {
    isLoading: false,
    apiStatus: '',
    productsList: [],
    activeCategoryID: '',
    searchInput: '',
    activeOptionId: sortbyOptions[0].optionId,
    activeRatingID: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    // TODO: Update the code to get products with filters applied
    const {activeOptionId, activeCategoryID, searchInput, activeRatingID} =
      this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryID}&title_search=${searchInput}&rating=${activeRatingID}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: constants.success,
        isLoading: false,
      })
    } else if (response.status === 401) {
      this.setState({
        isLoading: false,
        apiStatus: constants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  updateSearchInput = inputValue => {
    this.setState({searchInput: inputValue}, this.getProducts)
  }

  updateCategory = activeCategoryID => {
    this.setState({activeCategoryID}, this.getProducts)
  }

  updateRatings = activeRatingID => {
    this.setState({activeRatingID}, this.getProducts)
  }

  onResetting = () => {
    this.setState(
      {
        activeCategoryID: '',
        searchInput: '',
        activeOptionId: sortbyOptions[0].optionId,
        activeRatingID: '',
      },
      this.getProducts,
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    // TODO: Add No Products View
    const lengthy = productsList.length

    return lengthy > 0 ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-prod-cont">
        <img
          className="image_1"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
        />
        <h1 className="err-heading">No Products Found</h1>
        <p className="err-para">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }
  // TODO: Add failure view

  renderFailureView = () => (
    <div className="no-prod-cont">
      <img
        className="image_1"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        alt="no products"
      />
      <h1 className="err-heading">Oops! Something Went Wrong</h1>
      <p className="err-para">
        We are having some trouble processing your request.
        <br />
        Please try again.
      </p>
    </div>
  )

  renderResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.success:
        return this.renderProductsList()
      case constants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {isLoading, activeCategoryID, activeRatingID, searchInput} =
      this.state

    return (
      <div className="all-products-section">
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          updateSearchInput={this.updateSearchInput}
          updateCategory={this.updateCategory}
          updateRatings={this.updateRatings}
          onResetting={this.onResetting}
          activeCategoryID={activeCategoryID}
          activeRatingID={activeRatingID}
          searchInput={searchInput}
        />
        {isLoading ? this.renderLoader() : this.renderResults()}
      </div>
    )
  }
}

export default AllProductsSection
