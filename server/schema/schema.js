const { gql } = require('apollo-server');

exports.typeDefs = gql`
    type Query {
        allDiscs: [Disc!]!
        disc(id: ID!): Disc
        user: User
        reviews: [Review!]!
        orders: [Order!]!
     }

     type Mutation {
        addDisc(input: AddDiscInput): MutationPayload!
        addUser(input: AdduserInput): AuthPayload!
        updateUser(input: UpdateUserInput): MutationPayload!
        changePassword(input: changePasswordInput): MutationPayload!
        signIn(input: CredentialsInput): AuthPayload!
        addReview(input: AddReviewInput): MutationPayload!
        addOrder(input: AddOrderInput): MutationPayload!
        deleteReview(id: ID!): MutationPayload!
        addToWishlist(input: ID!): MutationPayload!
        deleteFromWishlist(input: ID!): MutationPayload!
     }

    type Disc {
        id: ID!
        name: String!
        manufacture: String!
        category: String!
        plasticType: String
        speed: Int!
        glide: Int!
        turn: Int!
        fade: Int!
        image: String!
        price: Float!
        quantity: Int!
    }

    input AddDiscInput {
        name: String!
        manufacture: String!
        category: String!
        plasticType: String
        speed: Int!
        glide: Int!
        turn: Int!
        fade: Int!
        image: String
        price: Float!
        quantity: Int!
    }

    type User {
        id: ID!
        name: String!
        userName: String!
        email: String!
        password: String!
        image: String
        wishlist: [Disc!]
        reviews: [Review!]
        orders: [Order!]
    }

    input AdduserInput {
        name: String!
        userName: String!
        email: String!
        password: String!
        passwordConfirm: String!
    }

    input UpdateUserInput {
        name: String!
        userName: String!
        email: String!
    }

    input changePasswordInput {
        currentPassword: String!
        password: String!
        passwordConfirm: String!
    }

    type Order {
        id: ID!
        user: User!
        items: [Disc!]!
    }

    input AddOrderInput {
        items: [String]
    }

    type Review {
        id: ID!
        user: User!
        disc: Disc!
        date: String!
        title: String!
        comment: String!
        rating: Int!
    }

    input AddReviewInput {
        user: String!
        disc: String!
        title: String!
        comment: String!
        rating: Int!
    }

    type UserError {
        message: String!
    }

    type AuthPayload {
        userErrors: [UserError!]!
        token: String
    }

    type MutationPayload {
        userErrors: [UserError!]!
        status: String
    }

    input CredentialsInput {
        email: String!
        password: String!
    }
`