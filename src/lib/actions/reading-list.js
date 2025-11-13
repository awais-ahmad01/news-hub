'use server'

import ReadingList from "../models/readingList";
import { connectToDatabase } from "../mongoose";

export async function addReadingListData(data) {
    try {
        await connectToDatabase();
        
        
        const existingArticle = await ReadingList.findOne({
            userId: data.userId,
            'article.url': data.article.url
        });

        if (existingArticle) {
            return { success: false, message: "Article already in reading list" };
        }

        const newData = new ReadingList(data);
        await newData.save();

          
        
        return { success: true, data: JSON.parse(JSON.stringify(newData)) };
    } catch (error) {
        console.error("Error:", error);
        return { 
            success: false, 
            message: "Failed to add article",
            error: error.message 
        };
    }
}


export async function getReadingList(userId) {
    try {
        await connectToDatabase();
        
        const readingList = await ReadingList.find({ userId })
            .sort({ addedAt: -1 }) 
            .lean(); 

        return { 
            success: true, 
             data: JSON.parse(JSON.stringify(readingList)) 
        };
    } catch (error) {
        console.error("Error fetching reading list:", error);
        return { 
            success: false, 
            message: "Failed to fetch reading list",
            
        };
    }
}


export async function removeFromReadingList(itemId, userId) {
    try {
        await connectToDatabase();
        
        const result = await ReadingList.findOneAndDelete({ 
            _id: itemId, 
            userId: userId 
        });

        if (!result) {
            return { 
                success: false, 
                message: "Article not found in your reading list" 
            };
        }

        return { 
            success: true, 
            message: "Article removed from reading list" 
        };
    } catch (error) {
        console.error("Error removing from reading list:", error);
        return { 
            success: false, 
            message: "Failed to remove article from reading list" 
        };
    }
}