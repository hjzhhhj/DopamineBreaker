import { API_BASE_URL } from "../constants";

/**
 * API 호출 헬퍼 함수
 */
const apiFetch = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};

/**
 * 미션 관련 API
 */
export const missionApi = {
  /**
   * 프리셋 미션 목록 조회
   */
  getPresets: async () => {
    const data = await apiFetch("/missions/presets");
    return Array.isArray(data) ? data : data.missions || [];
  },

  /**
   * 미션 완료 기록
   */
  complete: async (mission) => {
    return apiFetch("/missions/presets/complete", {
      method: "POST",
      body: JSON.stringify({
        preset_mission_id: mission.id,
        tier: mission.tier,
        title: mission.title || mission.description,
        description: mission.description,
        duration: mission.duration,
      }),
    });
  },

  /**
   * 미션 실패 기록
   */
  fail: async (mission) => {
    return apiFetch("/missions/presets/fail", {
      method: "POST",
      body: JSON.stringify({
        preset_mission_id: mission.id,
        tier: mission.tier,
        title: mission.title || mission.description,
        description: mission.description,
      }),
    });
  },

  /**
   * 획득 메달 조회
   */
  getMedals: async () => {
    const token = localStorage.getItem("token");
    return apiFetch("/missions/medals", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },

  /**
   * 최근 완료한 미션 조회
   */
  getRecent: async (limit = 5) => {
    const token = localStorage.getItem("token");
    const data = await apiFetch(`/missions/recent?limit=${limit}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return data.missions || [];
  },
};

/**
 * 인증 관련 API (AuthContext에서 사용)
 */
export const authApi = {
  login: async (username, password) => {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  register: async (email, username, password) => {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
    });
  },

  getCurrentUser: async (token) => {
    return apiFetch("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
