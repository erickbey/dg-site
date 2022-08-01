import { gql } from '@apollo/client';

const ADD_DISC_MUTATION = gql`
    mutation($name:String!, $manufacture:String!, $category:String!, $plasticType:String!, $speed:Int!, $glide:Int!, $turn:Int!, $fade:Int!, $price:Float!, $quantity:Int!, $image:String!){
        addDisc(input: {name: $name, manufacture: $manufacture, category: $category, plasticType: $plasticType, speed: $speed, glide: $glide, turn: $turn, fade: $fade, price: $price, quantity: $quantity, image: $image}){
            userErrors {
                message
            }
            status
        }
    }
`

const GET_ALL_DISCS = gql`
{
    allDiscs {
        id
        name
        price
        manufacture
        image
    }
}`

const GET_ONE_DISC = gql`
    query GetDisc($id: ID!) {
       disc(id: $id){
            id
            name
            manufacture
            category
            plasticType
            speed
            turn
            glide
            fade
            price
            quantity
            image 
        }
    }
`


export { ADD_DISC_MUTATION, GET_ALL_DISCS, GET_ONE_DISC }