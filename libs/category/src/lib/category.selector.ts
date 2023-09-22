import { categoryReducer, CategoryState } from "./category.reducer";
import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";

const createFeatureKey = 'category';
export const categoryFeature = createFeature({name: createFeatureKey, reducer: categoryReducer});
export const selectCategoryState = createFeatureSelector<CategoryState>(createFeatureKey);
export const selectCategories = createSelector(selectCategoryState, (state) => state.categories);
export const selectError = createSelector(selectCategoryState, (state) => state.error);

