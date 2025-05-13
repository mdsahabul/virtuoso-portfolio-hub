
import { useData } from '../context/DataContext';
import { Rating } from './Rating';

const ReviewsSection = () => {
  const { reviewsSection } = useData();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{reviewsSection.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{reviewsSection.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsSection.reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                {review.image ? (
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/56?text=?';
                    }}
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-xl font-semibold">{review.name[0]}</span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-lg">{review.name}</h4>
                  {review.company && (
                    <p className="text-gray-600 text-sm">{review.company}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <Rating value={review.rating} readOnly />
              </div>
              
              <p className="text-gray-700 italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
