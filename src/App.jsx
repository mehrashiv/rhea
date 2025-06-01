// App.jsx - Main blog application
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PostCard from './components/PostCard';
import { blogPosts } from './posts';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  
  // Sort posts by date (latest first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Calculate pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);
  
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/30">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Rhea's<span className="text-purple-400"> Space</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Fashion, Art, projects and more....
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Blog Posts */}
        <div className="space-y-6">
          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12">
            {/* Previous Button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 hover:border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            
            {/* Page Numbers */}
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    currentPage === page
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-gray-800/50 text-gray-300 border-gray-600/50 hover:bg-gray-700/50 hover:border-purple-500/30'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            {/* Next Button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 hover:border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
        
        {/* Page Info */}
        <div className="text-center mt-6 text-gray-400">
          Showing {startIndex + 1}-{Math.min(startIndex + postsPerPage, sortedPosts.length)} of {sortedPosts.length} posts
        </div>
      </main>
    </div>
  );
}

export default App;