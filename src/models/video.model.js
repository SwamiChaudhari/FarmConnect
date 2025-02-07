import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    VideoFile: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId, // comment id
        ref: "Comment", // reference to Comment model
      },
    ],

    likes: [
      {
        type: Schema.Types.ObjectId, // user id
        ref: "User", // reference to User model
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId, // user id
        ref: "User", // reference to User model
      },
    ],

    channel: {
      type: Schema.Types.ObjectId, // channel id
      ref: "Channel", // reference to Channel model
    },
  },
  {
    timestamps: true, // createdAt, updatedAt fields are automatically added to the schema
  }
);

videoSchema.plugin(mongooseAggregatePaginate);


export const Video = mongoose.model("Video", videoSchema);



