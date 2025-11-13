"use client";

import { BookOpen, Clock, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getReadingList,
  removeFromReadingList,
} from "../lib/actions/reading-list";

export default function ReadingList({ userId }) {
  console.log("userId:", userId);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (userId) {
      fetchReadingList();
    }
  }, [userId]);

  const fetchReadingList = async () => {
    try {
      setLoading(true);
      const response = await getReadingList(userId);
      console.log("response:", response);

      if (response.success) {
        setSavedArticles(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to load reading list");
      console.error("Error fetching reading list:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (articleId) => {
    try {
      const response = await removeFromReadingList(articleId, userId);

      if (response.success) {
        console.log("suc:", true);

        setSavedArticles((prev) =>
          prev.filter((article) => article._id !== articleId)
        );
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error removing article:", error);
      alert("Failed to remove article");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your reading list...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchReadingList}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-3xl font-bold text-gray-900">
              Your Reading List
            </h1>
          </div>
          <p className="text-gray-600">
            Articles you've saved for later reading
          </p>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {savedArticles?.length}
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">
              Saved Articles
            </div>
          </div>
        </div>

        {savedArticles?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-12 bg-yellow-400 rounded-t-lg border-2 border-gray-800"></div>
                <div className="w-16 h-12 bg-blue-500 rounded-t-lg border-2 border-gray-800 absolute top-2 left-2"></div>
                <div className="w-16 h-12 bg-orange-600 rounded-t-lg border-2 border-gray-800 absolute top-4 left-4"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your Reading List is Empty
            </h2>
            <p className="text-gray-600 text-center max-w-md mb-6">
              Start building your personal library by saving articles that catch
              your interest. Click the save button on any article to add it
              here.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Explore Trending News
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {savedArticles.map((article) => (
              <div
                key={article._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                    <img
                      src={article.article.urlToImage}
                      alt={article.article.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 hidden`}
                    ></div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {article.article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {article.article.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                            <span>{article.article.source}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {formatDate(article.article.publishedAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Link
                          href="/read-article"
                          onClick={() =>
                            localStorage.setItem(
                              "currentArticle",
                              JSON.stringify(article.article)
                            )
                          }
                        >
                          <button className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                            Read Now
                          </button>
                        </Link>

                        <button
                          onClick={() => handleRemove(article._id)}
                          className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-red-600 transition-colors px-6 py-2 hover:bg-gray-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
