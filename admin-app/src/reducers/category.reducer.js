import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategory = (parentId, categories, newCategory) => {
  let myCategories = [];

  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: newCategory._id,
        name: newCategory.name,
        slug: newCategory.slug,
        type:newCategory.type,
        children: [],
      },
    ];
  }

  for (let cat of categories) {
    if (cat._id === parentId) {
      const _newCategory = {
        _id: newCategory._id,
        name: newCategory.name,
        slug: newCategory.slug,
        type:newCategory.type,
        parentId: newCategory.parentId,
        children: [],
      };
      myCategories.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, _newCategory]
            : [_newCategory],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategory(parentId, cat.children, newCategory)
          : [],
      });
    }
  }
  return myCategories;
};

const categoryReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
      break;
    case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
      state = {
        ...state,
        loading:false,
        error: action.payload.error,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategory(
        category.parentId,
        state.categories,
        category
      );
      state = {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading:false
      };
      break;
    case categoryConstants.UPDATE_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
        };
      break;
    case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.UPDATE_CATEGORIES_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading:false
      };
      break;
      case categoryConstants.DELETE_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
      case categoryConstants.DELETE_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false
        };
      break;
      case categoryConstants.DELETE_CATEGORIES_FAILURE:
      state = {
        ...state,
       error:action.payload.error,
       loading:false
        };
      break;
    default:
      state = { ...state };
  }
  return state;
};

export default categoryReducer;
