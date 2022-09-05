import { Category } from "../types/Category";

export function selectCurrentCategory(userData: { [propName: string]: any }){
  return userData?.pages.filter((category: Category) => {
    if (`/${category.path}` === window.location.pathname || category.path === window.location.pathname) {
     return category 
    }
  })[0];
}
