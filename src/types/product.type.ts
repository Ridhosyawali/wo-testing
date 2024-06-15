export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  desription: string;
  created_at: Date;
  updated_at: Date;
  stock: [
    {
      id: string;
      size: string;
      qty: number;
    }
  ];
  detail: [
    {
      colour: string;
      material: string;
      traditional: string;
      fit_type: string;
      model: string;
      additional: string;
    }
  ];
  sizeguide: [
    {
      lb: number;
      pb: number;
    }
  ];
};
