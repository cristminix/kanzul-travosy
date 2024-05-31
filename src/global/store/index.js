import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "@/global/store/features/counter/counterSlice"
import companySlice from "./features/companySlice"
import beritaSlice from "./features/beritaSlice"
import contactPersonSlice from "./features/contactPersonSlice"
import footerSlice from "./features/footerSlice"
import galerySlice from "./features/galerySlice"
import homepageSlice from "./features/homepageSlice"
import searchSlice from "./features/searchSlice"
import socialNetworkLinkSlice from "./features/socialNetworkLinkSlice"
import welcomMessageSlice from "./features/welcomeMessageSlice"
import contentSlice from "./features/contentSlice"
import settingSlice from "./features/settingSlice"

/*
// import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'

import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  // storage,
  storageSession
}

const persistedReducer = persistReducer(persistConfig, settingSlice.reducer)
*/

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    company: companySlice.reducer,
    welcomeMessage: welcomMessageSlice.reducer,
    berita: beritaSlice.reducer,
    contactPerson: contactPersonSlice.reducer,
    footer: footerSlice.reducer,
    galery: galerySlice.reducer,
    homepage: homepageSlice.reducer,
    search: searchSlice.reducer,
    socialNetworkLink: socialNetworkLinkSlice.reducer,
    content: contentSlice.reducer,
    setting: settingSlice.reducer
  },
})
