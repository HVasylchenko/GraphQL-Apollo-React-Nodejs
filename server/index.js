const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors'); 
const schema = require('./schema');
const users = [{id: 1, username: "Vasya", age: 25}];

const createUser1 = (input)=>{
    const id = Date.now();
    return {
        id, ...input
    }
}

const root= {
    getAllUsers: ()=>{
        return users
    },
    getUser: (id)=>{
        return users.find(user => user.id==id)
    },
    createUser: ({input}) => {
        const user = createUser1(input);
        users.push(user);
        return user;
    }
}

const app = express();
app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
      rootValue: root,
    }),
  );

app.listen(5000, () => {
  console.log("Server run on port 5000");
});
