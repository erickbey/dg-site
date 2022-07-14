// const _ = require('lodash');
// const graphql = require('graphql');
// const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } = graphql;
// const Disc = require('../models/discModel');
// const User = require('../models/userModel');
// const Order = require('../models/orderModel'); 


// const DiscType = new GraphQLObjectType({
//     name: 'Disc',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         manufacture: { type: GraphQLString },
//         category: { type: GraphQLString },
//         plasticType: { type: GraphQLString },
//         speed: { type: GraphQLInt },
//         glide: { type: GraphQLInt },
//         turn: { type: GraphQLInt },
//         fade: { type: GraphQLInt },
//         price: { type: GraphQLInt },
//         quantity: { type: GraphQLInt },
//     })
// });

// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         email: { type: GraphQLString },
//         address: { type: GraphQLString },
//         password: { type: GraphQLString },
//         wishlist: {
//             type: GraphQLList(DiscType),
//             resolve(parent, args) {
//                 // return discs.filter(obj => (parent.wishlist).includes(obj.id))
//                 return Disc.find({ id: parent.wishlist })
//             }
//         }
//     })
// });

// const OrderType = new GraphQLObjectType({
//     name: 'Order',
//     fields: () => ({
//         id: { type: GraphQLID },
//         userId: {
//             type: UserType,
//             resolve(parent, args) {
//                 // return _.find(users, { id: parent.userId })
//                 return User.findById(parent.userId)
//             }
//         },
//         items: {
//             type: GraphQLList(DiscType),
//             resolve(parent, args) {
//                 // return discs.filter(obj => (parent.items).includes(obj.id))
//                 return Disc.find({ id: parent.items })
//             }
//         }
//     })
// });

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: () => ({
//         disc: {
//             type: DiscType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 // return _.find(discs, { id: args.id })
//                 return Disc.findById(args.id)
//             }
//         },
//         allDiscs: {
//             type: new GraphQLList(DiscType),
//             resolve(parent, args) {
//                 // return _.find(discs, { id: args.id })
//                 return Disc.find({})
//             }
//         },
//         user: {
//             type: UserType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 // return _.find(users, { id: args.id })
//                 return User.findById(args.id)
//             }
//         },
//         allUsers: {
//             type: new GraphQLList(UserType),
//             resolve(parent, args) {
//                 // return movies;
//                 return User.find({})
//             }
//         },
//         orders: {
//             type: OrderType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 // return _.find(orders, { id: args.id })
//                 return Order.findById(args.id)
//             }
//         }
//     })
// });

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addUser: {
//             type: UserType,
//             args: {
//                 name: { type:  new GraphQLNonNull(GraphQLString) },
//                 email: { type:  new GraphQLNonNull(GraphQLString) },
//                 address: { type:  new GraphQLNonNull(GraphQLString) },
//                 password: { type:  new GraphQLNonNull(GraphQLString) }
//             },
//             resolve(parent, args) {
//                 let newUser = new User({
//                     name: args.name,
//                     email: args.email,
//                     address: args.address,
//                     password: args.password,
//                 })
//                 return newUser.save();
//             }
//         },
//         addDisc : {
//             type: DiscType,
//             args: {
//                 name: { type:  new GraphQLNonNull(GraphQLString) },
//                 manufacture: { type:  new GraphQLNonNull(GraphQLString) },
//                 category: { type:  new GraphQLNonNull(GraphQLString) },
//                 plasticType: { type:  new GraphQLNonNull(GraphQLString) },
//                 speed: { type: new GraphQLNonNull(GraphQLInt) },
//                 glide: { type: new GraphQLNonNull(GraphQLInt) },
//                 turn: { type: new GraphQLNonNull(GraphQLInt) },
//                 fade: { type: new GraphQLNonNull(GraphQLInt) },
//                 price: { type: new GraphQLNonNull(GraphQLInt) },
//                 quantity: { type: new GraphQLNonNull(GraphQLInt) }
//             },
//             resolve(parent, args) {
//                 let newDisc = new Disc({
//                     name: args.name,
//                     manufacture: args.manufacture, 
//                     category: args.category,
//                     plasticType: args.plasticType,
//                     speed: args.speed,
//                     glide: args.glide,
//                     turn: args.turn,
//                     fade: args.fade,
//                     price: args.price,
//                     quantity: args.quantity
//                 })
//                 return newDisc.save();
//             }
//         },
//         addOrder: {
//             type: OrderType,
//             args: {
//                 userId: { type: GraphQLID },
//                 items: { type: GraphQLList(GraphQLID) }
//             },
//             resolve(parent, args) {
//                 let newOrder = new Order({
//                     userId: args.userId,
//                     items: args.items
//                 })
//                 return newOrder.save();
//             }
//         }
//     }
// })


// module.exports = new GraphQLSchema({
//     query: RootQuery,
//     mutation: Mutation
// })