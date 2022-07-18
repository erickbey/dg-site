import { gql } from '@apollo/client';

const ADD_USER_MUTATION = gql`
  mutation($name: String!, $userName: String!, $email: String!, $password: String!, $passwordConfirm: String!) {
      addUser(input: {name: $name, userName: $userName, email: $email, password: $password, passwordConfirm: $passwordConfirm}) {
        userErrors {
          message
        }
        token
      }
    }
  `

const SIGN_IN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
      signIn(input: {email: $email, password: $password}) {
        userErrors {
           message
        }
        token
      }
    }
  `

const GET_USER = gql`
{
  user {
      id
      name
      userName
      email
      image
      reviews {
        title
        comment
        rating
      }
      wishlist {
        id
        name
        price
      }
      orders {
        items {
          name
          price
        }
      }
  }
}`

const ADD_TO_WISHLIST_MUTATION = gql `
  mutation($input: ID!){
    addToWishlist(input: $input) {
      userErrors {
        message
      }
      status
    }
}`

const DELETE_FROM_WISHLIST_MUTATION = gql `
  mutation($input: ID!){
    deleteFromWishlist(input: $input) {
      userErrors {
        message
      }
      status
    }
}`

const CHANGE_PASSWORD_MUTATION = gql `
  mutation($input: ID!){
      deleteFromWishlist(input: $input) {
        userErrors {
          message
        }
        status
      }
  }
`

const CHANGE_USER_INFO_MUTATION = gql `
  mutation($input: ID!){
      deleteFromWishlist(input: $input) {
        userErrors {
          message
        }
        status
      }
  }
`


export { ADD_USER_MUTATION, SIGN_IN_MUTATION, GET_USER, ADD_TO_WISHLIST_MUTATION, DELETE_FROM_WISHLIST_MUTATION, CHANGE_PASSWORD_MUTATION, CHANGE_USER_INFO_MUTATION }