import { TIER_CONFIG } from "../constants";

/**
 * 시간을 분 단위로 포맷팅
 * @param {number} minutes - 분 단위 시간
 * @returns {string} "N시간 M분" 또는 "M분"
 */
export const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
};

/**
 * 초를 MM:SS 형식으로 포맷팅
 * @param {number} seconds - 초 단위 시간
 * @returns {string} "MM:SS"
 */
export const formatTimeToMMSS = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

/**
 * 티어에 해당하는 메타 정보 반환
 * @param {string} tier - 티어 (bronze, silver, gold, all)
 * @returns {object} 티어 메타 정보
 */
export const getTierMeta = (tier) => TIER_CONFIG[tier] || TIER_CONFIG.all;

/**
 * 미션에서 제목 추출
 * @param {object} mission - 미션 객체
 * @returns {string} 미션 제목
 */
export const getMissionTitle = (mission) =>
  mission?.title || mission?.description || "미션";

/**
 * 브라우저 알림 권한 요청
 */
export const requestNotificationPermission = () => {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
};

/**
 * 브라우저 알림 전송
 * @param {string} title - 알림 제목
 * @param {string} body - 알림 내용
 * @param {string} icon - 알림 아이콘 URL
 */
export const sendNotification = (title, body, icon = "/icon.png") => {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body, icon });
  }
};
