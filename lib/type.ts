
export  type ProductAction = 'Publish' | 'Draft';

export interface Product {
    id: string
    name: string
    description: string | null
    
    action:ProductAction;
    imageUrl: string | null |undefined;
}