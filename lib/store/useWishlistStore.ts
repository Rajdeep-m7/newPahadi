'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { wishlistApi } from '@/lib/api/wishlist';
import { Product } from '@/lib/services/product';

interface WishlistStoreItem extends Product {
  addedAt: number;
}

interface WishlistState {
  _items: WishlistStoreItem[];
  isLoading: boolean;
  error: string | null;
  pendingToggles: Set<string>;
  addItem: (variantId: string, product: Product) => void;
  removeItem: (variantId: string) => void;
  fetchWishlist: () => Promise<void>;
  toggleWishlist: (variantId: string, product: Product) => Promise<void>;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      _items: [],
      isLoading: false,
      error: null,
      pendingToggles: new Set(),

      addItem: (variantId, product) => {
        set(state => {
          if (state._items.some(i => (i.variantId || i.id) === variantId)) return state;
          return { _items: [...state._items, { ...product, variantId, addedAt: Date.now() }] };
        });
      },

      removeItem: (variantId) => {
        set(state => ({
          _items: state._items.filter(i => (i.variantId || i.id) !== variantId),
        }));
      },

      fetchWishlist: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await wishlistApi.get();
          const rawData = response.data.data || [];

          if (rawData.length === 0) {
            set({ _items: [], isLoading: false });
            return;
          }

          // Wishlist may return items with embedded variant data or just IDs.
          // We already have full product data in _items from persist middleware.
          // If backend returns embedded data, build items from it; otherwise keep _items.
          const embeddedItems: WishlistStoreItem[] = rawData.map((entry: any) => {
            const vid = entry.variantId;
            const addedAt = entry.addedAt ?? Date.now();

            if (vid && typeof vid === 'object') {
              return buildFromVariantData(vid, addedAt);
            }
            return buildFromVariantData({ _id: String(vid) }, addedAt);
          });

          // Merge: prefer embedded data (more up-to-date) but fill missing slugs from localStorage
          const existingSlugs = new Map(get()._items.map(i => [(i.variantId || i.id), i.slug]));
          const merged = embeddedItems.map(item => {
            const key = item.variantId || item.id;
            const slug = existingSlugs.get(key) || item.slug;
            return { ...item, slug };
          });

          set({ _items: merged, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to fetch wishlist',
            isLoading: false,
          });
        }
      },

      toggleWishlist: async (variantId, product) => {
        const { pendingToggles } = get();
        if (pendingToggles.has(variantId)) return;

        const newPending = new Set(pendingToggles);
        newPending.add(variantId);

        const wasInList = get()._items.some(i => (i.variantId || i.id) === variantId);

        set(state => ({
          _items: wasInList
            ? state._items.filter(i => (i.variantId || i.id) !== variantId)
            : [...state._items, { ...product, variantId, addedAt: Date.now() }],
          pendingToggles: newPending,
        }));

        try {
          await wishlistApi.toggle(variantId);
        } catch {
          set(state => ({
            _items: wasInList
              ? [...state._items, { ...product, variantId, addedAt: Date.now() }]
              : state._items.filter(i => (i.variantId || i.id) !== variantId),
          }));
        } finally {
          set(state => {
            const next = new Set(state.pendingToggles);
            next.delete(variantId);
            return { pendingToggles: next };
          });
        }
      },
    }),
    {
      name: 'mscliq-wishlist-storage',
      partialize: (state) => ({ _items: state._items }),
    }
  )
);

function buildFromVariantData(data: any, addedAt?: number): WishlistStoreItem {
  const vid = data?._id || '';
  const price = data?.price ?? 0;
  const mrp = data?.mrp ?? price;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const coverImage = data?.coverImage?.url || data?.imagesArray?.[0]?.url || '';
  const brandName = typeof data?.brandId === 'object' ? data.brandId?.name : (data?.brand || 'Generic');
  const categoryName = typeof data?.categoryId === 'object' ? data.categoryId?.name : (data?.categoryName || 'General');
  const productData = data?.productId || {};

  return {
    id: vid,
    variantId: vid,
    title: data?.title || productData?.title || 'Product',
    desc: data?.desc || productData?.desc || '',
    brand: brandName,
    categoryName,
    image: coverImage || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
    price,
    mrp,
    discount,
    rating: data?.rating ?? productData?.rating ?? 0,
    reviews: data?.reviews ?? productData?.reviews ?? 0,
    isNew: data?.isNew ?? productData?.isNew ?? false,
    slug: data?.slug || productData?.slug || productData?.default_slug || vid,
    categoryId: typeof data?.categoryId === 'object' ? data.categoryId?._id : (data?.categoryId || productData?.categoryId),
    isPublished: data?.isPublished ?? productData?.isPublished ?? true,
    createdAt: data?.createdAt || productData?.createdAt || '',
    updatedAt: data?.updatedAt || productData?.updatedAt || '',
    addedAt: addedAt ?? Date.now(),
  };
}