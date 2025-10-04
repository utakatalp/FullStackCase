const BASE_URL = "https://fullstackcase-production.up.railway.app";

export const itemsRepository = {
  
  async getAll() {
    const res = await fetch(`${BASE_URL}/items`);
    if (!res.ok) throw new Error("Failed to fetch items");
    
    const data = await res.json();
    return data.map(mapToItem);
  },
  async getByPopularity() {
    const res = await fetch(`${BASE_URL}/items/popularity`);
    if (!res.ok) throw new Error("Failed to fetch by popularity");
    const data = await res.json();
    return data.map(mapToItem);
  },
  async getByPriceRange(min, max) {
    const res = await fetch(`${BASE_URL}/items/price-range?min=${min}&max=${max}`);
    if (!res.ok) throw new Error("Failed to fetch by price range");
    const data = await res.json();
    return data.map(mapToItem);
  }
};

function mapToItem(dto) {
  return {
    name: dto.item.name,
    popularityScore: dto.item.popularityScore,
    weight: dto.item.weight,
    images: dto.item.images,
    price: dto.price, 
  };
}
