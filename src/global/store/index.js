import { configureStore,combineReducers,createListenerMiddleware   } from "@reduxjs/toolkit"
import counterReducer from "@/global/store/features/counter/counterSlice"
import companySlice from "./features/companySlice"
import beritaSlice from "./features/beritaSlice"
import contactPersonSlice from "./features/contactPersonSlice"
import footerSlice from "./features/footerSlice"
import galerySlice from "./features/galerySlice"
import heroSlice from "./features/heroSlice"
import metaSlice from "./features/metaSlice"
import searchSlice from "./features/searchSlice"
import socialNetworkLinkSlice from "./features/socialNetworkLinkSlice"
import webNavigationSlice from "./features/webNavigationSlice"
import welcomMessageSlice from "./features/welcomeMessageSlice"
import contentSlice from "./features/contentSlice"
import settingSlice from "./features/settingSlice"
import profileSlice from "./features/profileSlice"
import lembagaSlice from "./features/lembagaSlice"
import pendaftaranSlice from "./features/pendaftaranSlice"
import kontakSlice from "./features/kontakSlice"
import kegiatanSlice from "./features/kegiatanSlice"
import explorerSlice from "./features/explorerSlice"
import produkSlice from "./features/produkSlice"
// import storage from 'redux-persist/lib/storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import storageSession from 'redux-persist/lib/storage/session'

import { persistReducer, persistStore,createTransform } from 'redux-persist';
// import {thunk} from 'redux-thunk';
const ArrayTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        return JSON.stringify(inboundState);
    },
    // transform state being rehydrated
    (outboundState, key) => {
        return JSON.parse(outboundState);
    },
    { whitelist: ['settings','explorer'] }
);
const persistConfig = {
  key: 'root',
  storage:storageSession,
  version:1,
  whitelist: ["setting","explorer"],
      transforms: [ArrayTransform]
}

const rootReducer = combineReducers( {
    counter: counterReducer,
    company: companySlice.reducer,
    welcomeMessage: welcomMessageSlice.reducer,
    berita: beritaSlice.reducer,
    contactPerson: contactPersonSlice.reducer,
    footer: footerSlice.reducer,
    galery: galerySlice.reducer,
    hero: heroSlice.reducer,
    meta: metaSlice.reducer,
    search: searchSlice.reducer,
    socialNetworkLink: socialNetworkLinkSlice.reducer,
    content: contentSlice.reducer,
    setting: settingSlice.reducer,
    webNavigation: webNavigationSlice.reducer,
    profile: profileSlice.reducer,
    lembaga: lembagaSlice.reducer,
    pendaftaran: pendaftaranSlice.reducer,
    kontak:kontakSlice.reducer,
    kegiatan:kegiatanSlice.reducer,
    explorer:explorerSlice.reducer,
    produk: produkSlice.reducer
  }); 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const listenerMiddleware = createListenerMiddleware()

export const store = configureStore({
  reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(listenerMiddleware.middleware),
})

export const persistor = persistStore(store)