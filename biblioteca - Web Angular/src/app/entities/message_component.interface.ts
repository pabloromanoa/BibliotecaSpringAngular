export interface MessageInterface{
   title: string;
   text: string;
   type: 'success' | 'warning' | 'error' | 'info' | 'normal' | 'question' | 'input';
}