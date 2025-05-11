
import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

interface PortfolioItemProps {
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
  technologies?: string[];
}

const PortfolioItem = ({ 
  title, 
  category, 
  image, 
  description, 
  link, 
  technologies = [] 
}: PortfolioItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <div 
        className="card group cursor-pointer overflow-hidden p-0"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative overflow-hidden h-64">
          {/* Placeholder for the image */}
          <div 
            className="w-full h-full bg-gray-200 flex items-center justify-center"
            style={{backgroundImage: image ? `url(${image})` : 'none', backgroundSize: 'cover'}}
          >
            {!image && <span className="text-gray-400">Portfolio Image</span>}
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-blue-800/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
            <div className="text-white text-center p-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm text-blue-200 uppercase tracking-wider mb-1">{category}</p>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-sm mt-2">Click to view details</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-blue-900/80 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-gray-200 h-64 md:h-auto flex items-center justify-center">
                {image ? (
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">Portfolio Image</span>
                )}
              </div>
              
              <div className="w-full md:w-1/2 p-6 md:p-8">
                <p className="text-sm text-blue-600 uppercase tracking-wider mb-1">{category}</p>
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                
                <div className="mb-4">
                  <p className="text-gray-700">{description}</p>
                </div>
                
                {technologies.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {link && (
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioItem;
