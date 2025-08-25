import { API_BASE_URL } from '../config';

/**
 * Fungsi untuk mengambil detail berita dari API
 * @param {string|number} id - ID berita
 * @returns {Promise} - Promise yang resolved dengan detail berita
 */
async function fetchBeritaDetail(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/berita/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching berita detail:', error);
        throw error;
    }
}

export default fetchBeritaDetail;