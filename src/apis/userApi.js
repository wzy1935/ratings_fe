import http from './http';

export default {
  async login(name, password) {
    return await http.post('/api/user/login', {
      name: name,
      password: password,
    });
  },

  async signup(name, password) {
    return await http.post('/api/user/signup', {
      name: name,
      password: password,
    });
  },

  async changePassword(oldPassword, newPassword) {
    return await http.post('/api/user/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    });
  },

  async userInfo() {
    return await http.get('/api/user/user-info');
  },

  // Board
  async getBoards(page, per_page, user_id) {
    return await http.get('/api/board/get-page', {
      params: { page, per_page, user_id }
    });
  },


  async getBoard(board_id) {
    return await http.get('/api/board/get', {
      params: { board_id }
    });
  },

  async createBoard(title, description) {
    return await http.post('/api/board/create', {
      title,
      description
    });
  },

  async modifyBoard(board_id, title, description) {
    return await http.post('/api/board/modify', {
      board_id,
      title,
      description
    });
  },

  async deleteBoard(board_id) {
    return await http.post('/api/board/delete', {
      board_id
    });
  },
  
  async getRatings( board_id, page, per_page,) {
    return await http.get('/api/rating/get-page', {
      params: {  board_id, page, per_page, }
    });
  },

  async createRating(board_id, score, comment) {
    return await http.post('/api/rating/create', {
      board_id,
      score,
      comment
    });
  },
};
