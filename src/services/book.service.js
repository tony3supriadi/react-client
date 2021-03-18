import http from '../config/http-common';

class BookService {
    
    /**
     * GET all books
     * @returns JSON
     */
    all = function() {
        return http.get(`/books`);
    }

    /**
     * Find book by id
     * @param id
     * @return JSON
     */ 
    find = function (id) {
        return http.get(`/books/${id}`);
    }

    /**
     * Create new book
     * @param Book
     * @return JSON
     */
    create = function (data) {
        return http.post(`/books`, data);
    }

    /**
     * Update book by id
     * @param Book
     * @param id
     * @return JSON
     */
    update = function (data, id) {
        return http.put(`/books/${id}`, data)
    }

    /**
     * Delete book by id
     * @param id
     * @return JSON
     */
    delete = function (id) {
        return http.delete(`/books/${id}`);
    }
}

export default new BookService();