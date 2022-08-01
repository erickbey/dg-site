import { gql } from '@apollo/client';

const ADD_REVIEW_MUTATION = gql`
    mutation($user:String!, $disc:String!, $title:String!, $comment:String!, $rating:Int!){
        addReview(input: {user: $user, disc: $disc, title: $title, comment: $comment, rating: $rating}){
            userErrors {
                message
            }
            status
        }
    }
`

const GET_DISC_REVIEWS = gql`
    {
        reviews { 
            user {
                userName
            }
            disc {
                id
            }
            title
            comment
            rating
        }
    }
`

export { ADD_REVIEW_MUTATION, GET_DISC_REVIEWS }