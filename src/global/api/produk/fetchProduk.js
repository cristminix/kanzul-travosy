import { API_BASE_URL } from '../config';

/**
 * Fungsi untuk mengambil data produk dari API
 * @param {number} page - Nomor halaman
 * @param {number} limit - Jumlah item per halaman
 * @param {string} kategori - Kategori produk untuk filter (opsional)
 * @returns {Promise} - Promise yang resolved dengan data produk
 */
async function fetchProduk(page = 1, limit = 5, kategori = null) {
    try {
        let url = `${API_BASE_URL}/api/produk/pager?page=${page}&limit=${limit}`;
        if (kategori) {
            url += `&kategori=${encodeURIComponent(kategori)}`;
        }
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching produk:', error);
        throw error;
    }
}

export default fetchProduk;