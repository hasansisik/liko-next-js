// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import aboutReducer from "./reducers/aboutReducer";
import contactReducer from "./reducers/contactReducer";
import serviceReducer from "./reducers/serviceReducer";
import blogReducer from "./reducers/blogReducer";
import blogPostReducer from "./reducers/blogPostReducer";
import servicePostReducer from "./reducers/servicePostReducer";
import categoryReducer from "./reducers/categoryReducer";
import homeReducer from "./reducers/homeReducer";
import headerReducer from "./reducers/headerReducer";
import footerReducer from "./reducers/footerReducer";
import formReducer from "./reducers/formReducer";
import formSubmissionReducer from "./reducers/formSubmissionReducer";
import policyReducer from "./reducers/policyReducer";


export const store = configureStore({
  reducer: {
    user: userReducer,
    about: aboutReducer,
    contact: contactReducer,
    service: serviceReducer,
    blog: blogReducer,
    blogPosts: blogPostReducer,
    servicePosts: servicePostReducer,
    categories: categoryReducer,
    home: homeReducer,
    header: headerReducer,
    footer: footerReducer,
    form: formReducer,
    formSubmission: formSubmissionReducer,
    policy: policyReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;