export type Message = {
    id: number;
    text: string;
    sender: "user" | "other";
    link?: string;
  };

  export type SellerOffer = {
    productPrice: string;
    productCondition: string;
    shipsFrom: string;
    seller: string;
    sellerLink: string;
    sellerStarRating: string;
    sellerStarRatingInfo: string;
    currency: string;
    deliveryPrice: string;
    deliveryTime: string;
};

export type Product = {
    name: string;
    ingredients: string;
    asin: string;
    generalOffers: null; // Specify the type if general offers can have another form
    sellerSpecificOffers: SellerOffer[];
    wasFound: boolean;
};
