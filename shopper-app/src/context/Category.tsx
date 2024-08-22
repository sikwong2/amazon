import { PropsWithChildren, useState, createContext, useEffect } from 'react';

export const CategoryContext = createContext({
  categories: [] as string[],
  setCategories: (categories: string[]) => {},
  selectedCategory: '',
  setSelectedCategory: (newCategory: string) => {},
});

// TODO: get categories from DB
export const CategoryProvider = ({ children }: PropsWithChildren<{}>) => {
  const isBrowser = typeof window !== 'undefined';
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isRendered, setIsRendered] = useState<boolean>(false);

  useEffect(() => { // runs only client side during initial render
    if (isBrowser) {
      setSelectedCategory(sessionStorage.getItem('selectedCategory') || 'All Departments');
      setIsRendered(true);
    }
  }, []);

  useEffect(() => { // runs after initial render
    if (isRendered) {
      sessionStorage.setItem('selectedCategory', selectedCategory);
    }
  }, [selectedCategory, isRendered]);

  return (
    <CategoryContext.Provider value={{ categories, setCategories, selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  )
};
