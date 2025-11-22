import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import MissionTimer from "../components/MissionTimer";
import MisionSuccess from "../assets/MisionSuccess.png";
import { TIER_CONFIG } from "../constants";
import { getTierMeta, getMissionTitle } from "../utils/helpers";
import { missionApi } from "../services/api";

const MissionContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 24px;
`;

const PageTitle = styled.h1`
  margin-top: 32px;
  padding: 0 0 28px 0;
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  line-height: 1.4;
`;

const ToggleContainer = styled.div`
  display: flex;
  border-radius: 16px;
  padding: 4px;
  margin-bottom: 16px;
`;

const ToggleButton = styled(motion.button)`
  flex: 1;
  padding: 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  background-color: ${(props) => (props.$active ? "#FFFFFF" : "transparent")};
  color: ${(props) => (props.$active ? "#000000" : "#757575")};

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const MissionList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 16px;
`;

const MissionCard = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);

  &:active {
    transform: scale(0.96);
  }
`;

const MissionHeader = styled.div`
  display: flex;
  gap: 16px;
`;

const MissionTitleSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex: 1;
`;

const MissionContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MissionBadge = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  color: #333333;
  width: fit-content;
`;

const MissionDuration = styled.div`
  font-size: 0.85rem;
  font-weight: 450;
  white-space: nowrap;
  color: #757575;
`;

const MissionDescription = styled.p`
  font-size: 14.6px;
  color: #757575;
`;

const MedalIcon = styled.img`
  width: 42px;
  height: 42px;
  object-fit: contain;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: #757575;
`;

const StatusMessage = styled(EmptyState)`
  background-color: #ffffff;
  border-radius: 16px;
`;

const SuccessOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SuccessModal = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 24px;
  padding: 48px;
  text-align: center;
  max-width: 400px;
  margin: 0 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const SuccessImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin: 0 auto 24px;
  display: block;
`;

const SuccessTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 12px;
`;

const SuccessMessage = styled.p`
  font-size: 16px;
  color: #757575;
  line-height: 1.5;
  margin-bottom: 32px;
`;

const SuccessButton = styled(motion.button)`
  background-color: #3a6ea5;
  color: white;
  padding: 16px 48px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);

  &:hover {
    background-color: #205185;
  }

  &:active {
    transform: scale(0.96);
  }
`;

function Mission() {
  const location = useLocation();
  const [missions, setMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTier, setSelectedTier] = useState("all");
  const [activeMission, setActiveMission] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [completedMission, setCompletedMission] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMissions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await missionApi.getPresets();
        setMissions(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "알 수 없는 오류가 발생했어요.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchMissions();
    // cleanup: 컴포넌트 언마운트 시 진행 중인 요청 취소
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (location.state?.autoStartMission) {
      setActiveMission(location.state.autoStartMission);
    }
  }, [location.state]);

  const filteredMissions =
    selectedTier === "all"
      ? missions
      : missions.filter((m) => m.tier === selectedTier);

  const handleStartMission = (mission) => {
    setActiveMission(mission);
  };

  const handleCompleteMission = async () => {
    try {
      await missionApi.complete(activeMission);
      setCompletedMission(activeMission);
      setActiveMission(null);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("미션 완료 처리 중 오류:", error);
      // API 실패해도 성공 모달 표시 (사용자 경험 우선)
      setCompletedMission(activeMission);
      setActiveMission(null);
      setShowSuccessModal(true);
    }
  };

  const handleCancelMission = async () => {
    try {
      await missionApi.fail(activeMission);
    } catch (error) {
      console.error("미션 실패 기록 중 오류:", error);
    } finally {
      setActiveMission(null);
      await refreshMissions();
    }
  };

  const refreshMissions = async () => {
    try {
      const data = await missionApi.getPresets();
      setMissions(data);
    } catch (error) {
      console.error("미션 목록 새로고침 실패:", error);
    }
  };

  const handleCloseSuccessModal = async () => {
    setShowSuccessModal(false);
    setCompletedMission(null);
    await refreshMissions();
  };

  if (activeMission) {
    return (
      <MissionTimer
        mission={activeMission}
        onComplete={handleCompleteMission}
        onCancel={handleCancelMission}
      />
    );
  }

  return (
    <PageTransition>
      <MissionContainer>
        <PageTitle>미션</PageTitle>

        <ToggleContainer>
          {Object.entries(TIER_CONFIG).map(([tier, config]) => (
            <ToggleButton
              key={tier}
              $active={selectedTier === tier}
              onClick={() => setSelectedTier(tier)}
              whileTap={{ scale: 0.95 }}
            >
              {config.label}
            </ToggleButton>
          ))}
        </ToggleContainer>

        {isLoading ? (
          <StatusMessage>미션을 불러오는 중입니다...</StatusMessage>
        ) : error ? (
          <StatusMessage>{error}</StatusMessage>
        ) : (
          <MissionList>
            {filteredMissions.length > 0 ? (
              filteredMissions.map((mission) => {
                const tierMeta = getTierMeta(mission.tier);
                return (
                  <MissionCard
                    key={mission.id}
                    onClick={() => handleStartMission(mission)}
                    whileTap={{ scale: 0.96 }}
                  >
                    <MissionHeader>
                      <MissionTitleSection>
                        {tierMeta.medal && (
                          <MedalIcon
                            src={tierMeta.medal}
                            alt={`${tierMeta.label} 메달`}
                          />
                        )}
                        <MissionContent>
                          <MissionBadge tierColor={tierMeta.color}>
                            {tierMeta.label} 메달 미션
                          </MissionBadge>
                          <MissionDescription>
                            {mission.description}
                          </MissionDescription>
                        </MissionContent>
                      </MissionTitleSection>
                      <MissionDuration tierColor={tierMeta.color}>
                        {mission.duration}분
                      </MissionDuration>
                    </MissionHeader>
                  </MissionCard>
                );
              })
            ) : (
              <EmptyState>해당 난이도의 미션이 없습니다</EmptyState>
            )}
          </MissionList>
        )}
      </MissionContainer>

      <AnimatePresence>
        {showSuccessModal && completedMission && (
          <SuccessOverlay onClick={handleCloseSuccessModal}>
            <SuccessModal
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <SuccessImage src={MisionSuccess} alt="미션 성공" />
              <SuccessTitle>미션 완료!</SuccessTitle>
              <SuccessMessage>
                {getMissionTitle(completedMission)} 미션을 성공적으로
                완료했습니다!
                <br />
                {completedMission.duration}분 동안 집중하셨네요!
              </SuccessMessage>
              <SuccessButton
                onClick={handleCloseSuccessModal}
                whileTap={{ scale: 0.96 }}
              >
                확인
              </SuccessButton>
            </SuccessModal>
          </SuccessOverlay>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

export default Mission;
