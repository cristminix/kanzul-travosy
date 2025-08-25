import { API_BASE_URL } from '../config';

/**
 * Fungsi untuk mengambil data berita dari API
 * @param {number} page - Nomor halaman
 * @param {number} limit - Jumlah item per halaman
 * @param {string} author - Nama author untuk filter (opsional)
 * @returns {Promise} - Promise yang resolved dengan data berita
 */
async function fetchBerita(page = 2, limit = 5, author = null) {
    try {
        let url = `${API_BASE_URL}/api/berita/pager?page=${page}&limit=${limit}`;
        if (author) {
            url += `&author=${encodeURIComponent(author)}`;
        }
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching berita:', error);
        throw error;
    }
}

export default fetchBerita;