import Mock from 'mockjs';

// /api/board/get-page
Mock.mock(/\/api\/board\/get-page/, 'get', (options) => {
  // 解析URL参数
  const params = new URLSearchParams(options.url.split('?')[1]);
  const page = params.get('page');
  const per_page = params.get('per_page');
  const user_id = params.get('user_id');

  // 检查参数
  if (isNaN(page) || isNaN(per_page) || isNaN(user_id)) {
    return {
      code: 'INVALID',
    };
  }

  // 当user_id为-1时，返回所有人对应页的条目
  if (user_id === -1) {
    return Mock.mock({
      code: 'SUCCESS',
      data: {
        total_cnt: '@integer(1, 100)',
        list: [...Array(per_page)].map(() => ({
          board_id: '@increment',
          title: '@title',
          description: '@sentence',
          overall_score: '@float(1, 5, 1, 2)',
          scores: Array.from({length: 5}, () => Mock.mock('@integer(0, 10000)')),
          creator: {
            user_id: '@integer(1, 100)',
            user_name: '@name'
          }
        }))
      }
    });
  }

  // 根据参数返回数据
  return Mock.mock({
    code: 'SUCCESS',
    data: {
      total_cnt: '@integer(1, 100)',
      list: [...Array(Number(per_page))].map(() => ({
        board_id: '@increment',
        title: '@title',
        description: '@sentence',
        overall_score: '@float(1, 5, 1, 2)',
        scores: Array.from({length: 5}, () => Mock.mock('@integer(0, 10000)')),
        creator: {
          user_id: user_id,
          user_name: '@name'
        }
      }))
    }
  });
});

// api/board/get
Mock.mock(/\/api\/board\/get/, 'get', {
    code: 'SUCCESS',
    data: {
      board_id: '@increment',
      title: '@title',
      description: '@sentence',
      overall_score: '@float(1, 5, 1, 2)',
      scores: '@range(5)',
      creator: {
        user_id: '@increment',
        user_name: '@name'
      }
    }
  });
  
//   /api/board/create
Mock.mock(/\/api\/board\/create/, 'post', {
    code: 'SUCCESS'
  });
 
//   /api/board/modify
Mock.mock(/\/api\/board\/modify/, 'post', {
    code: 'SUCCESS'
  });

//   /api/board/delete
  Mock.mock(/\/api\/board\/delete/, 'post', {
    code: 'SUCCESS'
  });


//   Ratings
Mock.mock(/\/api\/rating\/get-page/, 'get', (options) => {

  // 解析URL参数
  const params = new URLSearchParams(options.url.split('?')[1]);
  const board_id = params.get('board_id');
  const page = params.get('page');
  const per_page = params.get('per_page');


  // 检查参数
  if (isNaN(board_id) || isNaN(page) || isNaN(per_page)) {
    return {
      code: 'INVALID',
    };
  }

  // 根据参数返回数据
  return Mock.mock({
    code: 'SUCCESS',
    total_count: '@integer(1, 100)',
    data: [...Array(Number(per_page))].map(() => ({
      rating_id: '@increment',
      description: '@sentence',
      score: '@integer(1, 5)',
      time: '@datetime',
      creator: {
        user_id: '@increment',
        user_name: '@name'
      }
    }))
  });
});

// add rating
Mock.mock(/\/api\/rating\/create/, 'post', {
  code: 'SUCCESS'
});