const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')
  
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
            },
        ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User'
            },
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

const User = model('User', userSchema);

userSchema.virtual("friendCount").get(function(){
  return this.friends.length;
})

userSchema.virtual("thoughtCount").get(function(){
  return this.thoughts.length;
})


module.exports = User;
