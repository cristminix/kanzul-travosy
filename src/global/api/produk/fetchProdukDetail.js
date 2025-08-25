import { API_BASE_URL } from '../config';

/**
 * Fungsi untuk mengambil detail produk dari API
 * @param {string|number} id - ID produk
 * @returns {Promise} - Promise yang resolved dengan detail produk
 */
async function fetchProdukDetail(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/produk/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching produk detail:', error);
        throw error;
    }
}

export default fetchProdukDetail;