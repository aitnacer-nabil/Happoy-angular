interface AttributeValue {
  value: string;
  attributeName: string;
}

interface Attribute {
  attributeValues: AttributeValue[];
}

interface Media {
  id: number;
  imageUrl: string;
}

interface Ad {
  id: number;
  title: string;
  description: string;
  userId: string;
  category: string;
  city: string;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdResponse {
  attribute: Attribute;
  media: Media[];
  ad: Ad;
}
