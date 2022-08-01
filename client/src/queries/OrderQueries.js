import { gql } from '@apollo/client';

const ADD_ORDER_MUTATION = gql`
    mutation($items:[String!]){
        addOrder(input: {items: $items}){
            userErrors {
                message
            }
            status
        }
    }
`

export { ADD_ORDER_MUTATION }