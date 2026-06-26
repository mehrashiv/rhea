// PostCard.jsx - Individual post card component
import { Calendar, Tag } from 'lucide-react';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-black/60 backdrop-blur-sm rounded-xl border border-gray-700/40 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-80 md:h-64 h-48 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Date */}
          <div className="flex items-center text-gray-400 text-sm mb-3">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(post.date)}
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-3 hover:text-purple-400 transition-colors cursor-pointer">
            {post.title}
          </h2>
          
          {/* Content */}
          <p className="text-gray-400 mb-4 flex-1 leading-relaxed">
            {post.content}
          </p>
          
          {/* Tags */}
          <div className="flex items-center flex-wrap gap-2">
            <Tag className="w-4 h-4 text-purple-400" />
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600/50 hover:bg-gray-700/50 hover:border-purple-500/30 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;