
import { useState } from 'react';
import { useData } from '../../../../context/DataContext';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Eye, Plus, X, Star } from 'lucide-react';
import { Rating } from '@/components/Rating';

const ReviewsEditor = () => {
  const { reviewsSection, updateReviewsSection } = useData();
  const [formData, setFormData] = useState({ ...reviewsSection });
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // For adding new reviews
  const [reviewName, setReviewName] = useState('');
  const [reviewCompany, setReviewCompany] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewImage, setReviewImage] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const addReview = () => {
    if (reviewName.trim() && reviewText.trim()) {
      setFormData(prev => ({
        ...prev,
        reviews: [...prev.reviews, {
          id: Date.now().toString(),
          name: reviewName.trim(),
          company: reviewCompany.trim(),
          text: reviewText.trim(),
          rating: reviewRating,
          image: reviewImage.trim()
        }]
      }));
      
      // Reset form
      setReviewName('');
      setReviewCompany('');
      setReviewText('');
      setReviewRating(5);
      setReviewImage('');
      
      toast.success('Review added to the list');
    } else {
      toast.error('Name and review text are required');
    }
  };
  
  const removeReview = (id: string) => {
    setFormData(prev => ({
      ...prev,
      reviews: prev.reviews.filter(review => review.id !== id)
    }));
    toast.success('Review removed');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      updateReviewsSection(formData);
      toast.success('Reviews section updated successfully');
    } catch (error) {
      toast.error('An error occurred while updating the reviews section');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Reviews & Testimonials</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPreviewMode(!previewMode)}
          className="gap-2"
        >
          <Eye size={16} />
          {previewMode ? 'Edit Mode' : 'Preview'}
        </Button>
      </div>
      
      {previewMode ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">{formData.title}</h2>
              <p className="text-gray-600">{formData.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formData.reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center mb-4">
                    {review.image ? (
                      <img 
                        src={review.image} 
                        alt={review.name} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=?';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <span className="text-gray-500 text-xl">{review.name[0]}</span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      {review.company && (
                        <p className="text-sm text-gray-600">{review.company}</p>
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
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter section title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle">Section Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Enter section subtitle"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Reviews & Testimonials</Label>
              <div className="space-y-4 mb-6">
                {formData.reviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {review.image ? (
                          <img 
                            src={review.image} 
                            alt={review.name} 
                            className="w-8 h-8 rounded-full mr-2 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32?text=?';
                            }}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <span className="text-gray-500">{review.name[0]}</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{review.name}</p>
                          {review.company && (
                            <p className="text-xs text-gray-600">{review.company}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeReview(review.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    
                    <div className="mt-2">
                      <Rating value={review.rating} readOnly />
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-3">Add New Review</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="reviewName">Name</Label>
                    <Input
                      id="reviewName"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Client name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reviewCompany">Company (Optional)</Label>
                    <Input
                      id="reviewCompany"
                      value={reviewCompany}
                      onChange={(e) => setReviewCompany(e.target.value)}
                      placeholder="Company name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <Label htmlFor="reviewRating">Rating</Label>
                  <div className="py-2">
                    <Rating 
                      value={reviewRating} 
                      onChange={(value) => setReviewRating(value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <Label htmlFor="reviewText">Review Text</Label>
                  <Textarea
                    id="reviewText"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Client review text"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2 mb-4">
                  <Label htmlFor="reviewImage">Image URL (Optional)</Label>
                  <Input
                    id="reviewImage"
                    value={reviewImage}
                    onChange={(e) => setReviewImage(e.target.value)}
                    placeholder="https://..."
                  />
                  {reviewImage && (
                    <div className="mt-2 flex">
                      <img 
                        src={reviewImage} 
                        alt="Preview" 
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32?text=Invalid';
                        }} 
                      />
                      <p className="text-xs text-gray-500 ml-2">Image preview</p>
                    </div>
                  )}
                </div>
                
                <Button
                  type="button"
                  onClick={addReview}
                  className="w-full"
                >
                  <Plus size={16} className="mr-2" />
                  Add Review
                </Button>
              </div>
            </div>
            
            <Button type="submit" disabled={isProcessing} className="w-full md:w-auto mt-4">
              {isProcessing ? 'Saving...' : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default ReviewsEditor;
