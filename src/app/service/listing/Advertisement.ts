import {AttributeValue} from "./AttributeValue";
import {AttributeValueRequest} from "./AttributeValueRequest";

export interface Advertisement {
  title: string;
  description: string;
  userId: string;
  category: string;
  categoryId: number;
  city: string;
  price: number;
  attributeValue:AttributeValueRequest
}
