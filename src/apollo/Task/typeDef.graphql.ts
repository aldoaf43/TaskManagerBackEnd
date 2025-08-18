import {gql} from 'graphql-tag';

export default gql@gql`
    type Task implements Node @cacheControl(maxAge: 60, scope: PRIVATE) {
        _id: ID!
        title: String!
         description: String!
         completed: Boolean!
         user: 
         dueDate: Date!
         recurrent: Recurrent
         reminders: [Date!]!
    }

    input Recurrent {
        
    }
`;