
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import homepageMeta from "@/web/data/pages/homepage.json"
import profileMeta from "@/web/data/pages/profile.json"
import kegiatanMeta from "@/web/data/pages/kegiatan.json"
import galeryMeta from "@/web/data/pages/galery.json"
import pendaftaranMeta from "@/web/data/pages/pendaftaran.json"
import beritaMeta from "@/web/data/pages/berita.json"
import produkMeta from "@/web/data/pages/produk.json"
import kontakMeta from "@/web/data/pages/kontak.json"



import { randStamp } from "@/global/fn"
export const fetchMetaHomepage= createAsyncThunk("fetch-meta-homepage", async () => {
    const response = await fetch(`/web/data/pages/homepage.json?_=${randStamp()}`)
    return response.json()
})

export const fetchMetaProfile= createAsyncThunk("fetch-meta-profile", async () => {
    const response = await fetch(`/web/data/pages/profile.json?_=${randStamp()}`)
    return response.json()
})
 

export const fetchMetaGalery= createAsyncThunk("fetch-meta-galery", async () => {
    const response = await fetch(`/web/data/pages/galery.json?_=${randStamp()}`)
    return response.json()
})

export const fetchMetaLembaga= createAsyncThunk("fetch-meta-lembaga", async () => {
    const response = await fetch(`/web/data/pages/lembaga.json?_=${randStamp()}`)
    return response.json()
})

export const fetchMetaKegiatan= createAsyncThunk("fetch-meta-kegiatan", async () => {
    const response = await fetch(`/web/data/pages/kegiatan.json?_=${randStamp()}`)
    return response.json()
})

export const fetchMetaPendaftaran= createAsyncThunk("fetch-meta-pendaftaran", async () => {
    const response = await fetch(`/web/data/pages/pendaftaran.json?_=${randStamp()}`)
    return response.json()
})

export const fetchMetaBerita= createAsyncThunk("fetch-meta-berita", async () => {
    const response = await fetch(`/web/data/pages/berita.json?_=${randStamp()}`)
    return response.json()
})

export const fetchMetaProduk= createAsyncThunk("fetch-meta-produk", async () => {
    const response = await fetch(`/web/data/pages/produk.json?_=${randStamp()}`)
    return response.json()
})

export const fetchMetaKontak= createAsyncThunk("fetch-meta-kontak", async () => {
    const response = await fetch(`/web/data/pages/kontak.json?_=${randStamp()}`)
    return response.json()
})


    
const initialState={
    berita:beritaMeta,
    homepage:homepageMeta,
    profile:profileMeta,
    kegiatan:kegiatanMeta,
    pendaftaran:pendaftaranMeta,
    galery:galeryMeta,
    kontak:kontakMeta,
    produk:produkMeta,
    fetchStatus: ""
}

export const beritaSlice = createSlice({
    name: "meta",
    initialState,
   
    extraReducers: (builder) => {
      builder
      	.addCase(fetchMetaHomepage.fulfilled, (state, action) => {
          state.homepage = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchMetaHomepage.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchMetaHomepage.rejected, (state) => {
          state.homepage = homepageMeta
          state.fetchStatus = "error"
        })

        .addCase(fetchMetaBerita.fulfilled, (state, action) => {
          state.berita = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchMetaBerita.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchMetaBerita.rejected, (state) => {
          state.berita = beritaMeta
          state.fetchStatus = "error"
        })

        .addCase(fetchMetaProduk.fulfilled, (state, action) => {
          state.produk = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchMetaProduk.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchMetaProduk.rejected, (state) => {
          state.produk = produkMeta
          state.fetchStatus = "error"
        })

        .addCase(fetchMetaProfile.fulfilled, (state, action) => {
          state.profile = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchMetaProfile.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchMetaProfile.rejected, (state) => {
          state.profile = profileMeta
          state.fetchStatus = "error"
        })

        .addCase(fetchMetaKegiatan.fulfilled, (state, action) => {
          state.kegiatan = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchMetaKegiatan.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchMetaKegiatan.rejected, (state) => {
          state.kegiatan = kegiatanMeta
          state.fetchStatus = "error"
        })

        .addCase(fetchMetaPendaftaran.fulfilled, (state, action) => {
          state.pendaftaran = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchMetaPendaftaran.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchMetaPendaftaran.rejected, (state) => {
          state.pendaftaran = pendaftaranMeta
          state.fetchStatus = "error"
        })

        .addCase(fetchMetaGalery.fulfilled, (state, action) => {
          state.galery = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchMetaGalery.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchMetaGalery.rejected, (state) => {
          state.galery = galeryMeta
          state.fetchStatus = "error"
        })

        .addCase(fetchMetaLembaga.fulfilled, (state, action) => {
          state.lembaga = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchMetaLembaga.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchMetaLembaga.rejected, (state) => {
          state.lembaga = lembagaMeta
          state.fetchStatus = "error"
        })

        .addCase(fetchMetaKontak.fulfilled, (state, action) => {
          state.kontak = action.payload
          state.fetchStatus = "success"
        })
        .addCase(fetchMetaKontak.pending, (state) => {
          state.fetchStatus = "loading"
        })
        .addCase(fetchMetaKontak.rejected, (state) => {
          state.kontak = kontakMeta
          state.fetchStatus = "error"
        })
    },
  })
  
  export default beritaSlice
