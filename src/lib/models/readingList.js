// models/readingList.js
import mongoose from 'mongoose';

const readingListSchema = new mongoose.Schema({
  userId: {
    type: String,
  
    required: true
  },
  article: {
    author: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    publishedAt: {
      type: Date,
      required: true
    },
    source: {
         type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    urlToImage: {
      type: String,
      default: ""
    }
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
 
});


const ReadingList = mongoose.models.ReadingList || mongoose.model('ReadingList', readingListSchema);

export default ReadingList;