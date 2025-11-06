import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // TODO: 필요시 인증 토큰 추가
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// 스크린타임 관련 API
export const screenTimeAPI = {
  // 오늘의 스크린타임 조회
  getToday: () => api.get('/screen-time/today'),

  // 기간별 스크린타임 조회
  getByDateRange: (startDate, endDate) =>
    api.get('/screen-time/range', { params: { startDate, endDate } }),

  // 스크린타임 기록
  record: (data) => api.post('/screen-time', data),
}

// 미션 관련 API
export const missionAPI = {
  // 모든 미션 조회
  getAll: () => api.get('/missions'),

  // 미션 시작
  start: (missionId) => api.post(`/missions/${missionId}/start`),

  // 미션 완료
  complete: (missionId, data) => api.post(`/missions/${missionId}/complete`, data),

  // 완료한 미션 기록 조회
  getRecords: (params) => api.get('/missions/records', { params }),
}

// 통계 관련 API
export const statisticsAPI = {
  // 주간 통계
  getWeekly: () => api.get('/statistics/weekly'),

  // 월간 통계
  getMonthly: () => api.get('/statistics/monthly'),

  // 전체 통계
  getOverall: () => api.get('/statistics/overall'),
}

// 업적 관련 API
export const achievementAPI = {
  // 모든 업적 조회
  getAll: () => api.get('/achievements'),

  // 사용자 업적 조회
  getUserAchievements: () => api.get('/achievements/user'),
}

export default api