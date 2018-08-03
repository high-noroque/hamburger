import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandle from '../../hoc/withErrorHandle/withErrorHandle'
import axios from '../../axios-orders'
import * as actions from '../../store/actions/'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    console.log(this.props)
    this.props.onInitIngredients()
  }
  //
  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type]
  //   const updatedCount = oldCount + 1
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceAddition = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice + priceAddition
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }
  //
  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type]
  //   if (oldCount <= 0) {
  //     return
  //   }
  //   const updatedCount = oldCount - 1
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount
  //   const priceDeduction = INGREDIENT_PRICES[type]
  //   const oldPrice = this.state.totalPrice
  //   const newPrice = oldPrice - priceDeduction
  //   this.setState({
  //     totalPrice: newPrice,
  //     ingredients: updatedIngredients
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true})
    } else {
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ing
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (this.props.ing) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ing}/>
          <BurgerControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}/>
        </Fragment>
      )
      orderSummary = <OrderSummary
        ingredients={this.props.ing}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price}/>
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>
    }

    return(
      <Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded:(ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved:(ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandle(BurgerBuilder, axios))