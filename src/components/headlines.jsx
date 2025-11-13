"use client";
import React from "react";
import { useState } from "react";
import { Flame, Clock, Eye, Bookmark } from "lucide-react";
import { addReadingListData } from "../lib/actions/reading-list";
import Link from "next/link";

const Headlines = ({ articles, userId }) => {
  const [loading, setLoading] = useState(false);
  console.log("articles:", articles);

  console.log("content:", articles[0]?.content);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const addToReadingList = async(data) => {

      if (!userId) {
      alert("Please log in to add articles to reading list");
      return;
    }
    
    try{
      setLoading(true);
       console.log("reading list data:", data);
    const articleData = {
      article: {...data, source: data.source.name},
      userId,
    }

    console.log("article data:", articleData);

    const response = await addReadingListData(articleData);
    console.log("response:", response)
     if (response.success) {
        alert("Article added to reading list!");
        setLoading(false);
      } else {
        alert(response.message || "Failed to add article");
        setLoading(false);
      }
    }
    catch(error){ 
      console.log("error:", error);
       alert("Failed to add article to reading list");
       setLoading(false);

    }

  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* <div className={`rounded-2xl bg-linear-to-br ${articles[0].gradient} h-96`}></div> */}
        <img
          src={articles[0]?.urlToImage}
          alt={articles[0]?.title}
          className="w-full h-96 object-cover rounded-2xl"
        />
        <div className="flex flex-col justify-center">
          {/* <span className={`${articles[0].categoryColor} text-white text-sm font-bold px-3 py-1 rounded-md inline-block w-fit mb-4`}>
              {articles[0].category}
            </span> */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {articles[0]?.title}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {articles[0]?.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4 text-red-500" />
              <span>{articles[0]?.source?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(articles[0]?.publishedAt)}</span>
            </div>
            {/* <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{articles[0].views}</span>
              </div> */}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/read-article"
              onClick={() =>
                localStorage.setItem(
                  "currentArticle",
                  JSON.stringify(articles[0])
                )
              }
            >
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer">
                Read Full Story
              </button>
            </Link>
            <button onClick={()=> addToReadingList(articles[0])} className="p-3 bg-gray-100 cursor-pointer text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              {loading ? "Adding...": <Bookmark className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.slice(1).map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* <div
              className={`h-48 bg-gradient-to-br ${article.gradient} rounded-t-2xl`}
            ></div> */}
            <img
              src={article?.urlToImage}
              alt={article?.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              {/* <span className={`${article.categoryColor} text-white text-xs font-bold px-3 py-1 rounded-md inline-block mb-3`}>
                  {article.category}
                </span> */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {article?.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article?.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-red-500" />
                  <span>{article?.source?.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(article?.publishedAt)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="/read-article"
                  onClick={() =>
                    localStorage.setItem(
                      "currentArticle",
                      JSON.stringify(article)
                    )
                  }
                >
                  <button className="text-gray-700 cursor-pointer font-medium text-sm hover:text-blue-600 transition-colors flex items-center gap-1">
                    Read More →
                  </button>
                </Link>
                <button onClick={()=> addToReadingList(article)} className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors">
                  {loading ? "Adding...": <Bookmark className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Headlines;
