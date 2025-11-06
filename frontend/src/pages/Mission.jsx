import { useState } from 'react'
import styled from 'styled-components'
import MissionTimer from '../components/MissionTimer'

const MissionContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  padding-bottom: 100px;
`

const PageTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
`

const ToggleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
`

const ToggleButton = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all ${props => props.theme.transitions.fast};
  background-color: ${props => props.active ? props.bgColor : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.textSecondary};

  &:hover {
    opacity: 0.8;
  }
`

const MissionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const MissionCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border-left: 4px solid ${props => props.tierColor};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:active {
    transform: scale(0.98);
  }
`

const MissionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${props => props.theme.spacing.sm};
`

const MissionTitleSection = styled.div`
  flex: 1;
`

const MissionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`

const MissionBadge = styled.span`
  display: inline-block;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.medium};
  background-color: ${props => props.tierColor}20;
  color: ${props => props.tierColor};
`

const MissionDuration = styled.div`
  font-size: ${props => props.theme.fontSizes.xxl};
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.tierColor};
`

const MissionDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.5;
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.textSecondary};
`

const missions = [
  {
    id: 1,
    title: '스트레칭 타임',
    description: '간단한 목과 어깨 스트레칭으로 긴장을 풀어보세요',
    duration: 5,
    tier: 'bronze',
    category: 'physical'
  },
  {
    id: 2,
    title: '심호흡 명상',
    description: '깊은 호흡으로 마음을 안정시켜보세요',
    duration: 10,
    tier: 'bronze',
    category: 'mental'
  },
  {
    id: 3,
    title: '물 마시기',
    description: '물 한 잔을 천천히 마시며 수분을 보충하세요',
    duration: 3,
    tier: 'bronze',
    category: 'health'
  },
  {
    id: 4,
    title: '독서 시간',
    description: '좋아하는 책을 읽으며 휴식을 취해보세요',
    duration: 20,
    tier: 'silver',
    category: 'mental'
  },
  {
    id: 5,
    title: '산책하기',
    description: '밖에 나가서 짧은 산책을 즐겨보세요',
    duration: 15,
    tier: 'silver',
    category: 'physical'
  },
  {
    id: 6,
    title: '요가 루틴',
    description: '기본 요가 동작으로 몸과 마음을 정돈하세요',
    duration: 30,
    tier: 'gold',
    category: 'physical'
  },
  {
    id: 7,
    title: '명상 집중',
    description: '긴 시간 동안 집중 명상을 해보세요',
    duration: 25,
    tier: 'gold',
    category: 'mental'
  },
]

const tierConfig = {
  all: { label: '전체', color: '#6C63FF' },
  bronze: { label: '브론즈', color: '#CD7F32' },
  silver: { label: '실버', color: '#C0C0C0' },
  gold: { label: '골드', color: '#FFD700' },
}

function Mission() {
  const [selectedTier, setSelectedTier] = useState('all')
  const [activeMission, setActiveMission] = useState(null)

  const filteredMissions = selectedTier === 'all'
    ? missions
    : missions.filter(m => m.tier === selectedTier)

  const handleStartMission = (mission) => {
    setActiveMission(mission)
  }

  const handleCompleteMission = () => {
    // TODO: API로 미션 완료 기록 전송
    setActiveMission(null)
  }

  const handleCancelMission = () => {
    setActiveMission(null)
  }

  if (activeMission) {
    return (
      <MissionTimer
        mission={activeMission}
        onComplete={handleCompleteMission}
        onCancel={handleCancelMission}
      />
    )
  }

  return (
    <MissionContainer>
      <PageTitle>미션</PageTitle>

      <ToggleContainer>
        {Object.entries(tierConfig).map(([tier, config]) => (
          <ToggleButton
            key={tier}
            active={selectedTier === tier}
            bgColor={config.color}
            onClick={() => setSelectedTier(tier)}
          >
            {config.label}
          </ToggleButton>
        ))}
      </ToggleContainer>

      <MissionList>
        {filteredMissions.length > 0 ? (
          filteredMissions.map(mission => (
            <MissionCard
              key={mission.id}
              tierColor={tierConfig[mission.tier].color}
              onClick={() => handleStartMission(mission)}
            >
              <MissionHeader>
                <MissionTitleSection>
                  <MissionTitle>{mission.title}</MissionTitle>
                  <MissionBadge tierColor={tierConfig[mission.tier].color}>
                    {tierConfig[mission.tier].label}
                  </MissionBadge>
                </MissionTitleSection>
                <MissionDuration tierColor={tierConfig[mission.tier].color}>
                  {mission.duration}분
                </MissionDuration>
              </MissionHeader>
              <MissionDescription>{mission.description}</MissionDescription>
            </MissionCard>
          ))
        ) : (
          <EmptyState>해당 난이도의 미션이 없습니다</EmptyState>
        )}
      </MissionList>
    </MissionContainer>
  )
}

export default Mission