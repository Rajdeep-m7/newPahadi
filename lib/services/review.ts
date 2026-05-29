import { shopApi } from "@/lib/fetchers";

export interface ReviewImage {
  url: string;
  publicId: string;
}

export interface Review {
  _id: string;
  userId: string | { _id: string; name: string };
  productId: string;
  rating: number;
  comment: string;
  isActive: boolean;
  images: ReviewImage[];
  createdAt: string;
  updatedAt: string;
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const response = await shopApi.get(`/reviews/product/${productId}`);
    return response.data.data || [];
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return [];
  }
}

export async function createReview(
  productId: string,
  data: { rating: number; comment: string; images?: ReviewImage[] }
): Promise<{ success: boolean; message: string; data?: Review }> {
  try {
    const response = await shopApi.post(`/reviews/product/${productId}`, data);
    return {
      success: true,
      message: response.data.message || "Review submitted successfully",
      data: response.data.data,
    };
  } catch (error: any) {
    console.error(`Error creating review for product ${productId}:`, error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to submit review",
    };
  }
}
